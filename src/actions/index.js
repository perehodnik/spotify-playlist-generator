export const addSearchResult = result => ({
  type: 'ADD_SEARCH_RESULT',
  result
})

export const setLoginStatus = token => ({
  type: 'SET_LOGIN_STATUS',
  token
})

export const setUserInfo = user => ({
  type: 'SET_USER_INFO',
  user
})

export const addArtist = artist => ({
  type: 'ADD_ARTIST',
  artist
})

export const removeArtist = artist => ({
  type: 'DELETE_ARTIST',
  id: artist
})

export const setShowArtist = artist => ({
  type: 'SET_SHOW_ARTIST',
  artist
})

export const setCurrentPlaying = index => ({
  type: 'SET_CURRENT_PLAYING',
  index
})

export const setShowPlaylists = value => ({
  type: 'SET_SHOW_PLAYLISTS',
  value
})

export const setPlaylist = playlist => ({
  type: 'SET_PLAYLIST',
  playlist
})