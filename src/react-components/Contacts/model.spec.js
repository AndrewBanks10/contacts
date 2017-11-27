import assert from 'assert'
import { getContacts, saveContact, getContact } from './model'

//
// Test code for the business logic.
//

// Generate a random contact entry to save.
const randomNumber = Math.floor(Math.random() * 100)
const last3 = ('000' + randomNumber).slice(-3)
const name = `The Name${randomNumber}`
const context = `The Context${randomNumber}`
const number = `+15148881${last3}`

describe('Model Contacts', function () {
  this.slow(10000)
  it('Should save contact without error and the server should return the correct response format.', function (done) {
    let obj = {name, context, number}
    saveContact(
      obj,
      function (response) {
        assert(
          response.contact.name === name &&
          response.contact.context === context &&
          response.contact.number === number
        )
        done()
      },
      function () {
        assert(false)
        done()
      }
    )
  })
  // Get the saved contact from the server and verify it.
  it('Verify saved contact', function (done) {
    getContact(
      function (result) {
        assert(
          result.contact.name === name &&
          result.contact.context === context &&
          result.contact.number === number
        )
        done()
      },
      function () {
        assert(false)
        done()
      }
    )
  })
  it('Should get contacts without error and verify the server returns the correct response format.', function (done) {
    getContacts(
      function (result) {
        assert(result.contacts.length === 23)
        done()
      },
      function () {
        assert(false)
        done()
      }
    )
  })
})
