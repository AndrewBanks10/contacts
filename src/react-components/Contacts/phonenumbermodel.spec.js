import assert from 'assert'
import { convertE164ToLocal, countryCodeList, startTypingFormatter, typingFormatter, convertLocalToE164 } from './phonenumbermodel'

//
// Tests the business code for phone numbers.
//
let localPhone = '(513) 899-6780'
let localPhoneDigits = '5138996780'
let e164 = ''
const correctE164 = '+15138996780'
const country = 'US'
startTypingFormatter(country)

describe('Model phonenumber', function () {
  it('Should return country code list', function () {
    assert(countryCodeList().length > 0)
  })
  it('Verify convertLocalToE164', function () {
    e164 = convertLocalToE164(localPhone, country)
    assert(e164 === correctE164)
  })
  it('Verify convertE164ToLocal', function () {
    const local = convertE164ToLocal(e164)
    assert(local === localPhone)
  })
  it('Verify typingFormatter', function () {
    const local = typingFormatter('', localPhoneDigits)
    assert(local === localPhone)
  })
})
