import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addArtist } from '../actions';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class SearchOutput extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(props){
        if (props.loginStatus.isLoggedIn) {
          spotifyApi.setAccessToken(props.loginStatus.token);
        }
      }
    addArtist(artist) {
        this.props.dispatch(addArtist(artist));
    }
    render() {        
        return(
            <>
                <img className="large-images"
                    src={(this.props.artist.images.length === 0)? 
                    require('../spotify_icon_black.png') : this.props.artist.images[0].url }>
                </img>
                <div>
                    {this.props.artist.name} <i class="fas fa-plus" onClick={this.addArtist.bind(this,this.props.artist)}> </i>
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

export default connect(mapStateToProps)(SearchOutput);