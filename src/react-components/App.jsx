// React 16 requirements.
import 'core-js/es6/map'
import 'core-js/es6/set'

import React from 'react'
import CausalityRedux from 'causality-redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Contacts from './Contacts/controller'

//
// Main app component.
//
const App = () =>
  <Provider store={CausalityRedux.store}>
    <MuiThemeProvider>
      <Contacts />
    </MuiThemeProvider>
  </Provider>

export default App
