import React from 'react'

//
// Handles a phone number based on whether dialing is allowed.
//
const PhoneNumber = props => {
  let phone = <div>{`${props.localPhone}`}</div>
  // Allows calling the phone number
  if (props.allowCallNumber) {
    phone = <a target='_blank' href={`https://hangouts.google.com/?action=chat&pn=${encodeURIComponent(props.number)}&hl=en&authuser=0`}>{props.localPhone}</a>
  }
  return phone
}

export default PhoneNumber
