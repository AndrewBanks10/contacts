import CausalityRedux from 'causality-redux'
import Contacts from './view'
import { globalSubscribe, globalPartitionState, globalGetState } from '../../causality-redux/init'
import { saveLocalContacts, getLocalContacts } from '../../util/localstorage'
import {
  convertE164ToLocal,
  countryCodeList,
  startTypingFormatter,
  typingFormatter,
  clearTypingFormatter,
  convertLocalToE164
} from './phonenumbermodel'
import {
  getContacts,
  saveContact,
  getCountryCode,
  pingServer
} from './model'

//
// This is the controller. This is the intelligence of thg component. The model/business
// code should only take input and produce output ideally as functional programming.
// The UI code will only be react stateless components that only implement UI display and
// provide UI initiated actions such as click.
// This is where all the control happens in terms of initializing the component and
// also shepherding user requests to the business code. From there, the controller
// forwards the output of the business code to the component by setting redux partition
// store values which are transfered to the props of the react UI which cause the UI to
// update. In effect, this programming technique implements a finite state automata that
// satisfies causailitybased programming.
//

let countryCode = 'US'
// Initialize the libphonenumber typing formatter
startTypingFormatter(countryCode)

//
// Redux state partition definition. Defines all data for the contacts component.
//
const defaultState = {
  contactSaved: {}, // The contact that was saved
  searchText: '', // Current search text on the app bar
  contacts: [], // Cache of contacts
  filteredContacts: [], // The contacts displayed to the user.
  addContactActive: false, // Turns on and off the add contact dialog
  name: '', // Name on the contacts add dialog.
  context: '', // Context on the contacts add dialog.
  phone: '', // Local phone number on the contacts add dialog.
  phoneCountryCode: countryCode, // Local country code on the contacts add dialog.
  priorPhone: '', // Used for the typing formatter
  countryCodes: countryCodeList(), // Country code list from google
  isBusy: false, // Controls the UI busy indicator
  statusMessage: '', // Control displaying status messages
  allowCallNumber: false, // Determines whether phone numbers can be called.
  serverUp: false, // Indicates whether the server is up.
  displayItem: {}, // The contact to be displayed.
  displayContactActive: false // Indicates that a contact should be displayed.
}

// Filter the displayed contacts based on user input.
const filterSearch = (value) => {
  let filteredContacts = partitionState.contacts
  const searchText = value
  if (value !== '') {
    value = value.toLowerCase()
    // Begins with value, filter all the contacts.
    filteredContacts = partitionState.contacts.filter(e =>
      e.name.toLowerCase().lastIndexOf(value, 0) === 0
    )
  }
  setState({ searchText, filteredContacts })
}

// Sort contacts by name
const sortContacts = (e1, e2) => {
  const l1 = e1.name.toLowerCase()
  const l2 = e2.name.toLowerCase()
  if (l1 < l2) {
    return -1
  }
  if (l1 > l2) {
    return 1
  }
  return 0
}

//
// The contact was saved successfully
//
const saveContactsSuccess = () => {
  // Get the saved contact object
  const contactSaved = partitionState.contactSaved
  // Add the local phone to it
  contactSaved.localPhone = partitionState.phone
  // Update the local contacts cache
  const contacts = partitionState.contacts
  contacts.push(contactSaved)
  contacts.sort(sortContacts)
  // Save the contacts to the redux store partition
  partitionState.contacts = contacts
  // Filter based on the current filter after the add
  filterSearch(partitionState.searchText)
  // Set the relevent redux store values
  // Removes the add contact dialog, turns off the busy indicator and displays a success message.
  setState({ addContactActive: false, isBusy: false, statusMessage: 'Contact saved.' })
}

// Error saving contact, display message.
const saveContactsFail = () =>
  (setState({ statusMessage: 'Error: Could not save contact.', isBusy: false }))

//
// Controller functions exposed to the props of the UI
//
const controllerFunctions = {
  // Clear the search box.
  clearSearch: () =>
    (filterSearch('')),
  // The user changed the search box.
  onSearchChange: (value) =>
    (filterSearch(value)),
  // Display the add contact dialog.
  onAddContact: () => {
    (setState({ phoneCountryCode: countryCode, name: '', context: '', phone: '', addContactActive: true, priorPhone: '' }))
    clearTypingFormatter()
  },
  // Close the add contact dialog on screen.
  closeAddContact: () =>
    (partitionState.addContactActive = false),
  // Save a contact.
  saveContact: () => {
    // Get this partition state
    const state = getState()
    // Create an object to store based on the user input values
    const obj = { number: convertLocalToE164(state.phone, state.phoneCountryCode), name: state.name, context: state.context }
    // Set the redux partition store
    setState({ contactSaved: obj, isBusy: true })
    // Save
    saveContact(obj, saveContactsSuccess, saveContactsFail)
  },
  // General onChange handler.
  onChange: (key, value) =>
    (partitionState[key] = value),
  // Handles inputing the phone number.
  onChangePhone: phone => {
    phone = typingFormatter(partitionState.priorPhone, phone)
    setState({ priorPhone: phone, phone })
  },
  // Handles changing the country code for the add contact dialog
  onChangeCountryCode: (param1, param2, code) => {
    partitionState.phoneCountryCode = code
    startTypingFormatter(code)
    setState({ priorPhone: '', phone: '' })
  },
  // Close the status message on the screen
  closeStatusMessage: () =>
    (partitionState.statusMessage = ''),
  // Close the display contact dialog.
  closeDisplayContact: () =>
    (partitionState.displayContactActive = false),
  // A contact row was clicked, open the display contact dialog.
  clickContactRow: displayItem =>
    (setState({displayContactActive: true, displayItem}))
}

