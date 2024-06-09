import axios from "axios";
import DataTable from "react-data-table-component";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import GradientCircle from "../Components/GradientCircle.jsx";
import Navbar from "../Components/Navbar.jsx";

import { BASE_URL } from "../Utils/Constants.js";

import "../assets/css/deck.css";
import { FaRegTrashCan, FaArrowRightArrowLeft } from "react-icons/fa6";

const customStyles = {
  table: {
    style: {
      color: "#fff",
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      color: "#fff",
      backgroundColor: "transparent",
    },
  },
  rows: {
    style: {
      color: "#fff",
      backgroundColor: "transparent",
    },
  },
  noData: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      backgroundColor: "transparent",
    },
  },
  progress: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      backgroundColor: "transparent",
    },
  },
};

const Deck = () => {
  const [decks, setDecks] = useState([]);
  const [loadingDeck, setLoadingDeck] = useState(true);

  const [sideboard, setSideboard] = useState([]);
  const [loadingSideBoard, setLoadingSideboard] = useState(true);

  const columnsDeck = [
    {
      name: "Amount",
      selector: (row) => {
        const amount = row.amount_deck;
        return (
          <>
            <input type="number" defaultValue={amount} className="input-num" />
          </>
        );
      },
    },
    {
      name: "Name",
      selector: (row) => <p className="cell-text">{row.name}</p>,
      grow: 3,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="cell-action">
          <FaArrowRightArrowLeft
            className="table-icon table-icon-left"
            onClick={() => handleMove("toSideboard", row)}
          />
          <FaRegTrashCan
            className="table-icon table-icon-right"
            onClick={() => handleRemove("fromDeck", row)}
          />
        </div>
      ),
      //right: true,
    },
  ];
  const columnsSideBoard = [
    {
      name: "Amount",
      selector: (row) => (
        <>
          <input
            type="number"
            defaultValue={Number(row.amount_sideboard)}
            className="input-num"
          />
        </>
      ),
    },
    {
      name: "Name",
      selector: (row) => <p className="cell-text">{row.name}</p>,
      grow: 3,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="cell-action">
          <FaArrowRightArrowLeft
            className="table-icon table-icon-left"
            onClick={() => handleMove("toDeck", row)}
          />
          <FaRegTrashCan
            className="table-icon table-icon-right"
            onClick={() => handleRemove("fromSideboard", row)}
          />
        </div>
      ),
      // right: true,
    },
  ];

  const handleMove = (toTable, card) => {
    if (toTable === "toSideboard") {
      const value = {
        ...card,
        amount_sideboard: "1",
      };
      axios
        .post(`${BASE_URL}contactmsyt/add-sideboard`, value, {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Card added to Sideboard successfully", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
              closeOnClick: true,
              pauseOnFocusLoss: false,
              //bodyStyle:{} //TODO: Style it
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (toTable === "toDeck") {
      const value = {
        ...card,
        id: card.apiId,
        amount_deck: "1",
      };
      axios
        .post(`${BASE_URL}contactmsyt/add-deck`, value, {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Card added to Sideboard successfully", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
              closeOnClick: true,
              pauseOnFocusLoss: false,
              //bodyStyle:{} //TODO: Style it
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRemove = (fromTable, card) => {
    console.log("***", fromTable, card);
    if (fromTable === "fromDeck") {
      console.log("from Deck");

      axios
        .put(`${BASE_URL}contactmsyt/delete-deck`, card, {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Card added to Sideboard successfully", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
              closeOnClick: true,
              pauseOnFocusLoss: false,
              //bodyStyle:{} //TODO: Style it
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (fromTable === "fromSideboard") {
      axios
        .put(`${BASE_URL}contactmsyt/delete-sideboard`, card, {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Card added to Sideboard successfully", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
              closeOnClick: true,
              pauseOnFocusLoss: false,
              //bodyStyle:{} //TODO: Style it
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setLoadingDeck(true);
    setLoadingSideboard(true);
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
  }, []);

  return (
    <>
      <Navbar />
      <GradientCircle
        size={"medium"}
        color={"violet"}
        alignItems={"align-end"}
        justifyContent={"justify-start"}
      />

      <GradientCircle
        size={"large"}
        color={"violet"}
        alignItems={"align-start"}
        justifyContent={"justify-center"}
      />
      <GradientCircle
        size={"small"}
        color={"violet"}
        alignItems={"align-center"}
        justifyContent={"justify-end"}
      />
      <div className="deck-bg"></div>

      <main className="view-container">
        <div className="box-container">
          <>
            {loadingDeck || loadingSideBoard ? (
              <BounceLoader
                loading={loadingDeck || loadingSideBoard}
                arial-label="Loading Spinner"
                data-testid="loader"
                className="loader"
                color="#492b4e"
              />
            ) : (
              <>
                <div className="deck-container">
                  <h3>Deck</h3>
                  <DataTable
                    columns={columnsDeck}
                    data={decks}
                    customStyles={customStyles}
                    className="table-deck"
                    noTableHead
                  />
                </div>
                <div className="side-container">
                  <h3>Sideboard</h3>
                  <DataTable
                    columns={columnsSideBoard}
                    data={sideboard}
                    customStyles={customStyles}
                    className="table-side"
                    noTableHead
                  />
                </div>
              </>
            )}
          </>
        </div>
      </main>
    </>
  );
};

export default Deck;
