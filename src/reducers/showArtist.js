const showArtist = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SHOW_ARTIST':
        return action.artist
      default:
        return state
    }
  }
  
  export default showArtist