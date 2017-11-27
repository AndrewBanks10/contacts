const STORAGE_KEY = 'local'

//
// Local storage support for contacts and saving easter egg options.
//

const getLocal = () =>
  (JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'))

const saveLocal = obj =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))

const getLocalItem = key =>
  (getLocal()[key] || {})

const saveLocalItem = (key, value) => {
  const obj = getLocal()
  obj[key] = value
  saveLocal(obj)
}

export const getLocalContacts = () =>
  (getLocalItem('contacts'))

export const saveLocalContacts = contacts =>
  (saveLocalItem('contacts', contacts))

const getLocalOptions = () =>
  (getLocalItem('options'))

export const saveLocalOptions = options =>
  (saveLocalItem('options', options))

const getLocalOption = key => {
  const option = getLocalItem('options')[key]
  if (typeof option === 'undefined') {
    return false
  }
  return option
}

const saveLocalOption = key => {
  const options = getLocalOptions()
  options[key] = true
  saveLocalOptions(options)
}

export const isSetCountryCode = () =>
  (getLocalOption('isSetCountryCode'))

export const allowSetCountryCode = () =>
  (saveLocalOption('isSetCountryCode'))

export const isCallNumber = () =>
  (getLocalOption('isCallNumber'))

export const allowCallNumber = () =>
  (saveLocalOption('isCallNumber'))

export const isLocalAccess = () =>
  (getLocalOption('isLocalAccess'))

export const allowLocalAccess = () =>
  (saveLocalOption('isLocalAccess'))
