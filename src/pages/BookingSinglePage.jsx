import { useParams } from "react-router-dom";
import axios from "axios";
import AccountPageNav from "./AccountPageNav";
import { useEffect, useState } from "react";

import { differenceInCalendarDays, format } from "date-fns";

const BookingSinglePage = () => {
  const { placeid } = useParams();
  const [showAllphotos, setShowAllPhotos] = useState(false);
  const [bookedPlace, setBookedPlace] = useState({});
  useEffect(() => {
    axios.get("/bookings/" + placeid).then((response) => {
      setBookedPlace(response.data);
    });
  }, [placeid]);

  if (showAllphotos) {
    return (
      <div className="px-2 mx-2 mt-2 py-2 w-100">
        <h4>Photos of {bookedPlace.place.title}</h4>
        <button
          className="position-fixed btn btn-secondary bottom-0 start-0"
          onClick={() => setShowAllPhotos(false)}
        >
          Close Photos
        </button>
        {bookedPlace.place?.photos?.length > 0 &&
          bookedPlace.place.photos.map((photo) => {
            return (
              <div key={photo} className="w-100">
                <img
                  className="w-100 p-3"
                  src={
                    "https://bookingapp-api-780h.onrender.com/uploads/" + photo
                  }
                ></img>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div>
      <AccountPageNav />
      <div className="m-5 px-5 py-4 ">
        {bookedPlace.place && (
          <>
            <h2 className="fw-bold">{bookedPlace.place.title}</h2>
            <a
              href={
                "https://www.google.com/maps/search/?api=1&query=" +
                bookedPlace.place.title +
                bookedPlace.place.address
              }
              target="_blank"
              className="text-decoration-underline d-flex justify-content-start gap-2 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <p>{bookedPlace.place.address}</p>
            </a>
            <div className="bg-secondary-subtle p-3 rounded-3 d-flex justify-content-between">
              <div className="pt-2 ps-2">
                <h4>Your Booking Info:</h4>
                <p>
                  {format(new Date(bookedPlace.customerCheckIn), "dd/MM/yyyy")}{" "}
                  -{" "}
                  {format(new Date(bookedPlace.customerCheckOut), "dd/MM/yyyy")}{" "}
                  →{" "}
                  {differenceInCalendarDays(
                    new Date(bookedPlace.customerCheckOut),
                    new Date(bookedPlace.customerCheckIn)
                  )}{" "}
                  Day
                </p>
              </div>
              <div className="bg-success rounded-3 p-2">
                <h4>Total Price:</h4>
                <h3>Rs. {bookedPlace.price}/-</h3>
              </div>
            </div>
            <div className="grid-container position-relative px-1 py-2 mt-2">
              <div className="grid-item-1 overflow-hidden">
                {bookedPlace.place.photos?.[0] && (
                  <img
                    src={
                      "https://bookingapp-api-780h.onrender.com/uploads/" +
                      bookedPlace.place.photos[0]
                    }
                    alt="img1"
                  ></img>
                )}
              </div>
              <div className="grid-item-2 overflow-hidden">
                {bookedPlace.place.photos?.[1] && (
                  <img
                    src={
                      "https://bookingapp-api-780h.onrender.com/uploads/" +
                      bookedPlace.place.photos[1]
                    }
                    alt="img2"
                  ></img>
                )}
              </div>
              <div className="grid-item-3 overflow-hidden">
                {bookedPlace.place.photos?.[2] && (
                  <img
                    src={
                      "https://bookingapp-api-780h.onrender.com/uploads/" +
                      bookedPlace.place.photos[2]
                    }
                    alt="img3"
                  ></img>
                )}
              </div>
              <div>
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="btn btn-success position-absolute bottom-0 end-0 mb-3 me-3"
                >
                  View All Photos
                </button>
              </div>
            </div>
            <h4 className="fw-bold">Description</h4>
            <p className="">{bookedPlace.place.description}</p>
          </>
        )}
      </div>
    </div>
  );
};
export default BookingSinglePage;
/* */
