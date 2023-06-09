import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UploadPhotos from "./uploadPhotoComponent";
import Perks from "./PerksOfPlacesPage";
import AccountPageNav from "./AccountPageNav";

const EditPlacePage = () => {
  const navigate = useNavigate();
  const [placeForm, setPlaceForm] = useState({
    title: "",
    address: "",
    description: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
  });
  const [photos, setPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [price, setPrice] = useState(100);
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios.get("/places/" + id).then(({ data }) => {
      setPlaceForm({
        title: data.title,
        address: data.address,
        description: data.description,
        extraInfo: data.extraInfo,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        maxGuests: data.maxGuests,
      });
      setPhotos(data.photos);
      setPerks(data.perks);
      setPrice(data.price);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlaceForm({
      ...placeForm,
      [name]: value,
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    await axios.put("/places", {
      id: id,
      title: placeForm.title,
      address: placeForm.address,
      photos: photos,
      description: placeForm.description,
      perks: perks,
      extraInfo: placeForm.extraInfo,
      checkIn: placeForm.checkIn,
      checkOut: placeForm.checkOut,
      maxGuests: placeForm.maxGuests,
      price: price,
    });
    navigate("/account/places");
  };
  return (
    <>
      <AccountPageNav />
      <h4 className="p-4 text-center">Edit Your Place</h4>
      <form
        onSubmit={formSubmit}
        className="px-5 w-75 mx-auto border border-success rounded-3"
      >
        <h5 className="mb-0 mt-3">Title</h5>
        <p className="my-0 text-body-tertiary">
          Title for your place; should be short and catchy
        </p>
        <input
          className="w-100 border border-success-subtle rounded-2 py-1 px-2 mt-1 mb-2"
          type="text"
          name="title"
          value={placeForm.title}
          onChange={handleChange}
          placeholder="title; for example-my lovely apt"
        />
        <h5 className="mb-0">Address</h5>
        <p className="my-0 text-body-tertiary">Address to this place</p>
        <input
          className="w-100 border border-success-subtle rounded-2 py-1 px-2 mt-1 mb-2"
          type="text"
          name="address"
          value={placeForm.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <h5 className="mb-0">Photos</h5>
        <p className="my-0 text-body-tertiary">The more photos, the better</p>
        <UploadPhotos photos={photos} onChange={setPhotos} />
        <h5 className="mb-0">Description</h5>
        <p className="my-0 text-body-tertiary">Description about the place</p>
        <textarea
          rows={4}
          name="description"
          value={placeForm.description}
          onChange={handleChange}
          className="w-100 border border-success-subtle rounded-2 py-1 px-2 mt-1 mb-2"
        ></textarea>
        <h5 className="mb-0">Perks</h5>
        <p className="my-0 text-body-tertiary">
          Select the perks for your place
        </p>
        <Perks selected={perks} onchange={setPerks} />
        <h5 className="mb-0">Extra Info</h5>
        <p className="my-0 text-body-tertiary">
          Tell us additional info about the place
        </p>
        <textarea
          rows={3}
          name="extraInfo"
          value={placeForm.extraInfo}
          onChange={handleChange}
          className="w-100 border border-success-subtle rounded-2 py-1 px-2 mt-1 mb-2"
        />
        <h5 className="mb-0">Check in & Out</h5>
        <p className="my-0 text-body-tertiary">
          Tell us the time you check in and check out
        </p>
        <div className="d-flex row gap-2 mt-1 mb-2">
          <div className="col-lg-3 col-md-4 col-sm-12 ">
            <h6>Check in</h6>
            <input
              className="border border-success-subtle rounded-3 px-2"
              type="text"
              name="checkIn"
              value={placeForm.checkIn}
              onChange={handleChange}
              placeholder="16:00"
            ></input>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 ">
            <h6>Check Out</h6>
            <input
              className="border border-success-subtle rounded-3 px-2"
              type="text"
              name="checkOut"
              value={placeForm.checkOut}
              onChange={handleChange}
              placeholder="16:00"
            ></input>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 ">
            <h6>Max. guests</h6>
            <input
              className="border border-success-subtle rounded-3 px-2"
              type="Number"
              name="maxGuests"
              value={placeForm.maxGuests}
              onChange={handleChange}
              placeholder="2"
            ></input>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 ">
            <h6>Price Per Night</h6>
            <input
              className="border border-success-subtle rounded-3 px-2"
              type="Number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2"
            ></input>
          </div>
        </div>
        <button className="btn btn-success w-75 mx-auto d-grid my-5 fs-4">
          Save & Update
        </button>
      </form>
    </>
  );
};
export default EditPlacePage;
