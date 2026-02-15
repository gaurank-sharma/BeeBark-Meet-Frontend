import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="LandingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Video Call App</h2>
        </div>
        <div className="navList">
          <p
            onClick={() => {
              router("guest765");
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            once
          </h1>
          <p>Cover a distance by Video Call App</p>
          <div role="button">
            <Link to={"/auth"}>GET Started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="mobile-image" />
        </div>
      </div>
    </div>
  );
}
