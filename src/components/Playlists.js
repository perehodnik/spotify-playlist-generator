import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addSearchResult, addArtist, setShowArtist, setCurrentPlaying, setShowPlaylists } from '../actions'
import SpotifyWebApi from 'spotify-web-api-js';
import SearchOutput from './SearchOutput';
import SimilarArtists from './SimilarArtists';
import Player from './Player';


const spotifyApi = new SpotifyWebApi();

class Playlists extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPlaying: -1
        }
    }
    componentWillReceiveProps(props){
        if (props.loginStatus.isLoggedIn) {
          spotifyApi.setAccessToken(props.loginStatus.token);
        }
    }
    playing = (index) => {
        this.setState( {currentPlaying: index});
    }
    stopped = () => {
        this.setState( {currentPlaying: -1});
    }
    getPlaylists(userId) {
        spotifyApi.getUserPlaylists(userId).then(
            data => {
              this.setState({
                  playlists: data
              });
            }
          );
    }
    savePlaylist() {
        spotifyApi.createPlaylist({name: "test"}).then(
            data => {
              console.log(data);
            }
          );
    }
    componentDidMount() {
            this.getPlaylists(this.props.loginStatus.user.id);
    }
    render() {        
        return(
            <>
                <div className="container">
                    {this.state.playlists?
                        (this.state.playlists.items.map(playlist => (
                        <div>{playlist.name}</div>
                        )))
                        :
                        (<div>Loading...</div>)
                }
                </div>
                <div className="container center">
                    {this.props.playlist.map((track,index) =>(
                        <div className="playlist">
                            <Player 
                                url={track.preview_url} 
                                playing={this.state.currentPlaying === index} 
                                setPlaying={this.playing.bind(this, index)} 
                                stopped={this.stopped}
                            />
                            <div><span className="artist-name">{track.name}</span> by <span className="track-name">{track.artists[0].name}</span></div>
                        </div>
                    )
                    )}
                    <button onClick={this.savePlaylist.bind(this)}type="button" class="btn btn-outline-dark mybtn artist-list">Generate your playlist</button>
                 </div>
             </>
            );
    }
}

const mapStateToProps = state => {
    return {
        loginStatus: state.loginStatus,
        searchResult: state.searchResult,
        showArtist: state.showArtist,
        playlist: state.playlist
    };
};

export default connect(mapStateToProps)(Playlists);