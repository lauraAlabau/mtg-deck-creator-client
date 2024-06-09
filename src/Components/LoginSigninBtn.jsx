import { Link } from 'react-router-dom';
import '../assets/css/loginSigninBtn.css'

const LoginSigninBtn = ({ buttonType }) => {
  const button =
    buttonType === "login" ? (
      <>
        <p>Already have an account ?</p>
        <Link to="/login">
          <button className="btn btn-login">Login</button>
        </Link>
      </>
    ) : (
      <>
        <p>Don’t have an account ? </p>

        <Link to="/signup" className="btn btn-signin">
          <button className="btn btn-signin">Sign In</button>
        </Link>
      </>
    );
  return button;
}

export default LoginSigninBtn