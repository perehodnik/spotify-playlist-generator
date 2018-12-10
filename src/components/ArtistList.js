import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addArtist, setShowPlaylists, setPlaylist, removeArtist } from '../actions';
import SpotifyWebApi from 'spotify-web-api-js';


const spotifyApi = new SpotifyWebApi();

class ArtistList extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(props){
        if (props.loginStatus.isLoggedIn) {
          spotifyApi.setAccessToken(props.loginStatus.token);
        }
    }
    addArtist(artistId) {
        this.props.dispatch(addArtist(artistId));
    }
    removeArtist(artistId) {
        this.props.dispatch(removeArtist(artistId));
    }
    hidePlaylists(){
        this.props.dispatch(setShowPlaylists(false));
    }
    async generateTrackList(){
        try {
            var relatedartists = await Promise.all(
                this.props.artists.map(
                    artist => spotifyApi.getArtistRelatedArtists(artist.id)
                    .then(data => data.artists.slice(0,3).map(artist => artist.id))
                        ));
            var artists = this.props.artists.map( artist => artist.id ) 
            var mergedlist = [].concat.apply([], [...relatedartists, artists])
            var tracklist = await Promise.all(
                mergedlist.map(
                    artistId => spotifyApi.getArtistTopTracks(artistId, "US", {limit: 3})
                    .then(data => data.tracks)
                        ));
            let mergedtracklist = [].concat.apply([], tracklist).sort(function(obj1, obj2) {
                return obj2.popularity - obj1.popularity;
            }).slice(0, 15);
            return (mergedtracklist);
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }
    async generatePlaylist(){
        let list = await this.generateTrackList();
        this.props.dispatch(setPlaylist(list));
        this.props.dispatch(setShowPlaylists(true));
    }
    render() {        
        return(
            <div className="container right">
                <div className="artist-list">PLAYLIST MIX:</div>
                {this.props.showPlaylists? 
                null :
                this.props.artists.map((artist) => 
                    (<div
                        className="artist-list"
                        key={artist.id}
                    >
                    <img 
                        className="small-images" 
                        src={(artist.images.length === 0)? require('../spotify_icon_black.png') : artist.images[0].url } 
                        title={artist.name}>
                    </img>
                    <span onClick={this.removeArtist.bind(this, artist.id)} className="icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
                    </div>))}
                {this.props.artists.length? 
                (this.props.showPlaylists? 
                    <button onClick={this.hidePlaylists.bind(this)} type="button" class="btn btn-outline-dark mybtn artist-list">Go back to editing</button> :
                    <button onClick={this.generatePlaylist.bind(this)}type="button" class="btn btn-outline-dark mybtn artist-list">Generate your playlist</button>)
                 : null}
                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      artists: state.artists,
      loginStatus: state.loginStatus,
      searchResult: state.searchResult,
      showArtist: state.showArtist,
      showPlaylists: state.showPlaylists
    };
};

export default connect(mapStateToProps)(ArtistList);