import React, { useState } from "react";

const WoopsContext = React.createContext({
  woops: [],
  initializeWoops: () => { },
});

export const WoopsContextProvider = ({ children }) => {
  const [woops, setWoops] = useState([
    { email: 'johndoe@email.com', text: 'A sample mistake!' },
    { email: 'jane@email.com', text: 'Another sample mistake!' },
    { email: 'angie@email.com', text: 'Woah I did this!' },
  ]);

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