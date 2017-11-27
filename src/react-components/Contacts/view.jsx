import React from 'react'
import styles from './view.inject'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AddContact from './Components/AddContact'
import DisplayContact from './Components/DisplayContact'
import ContactList from './Components/ContactList'
import AppBar from './Components/AppBar'
import StatusMessage from './Components/StatusMessage'
import Loader from './Components/Loader'

//
// Primary component for implementing the contacts UI.
//
const Contacts = props =>
  <div className={styles.contacts} >
    <AppBar {...props} />
    <ContactList {...props} />
    <FloatingActionButton
      disabled={!props.serverUp}
      id='addContactButton'
      onClick={props.onAddContact}
      title='Add Contact'
      secondary={true}
      className={styles.floatingButton}
    >
      <ContentAdd />
    </FloatingActionButton>
    <AddContact {...props} />
    <DisplayContact {...props} />
    <StatusMessage
      closeStatusMessage={props.closeStatusMessage}
      statusMessage={props.statusMessage}
    />
    <Loader />
  </div>

export default Contacts
