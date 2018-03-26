import * as React from 'react';

export interface AppProps { title?: string; }

const App: React.SFC<AppProps> = ({title}) => (
  <div className="App">
    <div className="App-header">
      <img src={require('./logo.svg')} className="App-logo" alt="logo" />
      <h2>{title || 'Welcome to React'}</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
  </div>
);

export default App;