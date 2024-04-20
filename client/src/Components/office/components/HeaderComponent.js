import SealImg from "../../../Images/sealimg.png";
import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  render() {
    return (
      <div className="AppHeader">
        <div className="SealImg">
          <img src={SealImg} style={{ height: "8em" }} />
        </div>
        <div className="District">
          <h1>
            <strong> ಉಡುಪಿ ಜಿಲ್ಲೆ</strong>{" "}
          </h1>
          {/* <br/> */}
          <h2 style={{ color: "#ffffff" }}>UDUPI DISTRICT</h2>
        </div>
        <div className="Coastal">
          <h1>Coastal Regulation Zone</h1>
        </div>
      </div>
    );
  }
}

export default Header;
