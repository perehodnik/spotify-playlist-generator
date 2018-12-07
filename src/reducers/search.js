const searchResult = (state = [], action) => {
    switch (action.type) {
      case 'ADD_SEARCH_RESULT':
        return action.result
      default:
        return state
    }
  }
  
  export default searchResult