import axios from "axios";

import { useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { PiCards } from "react-icons/pi";
import { toast } from "react-toastify";

import GradientCircle from "../Components/GradientCircle";
import Navbar from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";

import { getCardSearch } from "../services/useCardsApi.js";
import { BASE_URL } from "../Utils/Constants.js";

import "../assets/css/search.css";

const Search = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [includeUniques, setIncludeUniques] = useState(false);

  const handleSearch = async () => {
    try {
      const data = await getCardSearch(searchTerm, includeUniques);
      setCards(data.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleAddToFavorites = async (card) => {
    const values = card;
    axios
      .post(`${BASE_URL}contactmsyt/add-favorite`, values, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Card added to Favorites successfully", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            closeOnClick: true,
            //bodyStyle:{} //TODO: Style it
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToDeck = async (card) => {
    const values = {
      ...card,
      amount_deck: "1",
    };

    axios
      .post(`${BASE_URL}contactmsyt/add-deck`, values, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Card added to Deck successfully", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            closeOnClick: true,
            //bodyStyle:{} //TODO: Style it
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <SearchBar
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIncludeUniques={setIncludeUniques}
      />
      <GradientCircle
        size={"large"}
        color={"green"}
        alignItems={"align-start"}
        justifyContent={"justify-center"}
      />

      <GradientCircle
        size={"medium"}
        color={"green"}
        alignItems={"align-center"}
        justifyContent={"justify-end"}
      />
      <GradientCircle
        size={"small"}
        color={"green"}
        alignItems={"align-end"}
        justifyContent={"justify-center"}
      />
      <div className="search-bg"></div>
      <main className="view-container">
        <div className="main-container">
          <div className="flex-container">
            {cards.map((card) => (
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
                        <button
                          className="btn fav"
                          onClick={() => handleAddToFavorites(card)}
                        >
                          <MdOutlineFavoriteBorder />
                        </button>
                        <span className="tooltiptext fav">
                          Add to Favorites
                        </span>
                      </div>
                      <div className="tooltip">
                        <button
                          className="btn deck"
                          onClick={() => handleAddToDeck(card)}
                        >
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

export default Search;
