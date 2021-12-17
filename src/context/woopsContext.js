import React, { useState } from "react";

const WoopsContext = React.createContext({
  woops: [],
  initializeWoops: () => { },
});

export const WoopsContextProvider = ({ children }) => {
  const [woops, setWoops] = useState([]);

  const initializeWoops = (woopsFromApi) => {
    setWoops(woopsFromApi);
  }

  return (
    <WoopsContext.Provider
      value={{
        woops,
        initializeWoops,
      }}
    >
      {children}
    </WoopsContext.Provider>
  );
}

export default WoopsContext;