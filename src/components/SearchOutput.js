import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addArtist } from '../actions';

class SearchOutput extends Component {
    addArtist(artist) {
        this.props.dispatch(addArtist(artist));
    }
    render() {        
        return(
            <>
                <img className="large-images"
                    alt={this.props.artist.name}
                    src={(this.props.artist.images.length === 0)? 
                    require('../spotify_icon_black.png') : this.props.artist.images[0].url }>
                </img>
                <div>
                    {this.props.artist.name} <i className="fas fa-plus" onClick={this.addArtist.bind(this,this.props.artist)}> </i>
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