import { createContext, useEffect, useState } from "react";

export const ContextDatas = createContext();

const Context = ({ children }) => {
  const [urlPath, setUrlPath] = useState(window.location.pathname ?? "/");
  const [mobileSide, setmobileSide] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);
  const [user, setuser] = useState(localStorage.getItem("token"))

  return (
    <ContextDatas.Provider
      value={{
        mobileSide,
        setmobileSide,
        urlPath,
        setUrlPath,
        pageLoading, setpageLoading,
        user, setuser
      }}
    >
      {children}
    </ContextDatas.Provider>
  );
};

export default Context;
