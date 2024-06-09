

import axios from "axios";

import { useEffect, useState } from "react";

import GradientCircle from "../Components/GradientCircle.jsx";
import Navbar from "../Components/Navbar.jsx";

import { BASE_URL } from '../Utils/Constants.js'
import { toast } from "react-toastify";
import { PiCards } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    axios
      .get(`${BASE_URL}contactmsyt/favorites`,
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`
          }
        }
      )
      .then((res) => {
        if (res.data.success) {
          setFavorites(res.data.favorites)
        }
      })
      .catch((err) => {
        console.log(err)
      });

  }, [])

  const handleAddToDeck = async (card) => {

    const values = card
    axios
      .post(`${BASE_URL}contactmsyt/add-deck`, values
        ,
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`
          }
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Card added to Deck successfully", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            closeOnClick: true,
            //bodyStyle:{} //TODO: Style it
          })
        }
      })
      .catch((err) => {
        console.log(err)
      });

  }

  return (
    <>
      <Navbar />
      <GradientCircle
        size={"large"}
        color={"cyan"}
        alignItems={"align-start"}
        justifyContent={"justify-center"}
      />

      <GradientCircle
        size={"medium"}
        color={"cyan"}
        alignItems={"align-center"}
        justifyContent={"justify-end"}
      />
      <GradientCircle
        size={"small"}
        color={"cyan"}
        alignItems={"align-end"}
        justifyContent={"justify-center"}
      />
      {/* <div className="bg"></div> */}
      <main className="view-container">
        <div className="main-container">
          <div className="flex-container">
            {favorites.map((card) => (
              <div key={card.id} className="image-container">
                {card.image_uris?.normal && (
                  <>
                    <img
                      src={card.image_uris.normal}
                      alt={card.name}
                      className="image"
                    />
                    <div className="btn-actions">
                      <div className="tooltip">
                        <button className="btn fav" onClick={() => console.log(card)}>
                          <RiDeleteBinLine />
                        </button>
                        <span className="tooltiptext fav">Delete</span>
                      </div>
                      <div className="tooltip">
                        <button className="btn deck" onClick={() => handleAddToDeck(card)}>
                          <PiCards />
                        </button>
                        <span className="tooltiptext deck">Add to Deck</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorites;
