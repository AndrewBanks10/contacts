import React from 'react'
import Dialog from './Dialog'
import FlatButton from 'material-ui/FlatButton'

//
// UI to display status messages.
//
const StatusMessage = props => {
  if (props.statusMessage === '') {
    return null
  }

  const actions = [
    <FlatButton
      key={1}
      id='closeStatusMessage'
      label={typeof props.dialogButtonLabel !== 'string' ? 'Close' : props.dialogButtonLabel}
      primary={true}
      onClick={props.closeStatusMessage}
    />
  ]

  return (
    <Dialog
      title={props.statusMessageTitle}
      actions={actions}
      modal={true}
      open={true}
    >
      {props.statusMessage}
    </Dialog>
  )
}

export default StatusMessage
