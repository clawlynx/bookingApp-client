import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SearchedPage = () => {
  const { searched } = useParams();
  const [searchedPlace, setSearchedPlace] = useState([]);

  useEffect(() => {
    axios
      .get("/search/" + searched)
      .then((response) => setSearchedPlace(response.data));
  }, [searched]);
  return (
    <div className="container ps-2 pt-5 mt-3 overflow-hidden">
      <h4>Showing Results for Location: {searched}</h4>
      <div className="row gy-5 mt-5 text-center">
        {searchedPlace.length > 0 ? (
          searchedPlace.map((place) => {
            return (
              <Link
                to={"/home/" + place._id}
                key={place._id}
                className="card gx-0 col-lg-3 col-md-4 col-sm-12 bg-body-secondary border border-5 border-white text-decoration-none"
              >
                <img
                  className="card-img-top overflow-hidden"
                  src={
                    "https://bookingapp-api-780h.onrender.com/uploads/" +
                    place.photos[0]
                  }
                  alt="photo"
                />
                <div className=" card-body">
                  <h5 className="card-title">{place.title}</h5>
                  <p className="card-text">{place.address}</p>
                  <p className="">
                    ₹ <span className="fw-bold">{place.price}</span> / night
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="justify-content-center align-items-center text-center error-div">
            <h1 className="pt-3">Sorry!!!</h1>
            <h2>No Place Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchedPage;
