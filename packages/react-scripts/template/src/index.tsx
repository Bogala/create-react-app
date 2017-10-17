import 'af-toolkit-core/bootstrap/af-toolkit-core.css';
import 'af-toolkit-core/assets/fonts/icons/af-icons.css';
import './toolkit/af-toolkit.css';
import 'core-js';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
