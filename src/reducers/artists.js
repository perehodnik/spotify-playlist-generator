const artists = (state = [], action) => {
    switch (action.type) {
      case 'ADD_ARTIST':
        let duplicate = false;
        state.forEach(key => {
          if (key.id === action.artist.id) {
            duplicate = true;
          }
        });
        if (duplicate) {
          return state;
        }else {
          return [
            ...state,
            action.artist
          ]
        }
        
      case 'DELETE_ARTIST':
        return state.filter(artist =>
          (artist.id === action.id)
            ? false
            : true
        )
      default:
        return state
    }
  }
  
  export default artists