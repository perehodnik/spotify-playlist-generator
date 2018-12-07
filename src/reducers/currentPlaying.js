const currentPlaying = (state = -1, action) => {
    switch (action.type) {
      case 'SET_CURRENT_PLAYING':
        return action.index
      default:
        return state
    }
  }
  
  export default currentPlaying