//
// The below performs the controller to UI connections.
// It supplies the partition store keys/values to the props and
// also make the controller functions available to the props.
// Fundamentally, it hijacks the redux connect function.
//
export const contactsPartition = 'contactsPartition'
const { partitionState, setState, getState, wrappedComponents } = CausalityRedux.establishControllerConnections({
  module,
  partition: { partitionName: contactsPartition, defaultState, controllerFunctions },
  uiComponent: Contacts,
  uiComponentName: 'Contacts'
})

//
// Gets the country code basesd on the user's IP.
//
const handleGetCountryCode = () => {
  getCountryCode(
    response => {
      countryCode = response.country_code
      partitionState.phoneCountryCode = countryCode
    }
  )
}

//
// If permitted get the country code based on the IP address
//
if (globalPartitionState.allowSetCountryCode) {
  handleGetCountryCode()
}

// Set the value that indicates phone numbers can be called
partitionState.allowCallNumber = globalPartitionState.allowCallNumber

//
// Get the initial contact list
//
const handleContacts = (list) => {
  list.sort(sortContacts)
  const len = list.length
  // This allows displaying the local phoe format.
  for (let i = 0; i < len; ++i) {
    list[i].localPhone = convertE164ToLocal(list[i].number)
  }
  // Save the list to the redux store cache.
  partitionState.contacts = list
  // Filter search with nothing.
  filterSearch('')
}

//
// Handles getting the contacts for the live UI and mocha
//
export const controllerGetContacts = (success, fail) => {
  getContacts(
    // Success/resolve
    result => {
      const list = [...result.contacts]
      // Save the current contacts to the local storage.
      saveLocalContacts(list)
      // Set up the redux store with the contacts info.
      handleContacts(list)
      // Indicate that the server is up.
      partitionState.serverUp = true
      if (typeof success === 'function') {
        success()
      }
    },
    // Fail/reject
    () => {
      if (typeof fail === 'function') {
        fail()
      }
      if (globalPartitionState.allowLocalAccess) {
        // Bring in the local contacts.
        handleContacts(getLocalContacts())
        // Set the below so that serverIsDown works.
        partitionState.serverUp = true
        serverIsDown()
      } else {
        partitionState.statusMessage = 'Error: Could not load contacts. You do not have access to the server.'
      }
    })
}
// Get the initial contacts.
controllerGetContacts()

//
// Easter egg support
//
const severPingTime = 10000

// Callback to handle the server being up.
const serverIsUp = () => {
  if (partitionState.serverUp) {
    return
  }
  // Get the contacts from the server.
  controllerGetContacts()
  // Let the user know that the server is now up.
  setState({serverUp: true, statusMessage: 'You have server access. You can now save contacts.'})
}

// Callback to handle the server being down.
const serverIsDown = () => {
  if (!partitionState.serverUp) {
    return
  }
  // Let the user know that thwe server is down.
  setState({serverUp: false, statusMessage: 'You do not have access to the server. You cannot save contacts but can access them.'})
}

// Watches the server with pings.
const watchServer = () =>
  (pingServer(serverIsUp, serverIsDown))

// If allowed, continuously watch the server for status.
if (globalPartitionState.allowLocalAccess) {
  setInterval(watchServer, severPingTime)
}

// The next three functions below handle unlocking the easster eggs.
const unlockGetCountryCode = message => {
  handleGetCountryCode()
  partitionState.statusMessage = message
}

const unlockAllowCallNumber = message => {
  partitionState.allowCallNumber = true
  partitionState.statusMessage = message
}

const unlockAllowLocalAccess = message => {
  if (!partitionState.serverUp) {
    handleContacts(getLocalContacts())
  }
  setInterval(watchServer, severPingTime)
  partitionState.statusMessage = message
}

// Used to handle opening easter eggs.
const unlockFeatures = [
  {
    listenerKey: 'allowCallNumber',
    listener: unlockAllowCallNumber,
    message: 'Congratulations, you have unlocked the capability to call phone numbers in your contact list.'
  },
  {
    listenerKey: 'allowSetCountryCode',
    listener: unlockGetCountryCode,
    message: 'Congratulations, you have unlocked the capability to have your country code defaulted to the country code of your IP address.'
  },
  {
    listenerKey: 'allowLocalAccess',
    listener: unlockAllowLocalAccess,
    message: 'Congratulations, you have unlocked the capability to have local access to your contacts when you do not have access to the server.'
  }
]

//
// Causality-redux provides a global store. We can listen for changes on keys in that store.
// So, use that to listen for easter eggs being opened from src/util/eggs.js
//
unlockFeatures.forEach(e => {
  if (!globalGetState()[e.listenerKey]) {
    globalSubscribe(() => (e.listener(e.message)), e.listenerKey)
  }
})

export default wrappedComponents.Contacts
