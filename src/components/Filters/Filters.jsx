import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PropTypes } from 'prop-types'

import * as actions from '../../store/actions/actions'
import { filters } from '../../constants/constants'

import styles from './Filters.module.scss'

function Filters({ filtersState, filterActions }) {
  Filters.defaultProps = {
    filtersState: {},
    filterActions: () => {},
  }
  Filters.propTypes = {
    filtersState: PropTypes.object,
    filterActions: PropTypes.func,
  }

  // test

  return (
    <div className={styles.container}>
      <div className={styles.header}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <ul className={styles.filters}>
        {filters.map((filter) => {
          return (
            <div className={styles.filterContainer} key={filter.id}>
              <li className={styles.filter}>
                <input
                  className={styles.filter__button}
                  type="checkbox"
                  name={filter.value}
                  id={filter.id}
                  data-filter-active={filter.dataValue}
                  checked={filtersState[filter.id]}
                  onChange={filterActions}
                />
                <label htmlFor={filter.id} className={styles.filter__text}>
                  {filter.value}
                </label>
              </li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filtersState: state.reducerFilters,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)