import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom"; // Correct import statement
// import AppRoute from "./route/AppRoute";
// import HomeTop from "./components/home/HomeTop";
import FooterDesktop from "./components/common/FooterDesktop";
import HomeSlider from "./components/home/HomeSlider";
import MainNavbar from "./components/common/MainNavbar";
// import UserLoginPage from "./pages/UserLoginPage";
import UserLogin from "./components/common/UserLogin";
// import UserLoginPage from "./components/common/UserLoginPage";

class App extends React.Component {
  // Ensure you're extending React.Component instead of Component
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <MainNavbar />
          <HomeSlider />
          <UserLogin />
          <FooterDesktop />
          {/* <AppRoute /> */}
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
