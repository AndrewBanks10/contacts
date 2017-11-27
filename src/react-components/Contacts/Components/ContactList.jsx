import React from 'react'
import styles from './ContactList.inject'
import PhoneNumber from './PhoneNumber'

//
// Row entry for the content list.
//
const ContactListRow = props =>
  <div onClick={props.clickContactRow} data-contactrow className={styles.contactRow}>
    <div data-name className={styles.contactName}>
      {props.name}
    </div>
    <div data-context className={styles.contactContext}>
      {props.context}
    </div>
    <div data-phonenumber className={styles.phoneNumber}>
      <PhoneNumber {...props} />
    </div>
    <div className={styles.floatClear} />
  </div>

//
// UI for displaying the contacts.
//
const ContactList = props => {
  const len = props.filteredContacts.length
  let list = []
  for (let i = 0; i < len; ++i) {
    const item = props.filteredContacts[i]
    list.push(
      <ContactListRow
        key={i}
        clickContactRow={() => (props.clickContactRow(item))}
        name={item.name}
        context={item.context !== '' ? item.context : '\u2006'}
        localPhone={item.localPhone}
        number={item.number}
        allowCallNumber={props.allowCallNumber}
      />
    )
  }
  return (
    <div className={styles.contactsContent}>
      {list}
    </div>
  )
}

export default ContactList
