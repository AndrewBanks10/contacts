import React from 'react'
import styles from './SearchBox.inject'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ContentClear from 'material-ui/svg-icons/content/clear'

//
// Search box for filtering the contacts. Sits in the main app bar.
//
const SearchBox = props =>
  <div className={styles.appBarSearchBox}>
    <div className={styles.appBarSearchIcon} title='Filter Contacts'>
      <ActionSearch />
    </div>
    <div className={styles.appBarSearchInputContainer}>
      <input
        id='searchBox'
        placeholder='Search'
        className={styles.appBarSearchInput}
        type='"text'
        onChange={event => props.onSearchChange(event.target.value)}
        value={props.searchText}
      />
    </div>
    <div style={{display: props.searchText !== '' ? '' : 'none'}} onClick={props.clearSearch} title='Clear Search' className={styles.appBarClearSearch}>
      <ContentClear />
    </div>
  </div>

export default SearchBox
