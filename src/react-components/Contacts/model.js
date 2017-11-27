import Http from '../../util/http'

const contactsUrl = 'http://localhost:3004/contacts'
const contactUrl = 'http://localhost:3004/contact'
const countryCodeURL = 'http://freegeoip.net/json/'
const pingServerURL = 'http://localhost:3004/ping'

//
// Business logic for accessing the server.
//
export function getContacts (success, fail) {
  new Http().getJSON(contactsUrl, success, fail)
}

export function saveContact (entry, success, fail) {
  new Http().postJSON(contactUrl, entry, success, fail)
}

export function getContact (success, fail) {
  new Http().getJSON(contactUrl, success, fail)
}

export function getCountryCode (success, fail) {
  new Http().getJSON(countryCodeURL, success, fail)
}

export function pingServer (success, fail) {
  new Http().getJSON(pingServerURL, success, fail)
}
