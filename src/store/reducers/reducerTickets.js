import { format } from 'date-fns'

const initialTickets = { tickets: [], searchId: '', isLoading: true, isStoped: false, isError: false }

let ticketId = 1
const fromTo = (from, to) => `${from} - ${to}`
const transfersCount = (count) => (count ? String(count) : '')
const transfersName = (arrayNames) => (arrayNames.length ? arrayNames.join(', ') : 'НЕТ')
const fromToTime = (date, duration) => {
  return `${format(new Date(date), 'HH:mm')} - ${format(
    new Date(new Date(date).getTime() + duration * 60 * 1000),
    'HH:mm'
  )}`
}

const baseUrl = 'https://aviasales-test-api.kata.academy'

export const thunkGetSearchId = () => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/search`)
    const responseSearchId = await response.json()

    dispatch({
      type: 'SEARCH_ID',
      searchId: responseSearchId.searchId,
    })
  } catch (error) {
    dispatch({
      type: 'ERROR',
    })
  }
}

function addTickets(tickets) {
  const ticketsList = []
  tickets.forEach((ticket) => {
    const newTicket = {
      id: ticketId++,
      fromTo: fromTo(ticket.segments[0].origin, ticket.segments[0].destination),
      fromToBack: fromTo(ticket.segments[1].origin, ticket.segments[1].destination),
      fromToTime: fromToTime(ticket.segments[0].date, ticket.segments[0].duration),
      fromToTimeBack: fromToTime(ticket.segments[1].date, ticket.segments[1].duration),
      travelTime: ticket.segments[0].duration,
      travelTimeBack: ticket.segments[1].duration,
      transfersCount: transfersCount(ticket.segments[0].stops.length),
      transfersCountBack: transfersCount(ticket.segments[1].stops.length),
      transfersName: transfersName(ticket.segments[0].stops),
      transfersNameBack: transfersName(ticket.segments[1].stops),
      carrier: ticket.carrier,
      price: ticket.price,
    }
    ticketsList.push(newTicket)
  })
  return ticketsList
}

const reducerTickets = (state = initialTickets, action) => {
  switch (action.type) {
    case 'SEARCH_ID':
      return {
        ...state,
        searchId: action.searchId,
      }
    case 'ADD_TICKETS':
      return {
        ...state,
        tickets: [...state.tickets, ...addTickets(action.tickets)],
        isStoped: action.stop,
        isLoading: action.load,
      }
    case 'ERROR':
      return {
        ...state,
        isError: true,
        isLoading: false,
      }
    default:
      return state
  }
}

export default reducerTickets