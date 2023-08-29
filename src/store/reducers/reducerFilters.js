const initialFilters = {
  ALL: true,
  WITHOUT_TRANSFERS: true,
  ONE_TRANSFER: true,
  TWO_TRANSFERS: true,
  THREE_TRANSFERS: true,
  activeFilters: ['ALL'],
}

function setFiltersToState(checked, state, type, active) {
  let checkedFiltersCounter = 0
  const keys = Object.keys(state)
  keys.pop()
  keys.forEach((key) => {
    if (state[key]) {
      checkedFiltersCounter++
    }
  })
  if (checked && type === 'ALL') {
    return initialFilters
  } else if (!checked && type === 'ALL') {
    return {
      ...state,
      ALL: false,
      WITHOUT_TRANSFERS: false,
      ONE_TRANSFER: false,
      TWO_TRANSFERS: false,
      THREE_TRANSFERS: false,
      activeFilters: [],
    }
  }

  if (checked && type !== 'ALL' && checkedFiltersCounter === 3) {
    return {
      ...state,
      [type]: !state[type],
      ALL: true,
      activeFilters: ['ALL'],
    }
  } else if (!checked && type !== 'ALL') {
    const activeFilters = checkedFiltersCounter === 5 ? ['0', '1', '2', '3'] : [...state.activeFilters]
    const newActiveFilters = activeFilters.filter((activeItem) => activeItem !== active && activeItem !== 'ALL')
    return {
      ...state,
      [type]: !state[type],
      ALL: false,
      activeFilters: newActiveFilters,
    }
  } else if (checked && type !== 'ALL') {
    const newActiveFilters = [...state.activeFilters]
    newActiveFilters.push(active)
    return {
      ...state,
      [type]: !state[type],
      ALL: false,
      activeFilters: newActiveFilters,
    }
  }
}

const reducerFilters = (state = initialFilters, action) => {
  switch (action.type) {
    case 'ALL':
      return setFiltersToState(action.checked, state, action.type, action.active)
    case 'WITHOUT_TRANSFERS':
      return setFiltersToState(action.checked, state, action.type, action.active)
    case 'ONE_TRANSFER':
      return setFiltersToState(action.checked, state, action.type, action.active)
    case 'TWO_TRANSFERS':
      return setFiltersToState(action.checked, state, action.type, action.active)
    case 'THREE_TRANSFERS':
      return setFiltersToState(action.checked, state, action.type, action.active)
    default:
      return state
  }
}

export default reducerFilters