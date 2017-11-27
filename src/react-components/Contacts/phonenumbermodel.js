import { PhoneNumberFormat, PhoneNumberUtil, AsYouTypeFormatter } from 'google-libphonenumber'

//
// Phone number support based on google's libphonenumber.
//

const phoneNumberUtil = PhoneNumberUtil.getInstance()
let formatter = null

// libphonenumber's supported country code list
export function countryCodeList () {
  return phoneNumberUtil.getSupportedRegions()
}

// Convert from the local number input to International.
export function convertLocalToE164 (phoneNumber, countryCode) {
  try {
    return phoneNumberUtil.format(phoneNumberUtil.parse(phoneNumber, countryCode), PhoneNumberFormat.E164)
  } catch (e) {
    return ''
  }
}

// Convert from the E164 to the local number.
export function convertE164ToLocal (phoneNumber) {
  try {
    return phoneNumberUtil.format(phoneNumberUtil.parse(phoneNumber), PhoneNumberFormat.NATIONAL)
  } catch (e) {
    return ''
  }
}

export function startTypingFormatter (country) {
  formatter = new AsYouTypeFormatter(country)
}

export function clearTypingFormatter () {
  formatter.clear()
}

// Handles the user typing in local phone numbers
export function typingFormatter (priorText, text) {
  // Check to see if only one char was added since the last call
  if (text.slice(0, text.length - 1) === priorText) {
    return formatter.inputDigit(text.charAt(text.length - 1))
  }
  // Check to see if a backspace key was hit.
  // Remove all formatting and re-process below
  if (priorText.slice(0, priorText.length - 1) === text) {
    text = text.replace(/\D/g, '')
  }
  // Process the entire string
  formatter.clear()
  let str = ''
  const len = text.length
  for (let i = 0; i < len; ++i) {
    str = formatter.inputDigit(text.charAt(i))
  }
  return str
}
