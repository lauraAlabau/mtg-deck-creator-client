import DataTable from "react-data-table-component";
import { BounceLoader } from "react-spinners";

import GradientCircle from "../Components/GradientCircle.jsx";
import Navbar from "../Components/Navbar.jsx";

import "../assets/css/deck.css";
import { FaRegTrashCan, FaArrowRightArrowLeft } from "react-icons/fa6";
import { useDeckSbContext } from "../contexts/deckSbContext.jsx";

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
  const {
    decks,
    loadingDeck,
    sideboard,
    loadingSideBoard,
    moveToSb,
    moveToDeck,
    removeFromDeck,
    removeFromSb,
  } = useDeckSbContext();

  const columnsDeck = [
    {
      name: "Amount",
      selector: (row) => {
        const amount = row.amount_deck;
        return (
          <>
            <input
              type="number"
              defaultValue={amount}
              className="input-num"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        );
      },
    },
    {
      name: "Name",
      selector: (row) => <p className="cell-text">{row.name}</p>,
      grow: 2,
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
            onChange={(e) => console.log(e.target.value)}
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
      moveToSb(value);
    }
    if (toTable === "toDeck") {
      const value = {
        ...card,
        id: card.apiId,
        amount_deck: "1",
      };
      moveToDeck(value);
    }
  };

  const handleRemove = (fromTable, card) => {
    if (fromTable === "fromDeck") {
      console.log("from Deck");

      removeFromDeck(card);
    }
    if (fromTable === "fromSideboard") {
      removeFromSb(card);
    }
  };

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
