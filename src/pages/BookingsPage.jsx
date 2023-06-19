import { useEffect, useState } from "react";
import AccountPageNav from "./AccountPageNav";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [allBookings, setAllBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => setAllBookings(response.data));
  }, []);
  return (
    <div>
      <AccountPageNav />

      {allBookings?.length > 0 ? (
        allBookings.map((booking) => {
          return (
            <Link
              to={"/account/bookings/" + booking.place._id}
              key={booking._id}
              className="container d-flex gap-3 bg-secondary-subtle ps-0 rounded-3 text-decoration-none text-black my-2 overflow-hidden"
            >
              {booking?.place?.photos?.[0] && (
                <div>
                  <img
                    className="bookingpage-photo"
                    src={
                      "https://bookingapp-api-780h.onrender.com/uploads/" +
                      booking.place.photos[0]
                    }
                    alt="img"
                  ></img>
                </div>
              )}
              <div>
                <h4 className="pt-2 ps-2">{booking.place.title}</h4>
                <p className="pt-2 ps-2">
                  {format(new Date(booking.customerCheckIn), "dd/MM/yyyy")} -{" "}
                  {format(new Date(booking.customerCheckOut), "dd/MM/yyyy")} →{" "}
                  {differenceInCalendarDays(
                    new Date(booking.customerCheckOut),
                    new Date(booking.customerCheckIn)
                  )}{" "}
                  Day
                </p>
                <h5 className="ps-2">Total Price: Rs.{booking.price}/-</h5>
              </div>
            </Link>
          );
        })
      ) : (
        <h1 className="container bg-secondary-subtle p-2 rounded-3 my-3 overflow-hidden">
          You don't have any bookings yet!
        </h1>
      )}
    </div>
  );
};
export default BookingsPage;
