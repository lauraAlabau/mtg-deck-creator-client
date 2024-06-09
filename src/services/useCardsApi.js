export const
  getCardSearch = async (name, includeUniques) => {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=${name}${includeUniques ? "+unique%3Aprints&unique=cards" : ""
      }`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }

