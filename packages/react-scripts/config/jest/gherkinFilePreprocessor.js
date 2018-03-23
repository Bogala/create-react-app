'use strict';

const IGNORE_TAG = "@ignore";
const IGNORE_OTHER_TAG = "@ignoreOthers";
const Gherkin = require('gherkin');
const parser = new Gherkin.Parser(new Gherkin.AstBuilder());
const fs = require('fs');
const path = require('path');

class GherkinFilePreprocessor {
    process(content, file) {
        let feature = parser.parse(new Gherkin.TokenScanner(content), new Gherkin.TokenMatcher()).feature;
        let featureSpec = `import * as gherkinApi from 'gherkin-specs-api'; 
        gherkinApi.feature('${this.getFeatureTitle(feature)}')`;
        if(this.hasTag(feature.tags, IGNORE_OTHER_TAG)){
            featureSpec += "\n\t.ignoreOthers()";
        }
        if (this.hasTag(feature.tags, IGNORE_TAG)) {
            featureSpec += "\n\t.ignore()";
        }
    
        feature.children.forEach((scenario) => {
            let scenarioTemplate = this.getScenarioTemplate(scenario, feature.background);
            featureSpec += this.formatScenarioTemplateWithSamples(scenario, scenarioTemplate);
        });

        let impl = this.getFeatureImpl(feature, file);
        if (impl !== null) {
            return `
            import * as __featureFileImpl from '${impl.fileImpl}';
            import * as api from 'gherkin-specs-api';
            ${featureSpec};
            api.featureRunner().run();
            `;
        }
        
        return `xit("", () => {})`;
    }

    formatScenarioTemplateWithSamples(scenario, scenarioTemplate) {
        if (scenario.examples) {
            let scenarii = '';
            scenario.examples[0].tableBody.forEach((exemple) => {
                let exempleTemplate = scenarioTemplate;
                for (let i = 0; i < exemple.cells.length; i++) {
                    let paramName = scenario.examples[0].tableHeader.cells[i].value;
                    let value = exemple.cells[i].value;
                    let re = new RegExp("<" + paramName.replace("'","\\\\'") + ">", "g");
                    exempleTemplate = exempleTemplate.replace(re, value);
                }
                scenarii += exempleTemplate;
            });
            return scenarii;
        } else {
            return scenarioTemplate;
        }
    }

    getScenarioTemplate(scenario, background) {
        let scenarioTemplate = "\n\t.scenario('" + this.sanitizeString(scenario.name) + "')";
        if(this.hasTag(scenario.tags, IGNORE_OTHER_TAG)){
            scenarioTemplate += "\n\t.ignoreOthers()";
        }
        if (this.hasTag(scenario.tags, IGNORE_TAG)) {
            scenarioTemplate += "\n\t.ignore()";
        }
        
        let previousKeyword = null;
        
        let steps = scenario.steps;
        if (background && background.steps){
            steps = background.steps.concat(scenario.steps);
        }
        
        steps.forEach((step) => {
            let keyword = step.keyword.toLowerCase().trim();
            switch (keyword) {
                case "given":
                case "when":
                case "then":
                    if (previousKeyword === keyword) {
                        keyword = "and";
                    }
                    else {
                        previousKeyword = keyword;
                    }
                break;
                default:
                // And / But / ...
                    keyword = "and";
            }
            scenarioTemplate += "\n\t\t." + keyword + "('" + this.sanitizeString(step.text) + "'";
            var tableArgObj = this.createTableArgumentsObj(step);
            if (tableArgObj !== null) {
                scenarioTemplate += "," + JSON.stringify(tableArgObj);
            }
            scenarioTemplate += ")";
        });
        return scenarioTemplate;
    }

    createTableArgumentsObj(step) {
		if (step.argument) {
            if (step.argument.type === "DocString") {
                return step.argument.content;
            } else if (step.argument.rows.length > 0) {
                var tableArg = [];
                var properties = [];
                step.argument.rows[0].cells.forEach((cell) => {
                    properties.push(cell.value);
                })
        
                for (var j = 1; j < step.argument.rows.length; j++) {
                    var row = step.argument.rows[j];
                    var argument = {};
                    for (var k = 0; k < row.cells.length; k++) {
                        argument[properties[k]] = row.cells[k].value;
                    }
                    tableArg.push(argument);
                }
                return tableArg;   
            }
		}
		return null;
    }
    
    getFeatureTitle(feature) {
        var featureTitle = feature.name;
        if (feature.description) {
        featureTitle += "\r" + feature.description;
        }
        return this.sanitizeString(featureTitle);
    }

    sanitizeString(str) {
        return str.replace(/'/g, '\\\'').replace(/[\ \t]*[\n\r]+[\ \t]*/g, "\\n\\r' + \n\r\t'");
    }

    hasTag(tags, tagNames) {
        return tags.some((tag) => { return tagNames.indexOf(tag.name) >= 0 });
    }

    getFeatureImpl(feature, filename) {
        let source = feature.tags.filter((tag) => {
            return tag.name.startsWith('@source ');
        }).map(x => x.name);
        if (source.length > 0 && source[0].split(' ').length > 1){
            let fileImpl = source[0].split(' ')[1];
            var paths = filename.split(path.sep);
            paths.pop();
            var fullImplPath = paths.join(path.sep) + path.sep + fileImpl;
            let testContent = fs.readFileSync(fullImplPath);
            return {
                filename: fullImplPath,
                src: testContent,
                fileImpl: fileImpl
            };
        }
        return null;
    }
}

module.exports = GherkinFilePreprocessor;