import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addArtist, setShowArtist } from '../actions';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class SimilarArtists extends Component {
    constructor(props){
        super(props);
        this.state = {
            artist: props.artist,
        };
    }
    getRelatedArtists(artist) {
        spotifyApi.getArtistRelatedArtists(artist).then(
            data => {
              this.setState({
                  artist,
                  similarArtists: data.artists.slice(0,3)
              });
            }
          );
    }
    componentDidMount() {
            this.getRelatedArtists(this.props.artist);
    }
    componentDidUpdate() {
        if (this.state.artist!==this.props.artist){
            this.getRelatedArtists(this.props.artist);
        }
    }
    showArtist(artist) {
        this.props.dispatch(setShowArtist(artist));
    }

    addArtist(artist) {
        this.props.dispatch(addArtist(artist));
    }
    render() {        
        return(
            <>
                <div className="similar-artists-header">Similar Artists:</div>
                <div className="similar-artists" >
                    {this.state.similarArtists? this.state.similarArtists.map(artist => (
                    <div onClick={this.showArtist.bind(this, artist)} key={artist.id}>
                        <img 
                            alt={artist.name}
                            className="small-images-round" 
                            src={(artist.images.length === 0)? require('../spotify_icon_black.png') : artist.images[0].url } 
                            title={artist.name}>
                        </img>
                        <div>{artist.name}</div>
                    </div>
                    )): (<div> Loading ... </div>) }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
      loginStatus: state.loginStatus,
      searchResult: state.searchResult
    };
};

export default connect(mapStateToProps)(SimilarArtists);