import React, {Component} from 'react';
import { connect } from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';


const spotifyApi = new SpotifyWebApi();

class Playlists extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPlaying: -1,
            playlistName: ''
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
        spotifyApi.createPlaylist({name: this.state.playlistName, public: false}).then(
            data => {
              let tracks = this.props.playlist.map(track => track.uri);
              spotifyApi.addTracksToPlaylist(data.id, tracks).then( result => {
                alert("Playlist successfully saved!");
                this.getPlaylists(this.props.loginStatus.user.id);
              }
              );
            }
          );
    }
    savePlaylistName(e) {
        this.setState({playlistName: e.target.value});
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
                        <div key={playlist.id}>{playlist.name}</div>
                        )))
                        :
                        (<div>Loading...</div>)
                }
                </div>
                <div className="container center">
                    <input className="search-input"
                        type="text" 
                        onKeyUp={this.savePlaylistName.bind(this)}
                        placeholder="Playlist name"
                    />
                    <button onClick={this.savePlaylist.bind(this)} type="button" className="btn btn-outline-dark mybtn artist-list">Save the playlist</button>
                    {this.props.playlist.map((track,index) =>(
                        <div key={track.id} className="playlist">
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