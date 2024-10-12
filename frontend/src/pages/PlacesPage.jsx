import { Form, Link, useParams } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddPhotos] = useState([]);
  const [descriptions, setDescriptions] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuest] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    data.set("photos[]", files);
    console.log(files);

    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        setAddPhotos((prev) => {
          return [...prev, filename];
        });
      });
  }

  function h2Form(type = null) {
    return "text-2xl mt-3";
  }
  function pForm(type = null) {
    return "text-gray-500 text-sm";
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white rounded-full py-2 px-6"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new places
          </Link>{" "}
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for you place,should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              name=""
              id=""
              placeholder="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            {preInput("Address", "Address to this place")}
            <input
              type="text"
              name=""
              id=""
              placeholder="address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            {preInput("Photos", "more = better")}
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                type="text"
                placeholder="Add using a link ...jpg"
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 px-4 h-10 translate-y-2 rounded-2xl border-2 border-red-500"
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => {
                  console.log("ckeck link", link);
                  return (
                    <div>
                      {/* {link} */}
                      <img
                        className="rounded-2xl"
                        src={"http://localhost:4000/uploads/" + link}
                        alt=""
                      />
                    </div>
                  );
                })}
              <label className="cursor-pointer flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <input
                  type="file"
                  className="hidden"
                  name=""
                  id=""
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </label>
            </div>
            <h2 className={h2Form()}>Descriptions</h2>
            <p className={pForm()}>Descriptions of the place</p>
            <textarea
              value={descriptions}
              onChange={(ev) => setDescriptions(ev.target.value)}
            />
            {preInput("Perks", "Select all the perks of your places")}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <h2 className={h2Form()}>Extra Info</h2>
            <p className={pForm()}>House rules, etc...</p>
            <textarea
              name=""
              id=""
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            ></textarea>
            <h2 className={h2Form()}>Check in&out times, max guest</h2>
            <p className={pForm()}>
              {" "}
              Check in and out times , remember to have some time window for
              cleaning the room between guest
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  type="text"
                  name=""
                  id=""
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number guests</h3>
                <input
                  value={maxGuests}
                  onChange={(ev) => setMaxGuest(ev.target.value)}
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
