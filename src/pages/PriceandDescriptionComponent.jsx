import { useState } from "react";
import axios from "axios";
import { differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";

const PriceAndDescriptionComponent = ({ thePlace }) => {
  //states for booking
  const [customerCheckIn, setCustomerCheckIn] = useState("");
  const [customerCheckOut, setCustomerCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  let numberOfDays = 0;
  if (customerCheckIn && customerCheckOut) {
    numberOfDays = differenceInDays(
      new Date(customerCheckOut),
      new Date(customerCheckIn)
    );
  }

  const handleBooking = async () => {
    const { data } = await axios.post("/bookings", {
      place: thePlace._id,
      customerCheckIn,
      customerCheckOut,
      guests,
      name,
      phone,
      price: numberOfDays * thePlace.price,
    });
    if (data) {
      navigate("/account/bookings/" + thePlace._id);
    } else {
      alert("error in booking. please try later");
    }
  };
  return (
    <>
      <div className="des-price p-2 mt-2">
        <div className="des shrink-1">
          <h4 className="fw-bold">Description</h4>
          <p className="">{thePlace.description}</p>
        </div>
        <div className="price shrink-1">
          <div className="border rounded-3 text-center py-3 px-2">
            <h4 className="bg-success-subtle rounded-3 p-2">
              Price: {thePlace.price} /Day
            </h4>
            <div className=" border border-success-subtle rounded-3 px-2 py-2 my-2">
              <div className="d-flex gap-1 py-2  align-items-center">
                <label>Check&nbsp;In:</label>
                <input
                  className="form-control"
                  type="date"
                  value={customerCheckIn}
                  required
                  onChange={(ev) => setCustomerCheckIn(ev.target.value)}
                ></input>
              </div>
              <div className="d-flex gap-1 py-2 align-items-center">
                <label>Check&nbsp;Out:</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={customerCheckOut}
                  onChange={(ev) => setCustomerCheckOut(ev.target.value)}
                ></input>
              </div>
            </div>
            <div className="my-2 pb-2 ">
              <label>Max&nbsp;Guests:&nbsp; </label>
              <input
                type="number"
                className="border rounded-3"
                value={guests}
                onChange={(ev) => setGuests(ev.target.value)}
              ></input>
            </div>
            {customerCheckIn && customerCheckOut && (
              <div className="mb-2 pb-2">
                <label>Full&nbsp;Name:&nbsp; </label>
                <input
                  type="text"
                  required
                  className="border rounded-3"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                ></input>
                <div className="mt-2 pt-2">
                  <label>Phone&nbsp;No:&nbsp; </label>
                  <input
                    type="text"
                    required
                    className="border rounded-3"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                  ></input>
                </div>
              </div>
            )}
            <button
              onClick={handleBooking}
              className="btn w-75 btn-outline-success"
            >
              Book this Place
              {customerCheckIn && customerCheckOut && (
                <span> for Rs.{numberOfDays * thePlace.price}</span>
              )}
            </button>
          </div>
        </div>
        <div className="check-details py-2">
          <p>
            <span>Check In:</span> {thePlace.checkIn}
          </p>
          <p>
            <span>Check Out:</span> {thePlace.checkOut}
          </p>
          <p>
            <span>Max-Guests:</span> {thePlace.maxGuests}
          </p>
        </div>
      </div>
    </>
  );
};
export default PriceAndDescriptionComponent;
