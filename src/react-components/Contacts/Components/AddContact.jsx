import React from 'react'
import ActionStore from 'material-ui/svg-icons/action/store'
import SocialPerson from 'material-ui/svg-icons/social/person'
import Dialog from './Dialog'
import FlatButton from 'material-ui/FlatButton'
import { IconBoundTextField } from './BoundTextField'
import CommunicationPhone from 'material-ui/svg-icons/communication/phone'
import { IconBoundLocalPhoneField } from './LocalPhoneField'

//
// Add contact dialog.
//

// Add contact fields.
const AddContactBody = props =>
  <div>
    <IconBoundTextField
      id='nameField'
      icon={SocialPerson}
      hintText='Name'
      storeKey={'name'}
      value={props['name']}
      onChange={props.onChange}
    />
    <IconBoundTextField
      id='contextField'
      icon={ActionStore}
      hintText='Context'
      storeKey={'context'}
      value={props['context']}
      onChange={props.onChange}
    />
    <IconBoundLocalPhoneField
      id='phoneField'
      icon={CommunicationPhone}
      hintText='Phone'
      listValue={props['phoneCountryCode']}
      onListChange={props.onChangeCountryCode}
      onChange={props.onChangePhone}
      countryCodes={props.countryCodes}
      value={props['phone']}
    />
  </div>

const AddContact = (props) => {
  if (!props.addContactActive) {
    return null
  }
  const actions = [
    <FlatButton
      key={1}
      label='Cancel'
      primary={true}
      onClick={props.closeAddContact}
    />,
    <FlatButton
      key={2}
      id='contactSaveButton'
      label='Save'
      primary={true}
      disabled={props.name === ''}
      onClick={props.saveContact}
    />
  ]
  return (
    <Dialog
      id='addContact'
      title='Add Contact'
      actions={actions}
      modal={true}
      open={true}
    >
      {<AddContactBody {...props} />}
    </Dialog>
  )
}

export default AddContact
