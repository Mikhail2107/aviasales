import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PropTypes } from 'prop-types'

import * as actions from '../../store/actions/actions'
import ButtonMore from '../ButtonMore/ButtonMore'
import Ticket from '../Ticket/Ticket'
import Tabs from '../Tabs/Tabs'
import Loader from '../Loader/Loader'

import styles from './TicketsList.module.scss'

function compare(a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function sortedTicketsList(tickets, activeFilters, tab) {
  let sortedTickets = []
  if (activeFilters[0] === 'ALL') {
    sortedTickets = [...tickets]
  } else {
    let list
    activeFilters.forEach((activeFilter) => {
      list = tickets.filter(
        (ticket) => +ticket.transfersCount === +activeFilter && +ticket.transfersCountBack === +activeFilter
      )
      sortedTickets.push(...list)
    })
  }
  if (tab.CHEEPEST) {
    sortedTickets.sort((a, b) => {
      return compare(a.price, b.price)
    })
  }
  if (tab.FASTEST) {
    sortedTickets.sort((a, b) => {
      const time1 = a.travelTime + a.travelTimeBack
      const time2 = b.travelTime + b.travelTimeBack
      return compare(time1, time2)
    })
  }
  return sortedTickets
}

function renderTickets(tickets, ticketsCount) {
  return tickets.map((ticket, index) => {
    return index + 1 > ticketsCount ? null : <Ticket ticket={ticket} key={ticket.id} />
  })
}

function TicketsList({
  tickets,
  tab,
  searchId,
  thunkGetSearchId,
  thunkGetTickets,
  isStoped,
  isLoading,
  isError,
  activeFilters,
}) {
  TicketsList.defaultProps = {
    tickets: [],
    tab: false,
    searchId: '',
    thunkGetSearchId: () => {},
    thunkGetTickets: () => {},
    isStoped: false,
    isLoading: false,
    isError: false,
    activeFilters: [],
  }
  TicketsList.propTypes = {
    tickets: PropTypes.array,
    tab: PropTypes.object,
    searchId: PropTypes.string,
    thunkGetSearchId: PropTypes.func,
    thunkGetTickets: PropTypes.func,
    isStoped: PropTypes.bool,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    activeFilters: PropTypes.array,
  }
  useEffect(() => {
    thunkGetSearchId()
  }, [])

  useEffect(() => {
    if (!isStoped && searchId) {
      thunkGetTickets()
    }
  }, [searchId, tickets])

  const [ticketsCount, showTicketsCount] = useState(5)
  const handleAddTickets = () => showTicketsCount((prevCount) => prevCount + 5)
  const sortedTickets = sortedTicketsList(tickets, activeFilters, tab)
  return (
    <div className={styles.ticketsList}>
      <Tabs />
      {isLoading ? <Loader /> : null}
      {!isLoading && isError ? (
        <div className={styles.errorMessage}>Ошибка загрузки. Перезагрузите страницу</div>
      ) : null}
      {isStoped && !isLoading && !isError && !sortedTickets.length ? (
        <div className={styles.errorMessage}>Подходящих билетов не найдено</div>
      ) : null}
      {tickets.length && !isError ? renderTickets(sortedTickets, ticketsCount) : null}
      <ButtonMore handleAddTickets={handleAddTickets} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchId: state.reducerTickets.searchId,
    tickets: state.reducerTickets.tickets,
    isStoped: state.reducerTickets.isStoped,
    isLoading: state.reducerTickets.isLoading,
    isError: state.reducerTickets.isError,
    activeFilters: state.reducerFilters.activeFilters,
    tab: state.reducerTabs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList)
