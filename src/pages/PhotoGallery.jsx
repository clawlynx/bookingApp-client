import { useState } from "react";

const PhotoGallery = ({ thePlace }) => {
  const [showAllphotos, setShowAllPhotos] = useState(false);
  if (showAllphotos) {
    return (
      <div className="px-2 mx-2 mt-2 py-2 w-100">
        <h4>Photos of {thePlace.title}</h4>
        <button
          className="position-fixed btn btn-secondary bottom-0 start-0"
          onClick={() => setShowAllPhotos(false)}
        >
          Close Photos
        </button>
        {thePlace?.photos?.length > 0 &&
          thePlace.photos.map((photo) => {
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
    <>
      <div className="grid-container position-relative px-1 py-1 mt-2">
        <div className="grid-item-1 overflow-hidden">
          {thePlace.photos?.[0] && (
            <img
              src={
                "https://bookingapp-api-780h.onrender.com/uploads/" +
                thePlace.photos[0]
              }
              alt="img1"
            ></img>
          )}
        </div>
        <div className="grid-item-2 overflow-hidden">
          {thePlace.photos?.[1] && (
            <img
              src={
                "https://bookingapp-api-780h.onrender.com/uploads/" +
                thePlace.photos[1]
              }
              alt="img2"
            ></img>
          )}
        </div>
        <div className="grid-item-3 overflow-hidden">
          {thePlace.photos?.[2] && (
            <img
              src={
                "https://bookingapp-api-780h.onrender.com/uploads/" +
                thePlace.photos[2]
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
    </>
  );
};
export default PhotoGallery;
