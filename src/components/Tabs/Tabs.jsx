import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PropTypes } from 'prop-types'

import * as actions from '../../store/actions/actions'
import { tabs } from '../../constants/constants'

import styles from './Tabs.module.scss'

function Tabs({ tabActions, tabsState }) {
  Tabs.defaultProps = {
    tabsState: {},
    tabActions: () => {},
  }
  Tabs.propTypes = {
    tabsState: PropTypes.object,
    tabActions: PropTypes.func,
  }
  return (
    <ul className={styles.container}>
      {tabs.map((tab) => {
        return (
          <li className={styles.tab} key={tab.id}>
            <input type="radio" name="tabs" id={tab.id} checked={tabsState[tab.id]} onChange={tabActions} />
            <label htmlFor={tab.id}>{tab.value}</label>
          </li>
        )
      })}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    tabsState: state.reducerTabs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)