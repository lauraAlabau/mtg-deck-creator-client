import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  localStorage.clear();
  setUser(null);
  navigate("/");
};

export default Logout;
