import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {PianoComponent} from './PianoComponent';


const App = () => (
  <MuiThemeProvider>
    <PianoComponent />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);


export default App;
