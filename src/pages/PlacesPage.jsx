import { Link, useNavigate, useParams } from "react-router-dom";
import AddPlace from "./AddplacePage";
import { useEffect, useState } from "react";
import axios from "axios";
import EditPlacePage from "./EditPlacePage";

const PlacesPage = () => {
  const { action, id } = useParams(); //for routing to add new place
  const [places, setPlaces] = useState([]);
  //for listing existing places in my accomodation
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      {!action && (
        <div className="text-center ">
          <Link
            className="login-link bg-success-subtle px-3 py-2 rounded-pill"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            <span className="ps-2">Add New Place</span>
          </Link>
          <div className="mt-5 ">
            {places.length > 0 &&
              places.map((place) => {
                return (
                  <Link
                    to={"/account/places/" + place._id}
                    className="bg-body-secondary login-link align-items-center p-3 my-2 d-flex gap-3 rounded-3"
                    key={place._id}
                  >
                    <div className="bg-secondary-subtle  placelist-imgicon flex-shrink-0">
                      <img
                        className="placelist-imgicon"
                        src={
                          "https://bookingapp-api-780h.onrender.com/uploads/" +
                          place.photos[0]
                        }
                      />
                    </div>
                    <div>
                      <h5>{place.title}</h5>
                      <p>{place.description}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      )}
      {action === "new" && (
        <div>
          <AddPlace />
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
