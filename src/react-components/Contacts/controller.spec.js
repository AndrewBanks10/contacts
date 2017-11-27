import assert from 'assert'

import CausalityRedux from 'causality-redux'
import { contactsPartition, controllerGetContacts } from './controller'

const partitionStore = CausalityRedux.store[contactsPartition]
const partitionState = partitionStore.partitionState

//
// Code for testing just the controller.
//
describe('Controller Contacts', function () {
  this.slow(10000)
  it('Validate initial get contacts.', function (done) {
    controllerGetContacts(
      () => {
        assert(partitionState.contacts.length > 0)
        assert(partitionState.filteredContacts.length > 0)
        done()
      },
      () => {
        assert(false)
        done()
      }
    )
  })
  it('Validate country codes are set.', function () {
    assert(partitionState.countryCodes.length > 0)
  })
})
