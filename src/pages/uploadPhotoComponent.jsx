import axios from "axios";
import { useState } from "react";

const UploadPhotos = ({ photos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");
  //function for adding photos through link
  const uploadByLink = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      const fileName = resp.data;
      //console.log(fileName);
      onChange([...photos, fileName]);
      setPhotoLink("");
    } catch (error) {
      console.log(error.resp);
    }
  };
  //function for uploading locally
  const localUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("photo", file);
      const resp = await axios.post("/upload", formData);
      const { filename } = resp.data;
      onChange([...photos, filename]);
    } catch (error) {
      console.log(error.resp);
    }
  };
  //function for making the main photo
  const mainPhoto = (event, filename) => {
    event.preventDefault();
    onChange([
      filename,
      ...photos.filter((photo) => {
        return photo !== filename;
      }),
    ]);
  };
  //function for deleting a photo
  const deletePhoto = (ev, filename) => {
    ev.preventDefault();
    onChange([...photos.filter((photo) => photo !== filename)]);
  };
  return (
    <>
      <div className="d-flex gap-2  mt-1 mb-2">
        <input
          className="w-100 border border-success-subtle ps-2 rounded-2"
          type="text"
          name="photoLink"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="imageurl.jpg"
        />
        <button onClick={uploadByLink} className="btn btn-outline-success">
          Add&nbsp;photo
        </button>
      </div>

      <div className="d-flex flex-column gap-2">
        {photos.length > 0
          ? photos.map((photo) => (
              <div className="position-relative" key={photo}>
                <img
                  className="uploadedimg rounded-3"
                  src={
                    "https://bookingapp-api-a2nk.onrender.com/uploads/" + photo
                  }
                  alt="image"
                />
                <button
                  onClick={(ev) => deletePhoto(ev, photo)}
                  className="position-absolute bottom-0 end-0 m-1 rounded-3 bg-danger  opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
                {photo === photos[0] ? (
                  <button
                    onClick={(event) => mainPhoto(event, photo)}
                    className="position-absolute bottom-0 start-0 m-1 rounded-3 bg-success  opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={(event) => mainPhoto(event, photo)}
                    className="position-absolute bottom-0 start-0 m-1 rounded-3 bg-success-subtle  opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                  </button>
                )}
              </div>
            ))
          : null}
        <label className="btn btn-outline-success p-3 rounded-3 d-flex align-items-center fs-5 mb-2">
          <input
            type="file"
            accept=".jpg, .png"
            onChange={localUpload}
            formEncType="multipart/form-data"
            className="visually-hidden"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-upload"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>
          <span className="ps-2"> Upload</span>
        </label>
      </div>
    </>
  );
};
export default UploadPhotos;
