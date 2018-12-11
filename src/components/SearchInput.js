import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addSearchResult, addArtist, setShowArtist } from '../actions'
import SpotifyWebApi from 'spotify-web-api-js';
import SearchOutput from './SearchOutput';
import SimilarArtists from './SimilarArtists';
import Player from './Player';


const spotifyApi = new SpotifyWebApi();

class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            showArtist: {},
            artistTracks: [],
            currentPlaying: -1
        }
        this.findArtist = this.findArtist.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if (Object.keys(nextProps.showArtist).length > 0 && nextProps.showArtist !== this.state.showArtist) {
            this.setState({showArtist: nextProps.showArtist, currentPlaying: -1});
            this.getTopTracks(nextProps.showArtist.id);
        }        
      }
    findArtist(e) {
        if (e.target.value) {
          spotifyApi.searchArtists(e.target.value, {limit: 3})
          .then((data) => {
            this.props.dispatch(addSearchResult(data.artists.items));
          });
        }else {
          this.props.dispatch(addSearchResult([]));
        }
    }
    addArtist(artistId) {
        this.props.dispatch(addArtist(artistId));
    }
    showArtist(artist) {
        this.props.dispatch(setShowArtist(artist));
    }
    getTopTracks(artistId){
        spotifyApi.getArtistTopTracks(artistId, "US", {limit: 3})
        .then(data => {
            this.setState({artistTracks: data.tracks.slice(0,3)});
        })
    }
    playing = (index) => {
        this.setState( {currentPlaying: index});
    }
    stopped = () => {
        this.setState( {currentPlaying: -1});
    }
    render() {        
        return(
            <>
                <div className="container">
                    <h5>Search for an artist you like:</h5>
                    <input className="search-input"
                    type="text" 
                    onKeyUp={this.findArtist}
                    />
                    {this.props.searchResult.map((artist) => 
                        (<div
                            key={artist.id}
                            onClick={this.showArtist.bind(this, artist)}
                        >
                        <button type="button" className="btn btn-light search-output">{artist.name}</button>
                        </div>))}
                </div>
                <div className="container center">
                    {Object.keys(this.state.showArtist).length? <SearchOutput artist={this.state.showArtist} /> : null }
                    <div className="demo-track-list">
                        {this.state.artistTracks.map((track,index) =>(
                                <Player 
                                    key={track.id}
                                    url={track.preview_url} 
                                    playing={this.state.currentPlaying === index} 
                                    setPlaying={this.playing.bind(this, index)} 
                                    stopped={this.stopped}
                                />
                        
                        )
                        )}
                    </div>
                    {(this.state.currentPlaying===-1)? (
                        <>
                            <div className="break"></div>
                        </>
                    ) : (
                        <>
                            <div className="now-playing">NOW PLAYING:</div>
                            <div>{this.state.artistTracks[this.state.currentPlaying].name}</div> 
                        </>
                    )}
                    {Object.keys(this.state.showArtist).length? 
                        <SimilarArtists artist={this.state.showArtist.id} showArtist={this.showArtist.bind(this)} /> : null }             
                </div>
             </>
            );
    }
}

const mapStateToProps = state => {
    return {
        searchResult: state.searchResult,
        showArtist: state.showArtist
    };
};

export default connect(mapStateToProps)(SearchInput);