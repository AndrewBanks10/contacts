import React from 'react'
import styles from './AppBar.inject'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import SearchBox from './SearchBox'

const MuiTheme = getMuiTheme()

//
// Main application app bar.
//
const AppBar = props =>
  <div className={styles.appBar} style={{ backgroundColor: MuiTheme.appBar.color, color: MuiTheme.appBar.textColor }}>
    <div className={styles.appBarTitle}>Contacts</div>
    <SearchBox {...props} />
  </div>

export default AppBar
