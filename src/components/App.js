import React, { Component } from 'react';
import '../App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import SearchInput from './SearchInput';
import { setLoginStatus } from '../actions';
import { connect } from 'react-redux';
import UserInfo from './UserInfo';
import ArtistList from './ArtistList';
import Playlists from './Playlists';
import * as apiCalls from '../api/api';


const spotifyApi = new SpotifyWebApi();


class App extends Component {
  constructor(){
    super();
    this.params = this.getHashParams();
    this.token = this.params.access_token;
    spotifyApi.setAccessToken(this.token);
    this.state = {
      loggedIn: this.token ? true : false,
      searchOutput: [],
      savedArtists: []
    }
  }
  componentDidMount(){
    if (this.token) {
      this.props.dispatch(setLoginStatus(this.token));
      apiCalls.setTokenHeader(this.token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  render() {
    return (
      <div className='App'>
        {this.state.loggedIn?  
        (
          <>
            <UserInfo />
            <div className="main">
              {this.props.showPlaylists? (<Playlists />):
              (<SearchInput placeholder="search artist"></SearchInput>)}
              <ArtistList />
            </div>

          </>
        ) :
        (<div>
          <h2>Please login to continue</h2>
          <a className="btn btn-outline-dark mybtn" href='http://spotify.abishev.me/login'> Login with Spotify </a>
         </div>
        )
       }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      loginStatus: state.loginStatus,
      searchResult: state.searchResult,
      showArtist: state.showArtist,
      showPlaylists: state.showPlaylists
  };
};

export default connect(mapStateToProps)(App);
