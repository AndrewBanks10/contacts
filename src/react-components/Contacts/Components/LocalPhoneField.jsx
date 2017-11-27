import React from 'react'
import styles from './BoundTextField.inject'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

//
// UI for handling entering a phone number.
//
const IconBoundLocalPhoneField = props => {
  const maxListHeight = 200
  const selectWidth = '80px'
  const items = []
  const len = props.countryCodes.length
  for (let i = 0; i < len; i++) {
    items.push(<MenuItem value={props.countryCodes[i]} key={i} primaryText={props.countryCodes[i]} />)
  }
  return (
    <div>
      <div className={styles.boundTextIcon}>
        <props.icon />
      </div>
      <div className={styles.floatLeft}>
        <SelectField
          autoWidth={true}
          value={props.listValue}
          onChange={props.onListChange}
          maxHeight={maxListHeight}
          style={{width: `${selectWidth}`}}
        >
          {items}
        </SelectField>
      </div>
      <div className={styles.phoneText}>
        <TextField
          id={props.id}
          fullWidth={true}
          hintText={props.hintText}
          type='tel'
          onChange={(e, value) => props.onChange(value)}
          value={props.value}
          underlineShow={true}
          floatingLabelFixed={false}
        />
      </div>
      <div className={styles.floatClear} />
    </div >
  )
}

export { IconBoundLocalPhoneField }
