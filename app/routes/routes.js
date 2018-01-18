require('../styles/style.sass')
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from '../App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6699ff',
		accent1Color: '#ffcc33',
    // textColor: '#ffffff',
    alternateTextColor: '#f3f5f2',
  },

  checkbox: {
    checkedColor: "#ffcc33",
    boxColor: "#222222",
    requiredColor: "#e1f5fe"
  },

});

var routes = (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Router>
			<div>
				<Route exact path="/" component={App}/>
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
