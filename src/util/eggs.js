import Egg from './egg.js'
import {
  allowSetCountryCode,
  allowCallNumber,
  isCallNumber,
  isSetCountryCode,
  isLocalAccess,
  allowLocalAccess
} from './localstorage'
import { globalPartitionState, globalGetState, globalSetState } from '../causality-redux/init'

//
// Easter egg support.
//
const egg = new Egg()

globalSetState({allowCallNumber: isCallNumber(), allowSetCountryCode: isSetCountryCode(), allowLocalAccess: isLocalAccess()})

//
// When an easter egg is opened, set values in the global redux store partition.
// Then code can listen for changes to these keys and handle the opening.
//
const triggers = [
  {
    instructions: 'up,up,down,down',
    easterEggName: 'Allow country code lookup',
    action: () => { allowSetCountryCode(); globalPartitionState.allowSetCountryCode = true },
    valueKey: 'allowSetCountryCode'
  },
  {
    instructions: 'up,down,up,down',
    easterEggName: 'Allow phone dial',
    action: () => { allowCallNumber(); globalPartitionState.allowCallNumber = true },
    valueKey: 'allowCallNumber'
  },
  {
    instructions: 'up,up,up,up',
    easterEggName: 'Allow local access',
    action: () => { allowLocalAccess(); globalPartitionState.allowLocalAccess = true },
    valueKey: 'allowLocalAccess'
  }
]

// Set up the triggers for the easter eggs
triggers.forEach(e => {
  if (!globalGetState()[e.valueKey]) {
    egg.addCode(e.instructions, e.action, e.easterEggName)
      .addHook().listen()
  }
})
