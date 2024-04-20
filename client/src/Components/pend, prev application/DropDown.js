import React, { Component } from "react";
import "./styles/dropDown.css";

class DropDwn extends Component {
  constructor() {
    super();

    this.state = {
      showComC: false,
      showComGovC: false,
    };

    this.hideComponent = this.hideComponent.bind(this);
  }
  hideComponent(Conversion) {
    switch (Conversion) {
      case " showComC":
        this.setState({ showComC: !this.state.showComC });

        break;
      case " showComGovC":
        this.setState({ showComGovC: !this.state.showComGovC });

        break;
    }
  }
  render() {
    const { showComC, showComGovC } = this.state;
    return (
      <div
        className="cvr"
        style={{
          paddingLeft: "20px",
          marginLeft: "10px",
        }}
      >
        <button className="btn-bn">Residential Conversion</button>
        <br></br>
        <button
          className="btn-bn"
          onClick={() => this.hideComponent(" showComC")}
        >
          Commercial Conversion
        </button>
        <br />
        {showComC && (
          <input
            className="inp-in"
            type="text"
            id="fName"
            placeholder="write purpose"
          />
        )}
        {showComC && <br />}

        <button className="btn-bn">Residential Conversion</button>
        <br />

        <button
          className="btn-bn"
          onClick={() => this.hideComponent(" showComGovC")}
        >
          Commercial/Government Project
        </button>
        <br></br>
        {showComGovC && (
          <input
            className="inp-in"
            type="text"
            id="fName"
            placeholder="write purpose"
          />
        )}
      </div>
    );
  }
}

export default DropDwn;
