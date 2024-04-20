import "./App.css";
import Header from "./HeaderComponent";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./HomePage";
import ApplicationView from "./ApplicationViewComponent";
import ApplicationMenu from "./ApplicationMenu";
import Stats_page from "./Stats_page";
import Login from "./Login";
import ProtectedRoute from "./protectedroute";
import Navigation from "./Navigation";
function OfficeApp() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "60rem",
      }}
    >
      <Header />
      <Navigation/>
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute component={<Home />}></ProtectedRoute>}
        ></Route>

        <Route
          path="applicationview/"
          element={
            <ProtectedRoute component={<ApplicationView />}></ProtectedRoute>
          }
        />
        <Route
          path="applicationmenu/:applicationType"
          element={
            <ProtectedRoute
              component={
                <ApplicationMenu
                  onSelect={(application) => {
                    navigate("/office/applicationview", {
                      state: application,
                    });
                  }}
                />
              }
            ></ProtectedRoute>
          }
        />
        <Route path="statistics" element={<Stats_page />} />
        <Route path="login" element={<Login />} />
      </Routes>
      </div>
    </div>
  );
}

export default OfficeApp;