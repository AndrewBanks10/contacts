import React from 'react'
import ActionStore from 'material-ui/svg-icons/action/store'
import SocialPerson from 'material-ui/svg-icons/social/person'
import Dialog from './Dialog'
import CommunicationPhone from 'material-ui/svg-icons/communication/phone'
import styles from './DisplayContact.inject'
import FlatButton from 'material-ui/FlatButton'
import PhoneNumber from './PhoneNumber'

//
// Display one contact field with an icon.
//
const DisplayField = props =>
  <div className={styles.field}>
    <div className={styles.icon}>
      <props.icon />
    </div>
    <div className={styles.text}>
      {typeof props.value === 'string' ? props.value : <props.value {...props} />}
    </div>
    <div className={styles.floatClear} />
  </div>

//
// Dialog body for displaying a contact.
//
const DisplayContactBody = props =>
  <div>
    <DisplayField
      icon={SocialPerson}
      value={props.displayItem.name}
    />
    <DisplayField
      icon={ActionStore}
      value={props.displayItem.context}
    />
    <DisplayField
      icon={CommunicationPhone}
      value={PhoneNumber}
      localPhone={props.displayItem.localPhone}
      number={props.displayItem.number}
      allowCallNumber={props.allowCallNumber}
    />
  </div>

//
// Display contact dialog.
//
const DisplayContact = (props) => {
  if (!props.displayContactActive) {
    return null
  }
  const actions = [
    <FlatButton
      key={1}
      label='Exit'
      primary={true}
      onClick={props.closeDisplayContact}
    />
  ]
  return (
    <Dialog
      title='Contact'
      modal={true}
      open={true}
      actions={actions}
    >
      {<DisplayContactBody {...props} />}
    </Dialog>
  )
}

export default DisplayContact
