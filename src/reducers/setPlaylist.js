const setPlaylist = (state = [], action) => {
    switch (action.type) {
      case 'SET_PLAYLIST':
        return action.playlist
      default:
        return state
    }
  }
  
  export default setPlaylist