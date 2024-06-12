/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../Utils/Constants.js";

export const DeckSbContext = createContext(undefined);

export const DeckSbProvider = ({ children }) => {
  const [decks, setDecks] = useState([]);
  const [loadingDeck, setLoadingDeck] = useState(true);

  const [sideboard, setSideboard] = useState([]);
  const [loadingSideBoard, setLoadingSideboard] = useState(true);

  const fetchDeck = () => {
    setLoadingDeck(true);
    axios
      .get(`${BASE_URL}contactmsyt/deck`, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setDecks(res.data.decks);
          setLoadingDeck(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingDeck(false);
      });
  };

  const fetchSb = () => {
    setLoadingSideboard(true);

    axios
      .get(`${BASE_URL}contactmsyt/sideboard`, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setSideboard(res.data.sideboard);
          setLoadingSideboard(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingSideboard(false);
      });
  };

  useEffect(() => {
    fetchDeck();
    fetchSb();
  }, []);

  const moveToSb = (value) => {
    axios
      .post(`${BASE_URL}contactmsyt/add-sideboard`, value, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("res.data.success", res.data);
          toast.success("Card added to Sideboard", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            pauseOnFocusLoss: false,
            hideProgressBar: true,
            pauseOnHover: false,
          });
          setSideboard(res.data.sideboard);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const moveToDeck = (value) => {
    axios
      .post(`${BASE_URL}contactmsyt/add-deck`, value, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Card moved to Deck", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            pauseOnFocusLoss: false,
            hideProgressBar: true,
            pauseOnHover: false,
          });
          setDecks(res.data.decks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromDeck = (value) => {
    axios
      .put(`${BASE_URL}contactmsyt/delete-deck`, value, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Card deleted from deck", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            pauseOnFocusLoss: false,
            hideProgressBar: true,
            pauseOnHover: false,
          });

          setDecks(res.data.decks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromSb = (value) => {
    axios
      .put(`${BASE_URL}contactmsyt/delete-sideboard`, value, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Card deleted from Sideboard", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            pauseOnFocusLoss: false,
            hideProgressBar: true,
            pauseOnHover: false,
          });
          setSideboard(res.data.sideboard);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DeckSbContext.Provider
      value={{
        decks,
        sideboard,
        loadingDeck,
        loadingSideBoard,
        fetchDeck,
        fetchSb,
        moveToSb,
        moveToDeck,
        removeFromDeck,
        removeFromSb,
      }}
    >
      {children}
    </DeckSbContext.Provider>
  );
};

export const useDeckSbContext = () => {
  const context = useContext(DeckSbContext);

  if (!context) {
    throw new Error("useDeckSbContext must be use within a DeckSbProvider");
  }

  return context;
};
