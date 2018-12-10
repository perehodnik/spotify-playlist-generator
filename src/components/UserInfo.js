import React, {Component} from 'react';
import { connect } from 'react-redux'
import { setUserInfo } from '../actions'
import SpotifyWebApi from 'spotify-web-api-js';


const spotifyApi = new SpotifyWebApi();

class UserInfo extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
        
    componentDidMount(){
        console.log("Userinfo:");
        console.log(this.props.loginStatus);
        if (this.props.loginStatus.isLoggedIn) {
          spotifyApi.setAccessToken(this.props.loginStatus.token);
        }
        this.getUserInfo();
    }
    getUserInfo() {
          spotifyApi.getMe()
          .then((data) => {
            this.setState({
                username: data.display_name
            });
            this.props.dispatch(setUserInfo(data));
          });
    }
    render() {        
        return(
             <div className="navbar">
                 <div>Logged in as: {this.state.username}</div>
             </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        loginStatus: state.loginStatus
    };
};

export default connect(mapStateToProps)(UserInfo);