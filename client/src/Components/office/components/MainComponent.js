import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ApplicationView from "./ApplicationViewComponent";
import ApplicationMenu from "./ApplicationMenu";
import Home from "./HomePage";
import Stats_page from "./Stats_page";
import Notification from "./NotificationComponent";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application: null,
    };
  }
  handleSelect(selectapplication) {
    this.setState({ application: selectapplication });
  }
  render() {
    return (
      <>
        <div className="MainContent">
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route
                path="/applicationview"
                element={
                  <ApplicationView application={this.state.application} />
                }
              />
              <Route
                path="/applicationmenu"
                element={
                  <ApplicationMenu
                    onSelect={(application) => this.handleSelect(application)}
                  />
                }
              />
              <Route path="/statistics" element={<Stats_page />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="*" element={<Home />} />
              {/* <Route path='/applicationmenu' element={<ApplicationMenu/>}/> */}
              {/* <Route path='/applicationview' element={<ApplicationView/>}/> */}
            </Routes>
          </BrowserRouter>
          {/* <Login/> */}
          {/* <Home/> */}
          {/* <ApplicationView/> */}
          {/* <Box/> */}
          {/* <Doclist/> */}
          {/* <ApplicationMenu/> */}
          {/* <Stats_Table/> */}
          {/* <Statistics/> */}
          {/* <Search/> */}
          {/* <DownloadFiles/> */}
          {/* <Stats_page/> */}
          {/* <Notification/> */}
        </div>
      </>
    );
  }
}
export default Main;
