import { useContext } from "react";

import { UserContext } from "../App";
import LoginSigninBtn from "../Components/LoginSigninBtn";
import Navbar from "../Components/Navbar";

import "../assets/css/home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-container">
          {user ? (
            <p className="home-title">Welcome back {user.name.toUpperCase()}</p>
          ) : (
            <p className="home-title">
              Welcome to <br />
              MTG DECK CREATOR
            </p>
          )}
          <p className="home-summary">
            Search cards, add them to favorites, create a deck and print it to
            be ready for your next tournament.
          </p>

          {!user ? (
            <div className="home-log">
              <div className="home-btn">
                <LoginSigninBtn buttonType={"login"} />
              </div>
              <div className="divider">
                <div className="line"></div>
                <p>Or</p>
                <div className="line"></div>
              </div>
              <div className="home-btn">
                <LoginSigninBtn buttonType={"signin"} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
