export const filterActions = (e) => {
  return {
    type: e.target.id,
    checked: e.target.checked,
    active: e.target.dataset.filterActive,
  }
}

export const tabActions = (e) => {
  return { type: e.target.id }
}

const baseUrl = 'https://aviasales-test-api.kata.academy'
let searchId

export const thunkGetSearchId = () => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/search`)
    const responseSearchId = await response.json()
    searchId = responseSearchId.searchId
    dispatch({
      type: 'SEARCH_ID',
      searchId,
    })
  } catch (error) {
    dispatch({
      type: 'ERROR',
    })
  }
}

export const thunkGetTickets = () => async (dispatch) => {
  let response
  try {
    response = await fetch(`${baseUrl}/tickets?searchId=${searchId}`)
    const tickets = await response.json()
    dispatch({
      type: 'ADD_TICKETS',
      tickets: tickets.tickets,
      stop: tickets.stop,
      load: !tickets.stop,
    })
  } catch (error) {
    if (response.status === 500) {
      dispatch({
        type: 'ADD_TICKETS',
        tickets: [],
        load: true,
      })
      thunkGetTickets()
    } else {
      dispatch({
        type: 'ERROR',
      })
    }
  }
}
