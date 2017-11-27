import React from 'react'
import styles from './Dialog.inject'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const MuiTheme = getMuiTheme()

//
// This was put together because the material UI dialog does not expose
// button and text fields to enzyme testing.
//
const Dialog = props => {
  const titleStyle = {
    fontSize: `${MuiTheme.dialog.titleFontSize}px`,
    display: typeof props.title === 'undefined' || props.title === '' ? 'none' : ''
  }
  if (!props.open) {
    return null
  }
  return (
    <div className={styles.cover}>
      <div className={styles.modal}>
        <div className={styles.dialog} id={props.id}>
          <div className={styles.dialogTitle} style={titleStyle} >
            {props.title}
          </div>
          <div className={styles.dialogBody}>
            {props.children}
          </div>
          <div className={styles.dialogButtonsContainer}>
            <div className={styles.dialogButtons}>
              {props.actions}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
