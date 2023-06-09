import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountPageNav from "./AccountPageNav";

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams(); //for routing within accountpage
  const navigate = useNavigate();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "loading...";
  }
  if (ready && !user) return <Navigate to={"/login"} />;

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  }
  return (
    <div>
      <AccountPageNav />
      {subpage === "profile" && (
        <div className="text-center">
          You are logged in as{" "}
          <span className="fw-bold">
            {user.name} ({user.email})
          </span>
          <br></br>
          <button onClick={logout} className="btn btn-success px-5 mt-5">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
