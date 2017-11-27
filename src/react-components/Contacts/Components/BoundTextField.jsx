import React from 'react'
import TextField from 'material-ui/TextField'
import styles from './BoundTextField.inject'

//
// Allows binding a text field to a redux store key/value
//
const BoundTextField = props =>
  <TextField
    id={props.id}
    fullWidth={true}
    hintText={props.hintText}
    type={typeof props.type === 'undefined' ? 'text' : props.type}
    onChange={(e, value) => { props.onChange(props.storeKey, value) }}
    value={props.value}
    underlineShow={true}
    floatingLabelFixed={false}
    name={props.storeKey}
  />

  //
  // Text field has an icon associated with it.
  //
const IconBoundTextField = props =>
  <div>
    <div className={styles.boundTextIcon}>
      <props.icon />
    </div>
    <div className={styles.boundText}>
      <BoundTextField {...props} />
    </div>
    <div className={styles.floatClear} />
  </div>

export { BoundTextField, IconBoundTextField }
