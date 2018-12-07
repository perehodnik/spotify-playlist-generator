const showPlaylists = (state = false, action) => {
    switch (action.type) {
      case 'SET_SHOW_PLAYLISTS':
        return action.value
      default:
        return state
    }
  }
  
  export default showPlaylists