const initialTabs = { CHEEPEST: true, FASTEST: false }

const reducerTabs = (state = initialTabs, action) => {
  switch (action.type) {
    case 'CHEEPEST':
      return {
        ...state,
        CHEEPEST: true,
        FASTEST: false,
      }
    case 'FASTEST':
      return {
        ...state,
        FASTEST: true,
        CHEEPEST: false,
      }
    default:
      return state
  }
}

export default reducerTabs
