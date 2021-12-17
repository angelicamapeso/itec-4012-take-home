import React, { useState } from "react";

const WoopsContext = React.createContext({
  woops: [],
  sortWoops: () => { },
  initializeWoops: () => { },
  addWoop: () => { },
  getUserWoops: () => { },
});

export const WoopsContextProvider = ({ children }) => {
  const [woops, setWoops] = useState([]);

  const sortWoops = (woopsFromApi) => {
    const data = [...woopsFromApi];
    data.sort((a, b) => {
      return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
    });
    return data;
  }

  const initializeWoops = (woopsFromApi) => {
    setWoops(woopsFromApi);
  }

  const addWoop = (newWoop) => {
    setWoops([newWoop, ...woops]);
  }

  const getUserWoops = (email) => {
    return woops.filter(woop => woop.email === email);
  }

  return (
    <WoopsContext.Provider
      value={{
        woops,
        sortWoops,
        initializeWoops,
        addWoop,
        getUserWoops,
      }}
    >
      {children}
    </WoopsContext.Provider>
  );
}

export default WoopsContext;