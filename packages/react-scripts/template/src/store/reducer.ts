import { combineReducers } from 'redux';

// tslint:disable-next-line:no-any
function importAll(r: any) {
    let cache = {};
    r.keys().forEach((key: string) => {
        const keyPaths = key.split('/');
        const keyName = keyPaths[keyPaths.length - 1].replace('.reducer.ts', '');
        cache[keyName] = r(key);
    });
    return cache;
}

export default combineReducers({
    ...importAll(require.context('../components/', true, /\.reducer\.ts$/))
});
