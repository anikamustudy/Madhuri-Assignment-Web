import React, { Component, Fragment } from "react";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import Logo from "../../assets/images/easyshop.png";
import { Link } from "react-router-dom";

class NavMenuMobile extends Component {
  constructor() {
    super();
    this.state = {
      SideNavState: "sideNavClose",
      ContentOverState: "ContentOverlayClose",
    };
  }

  MenuBarClickHandler = () => {
    this.SideNavOpenClose();
  };

  ContentOverlayClickHandler = () => {
    this.SideNavOpenClose();
  };

  SideNavOpenClose = () => {
    let SideNavState = this.state.SideNavState;
    let ContentOverState = this.state.ContentOverState;
    if (SideNavState === "sideNavOpen") {
      this.setState({
        SideNavState: "sideNavClose",
        ContentOverState: "ContentOverlayClose",
      });
    } else {
      this.setState({
        SideNavState: "sideNavOpen",
        ContentOverState: "ContentOverlayOpen",
      });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="TopSectionDown">
          <Container
            fluid={"true"}
            className="fixed-top shadow-sm p-2 mb-0 bg-white"
          >
            <Row>
              <Col lg={4} md={4} sm={12} xs={12}>
                <Link to="/">
                  {" "}
                  <img className="nav-logo" src={Logo} />{" "}
                </Link>
              </Col>
              <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                <Link to="/favourite" className="btn">
                  <i className="fa h4 fa-shopping-cart"></i>
                  <sup>
                    <span className="badge text-white bg-danger">3</span>
                  </sup>
                </Link>

                <Link to="/notification" className="btn">
                  <i className="fa h4 fa-edit"></i>
                  <sup>
                    <span className="badge text-white bg-danger">5</span>
                  </sup>
                </Link>
                <a className="btn">
                  <i className="fa h4 fa-mobile-alt"></i>
                </a>
                <Link to="/login" className="h4 btn">
                  LOGIN
                </Link>
              </Col>
            </Row>
          </Container>

          <div className={this.state.SideNavState}></div>

          <div
            onClick={this.ContentOverlayClickHandler}
            className={this.state.ContentOverState}
          ></div>
        </div>
      </Fragment>
    );
  }
}

export default NavMenuMobile;
