import React from "react";
import { connect } from "react-redux";
import { changeMessage } from "Redux/components/home/homeSlice";
import { writeConfigRequest } from "secure-electron-store";
import Detail from "Components/detail/detail";
import "./main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  onChangeMessage(event) {
    const { value } = event.target;
    this.setState((state) => ({
      message: value
    }));
  }

  onSubmitMessage(event) {
    event.preventDefault(); // prevent navigation
    this.props.changeMessage(this.state.message); // update redux store
    window.api.store.send(writeConfigRequest, "motd", this.state.message); // save message to store (persist)

    // reset
    this.setState((state) => ({
      message: ""
    }));
  }

  render() {
    return (
      <div id="main">
        <div className="motd">{this.props.home.message}</div>
        <br />
        <div>
          <form onSubmit={this.onSubmitMessage}>
            <input
              placeholder="New message of the day"
              value={this.state.message}
              onChange={this.onChangeMessage}></input>
            <input type="submit" value="Save"></input>
          </form>
          <div className="tip">
            Your message of the day will persist
            <br /> if you close and re-open the app.
          </div>
        </div>
        <div id="translation">
          <Detail></Detail>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { changeMessage };

export default connect(mapStateToProps, mapDispatch)(Main);
