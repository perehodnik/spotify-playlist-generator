import { combineReducers } from 'redux'
import artists from './artists';
import searchResult from './search';
import loginStatus from './login';
import showArtist from './showArtist';
import currentPlaying from './currentPlaying';
import showPlaylists from './showPlaylists';
import playlist from './setPlaylist';

export default combineReducers({
  artists,
  searchResult,
  loginStatus,
  currentPlaying,
  showArtist,
  showPlaylists,
  playlist
})