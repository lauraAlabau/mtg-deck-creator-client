import GradientCircle from "../Components/GradientCircle";
import { Link } from "react-router-dom";

import "../assets/css/notFound.css";
import Navbar from "../Components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <GradientCircle
        size={"medium"}
        color={"turquoise"}
        alignItems={"align-start"}
        justifyContent={"justify-center"}
      />

      <GradientCircle
        size={"large"}
        color={"turquoise"}
        alignItems={"align-end"}
        justifyContent={"justify-start"}
      />
      <GradientCircle
        size={"small"}
        color={"turquoise"}
        alignItems={"align-end"}
        justifyContent={"justify-end"}
      />
      <div className="not-found-bg"></div>
      <main className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <p>Sorry, we were unable to find that page</p>
          <Link to="/" className="not-found btn-back">
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
