import 'af-toolkit-core/bootstrap/af-toolkit-core.css';
import 'af-toolkit-core/assets/fonts/icons/af-icons.css';
import '../toolkit/af-toolkit.scss';

import * as React from 'react';

import App from '../components/App';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

const stories = storiesOf('Pages', module);
stories.addDecorator(withKnobs);
stories.add('footer', () => <App />);  
