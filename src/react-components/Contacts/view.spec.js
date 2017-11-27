import assert from 'assert'
import CausalityRedux from 'causality-redux'
import { contactsPartition } from './controller'
import { getContact } from './model'
import { find, handleReactAsyncStart, findNodeFunction, findNode, nodeExists, testCauseAndEffectWithExists } from '../../../test/projectsetup'

//
// Tests the contacts UI
//

const { partitionState } = CausalityRedux.store[contactsPartition]

// Material-ui helpers
const simulateInput = (id, input) =>
  (findNode(findNodeFunction('input', id)).simulate('change', { target: { value: input } }))

//
// Generate a random contact to save.
//
const randomNumber = Math.floor(Math.random() * 100)
const last3 = ('000' + randomNumber).slice(-3)
const name = `The Name${randomNumber}`
const context = `The Context${randomNumber}`
const phone = `(514) 888-1${last3}`
const e164Phone = `+15148881${last3}`

const verifyContact = contact => {
  contact = contact.contact
  return (
    name === contact.name &&
    e164Phone === contact.number &&
    context === contact.context
  )
}

let contactVerified = false

const simulateButtonClick = id =>
  (findNode(findNodeFunction('button', id)).simulate('click'))

describe('View Contacts', function () {
  this.slow(10000)
  it('Verify contacts are on screen from the initial load.', function (done) {
    handleReactAsyncStart(done, undefined, () => nodeExists('[data-contactrow]'))
  })
  it('Verify all contacts are on the screen.', function () {
    const names = find('[data-name]')
    assert(names.length === 23)
  })
  it('Verify all contacts on screen against the redux store value filteredContacts.', function () {
    // This tests that the UI is correctly displaying partitionState.filteredContacts.
    const names = find('[data-name]')
    const contexts = find('[data-context]')
    const phoneNumbers = find('[data-phonenumber]')
    const filteredContacts = partitionState.filteredContacts
    for (let i = 0; i < names.length; ++i) {
      assert(
        filteredContacts[i].name === names.at(i).text() &&
        filteredContacts[i].context === contexts.at(i).text() &&
        filteredContacts[i].localPhone === phoneNumbers.at(i).text()
      )
    }
  })
  it('Filter contacts verified.', function (done) {
    // Prove that the correct names are on screen after a filter with H
    const filter = 'H'
    simulateInput('searchBox', filter)
    const shouldBeNames = [
      'Hoag Penkill',
      'Hunterstone Ravenscraig'
    ]
    handleReactAsyncStart(
      done,
      undefined,
      () => {
        const names = find('[data-name]')
        for (let i = 0; i < names.length; ++i) {
          if (shouldBeNames[i] !== names.at(i).text()) {
            return false
          }
        }
        return true
      }
    )
  })

  it('Verify add contact dialog is not on screen.', function () {
    assert(!nodeExists('#addContact'))
  })
  // Open the add contact dialog
  it('Verify click to open add contact dialog.', function (done) {
    testCauseAndEffectWithExists(findNodeFunction('button', 'addContactButton'), '#addContact', done)
  })
  it('Verify the contact is saved.', function (done) {
    // https://github.com/mui-org/material-ui/issues/7970
    // https://github.com/mui-org/material-ui/issues/6290
    /*
      The above shows that material-ui's dialog will not allow access to the buttons
      and text controls from enzyme. None of the solutions worked for me so in order
      for mocha testing to be performed, a different  Dialog component needed to be written which
      allows for proper mocha testing.
    */

    // Fill in the contact fields in the contact dialog
    simulateInput('nameField', name)
    simulateInput('contextField', context)
    simulateInput('phoneField', phone)
    // Click the save button
    simulateButtonClick('contactSaveButton')
    // Get the contact from the server and verify it on success.
    getContact(
      obj => { contactVerified = verifyContact(obj) }
    )

    // Wait for contactVerified to be true or timeout for failure
    handleReactAsyncStart(done, undefined, () => contactVerified)
  })
})
