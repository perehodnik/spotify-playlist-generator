import React, {Component} from 'react';


class Player extends Component {
    constructor(props) {
    super(props);
    this.state = {
      play: false
    }
    this.audio = new Audio();
  }
  componentWillReceiveProps(props) {
    this.audio.src = props.url;
    if (props.playing){
        this.setState({play: true});
        this.audio.play();
    }else {
        this.setState({play: false});
        this.audio.pause();   
    }
  }
  componentWillUnmount() {
      this.audio.pause();
      this.props.stopped();
  }

  toggle = () => {
      if (this.state.play) {
        this.setState({ play: false });
        this.audio.pause();
        this.props.stopped();
      } else {
        this.setState({ play: true });
        this.audio.play();
        this.props.setPlaying();
      }
  }
  render() {
    
  return (
    <div className="player">
        <div onClick={this.toggle}><i className={this.state.play? "fas fa-pause" : "fas fa-play" }></i></div>
    </div>
    );
  }
}

export default Player;