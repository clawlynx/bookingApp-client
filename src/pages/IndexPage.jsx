import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  useEffect(() => {
    axios.get("/home").then((response) => {
      setAllPlaces([...response.data]);
    });
  }, []);
  return (
    <div className="container overflow-hidden text-center">
      <div className="row gy-5 mt-5 ">
        {allPlaces.map((place) => {
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
        })}
      </div>
    </div>
  );
};
export default IndexPage;
