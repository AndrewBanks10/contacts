import React from 'react'
import styles from './Loader.inject'
import CircularProgress from 'material-ui/CircularProgress'

//
// Busy loader.
//
const Loader = props => {
  if (props.isBusy) {
    return <div className={styles['center-div-on-screen']}><CircularProgress size={60} thickness={7} /></div>
  }
  return null
}

export default Loader
