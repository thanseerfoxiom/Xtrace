import React, { useContext, useEffect } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar";
import { ContextDatas } from "../services/Context";
import { Outlet } from "react-router-dom/dist";
import Loader from "../components/Loader";

function RouterConnection() {
  const { mobileSide, pageLoading, setpageLoading} = useContext(ContextDatas);
  useEffect(() => {
    const timer = setTimeout(() => {
      setpageLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div>
      <div className="mobile-author-actions" />
      <Header />
      <main className="main-content">
        <Sidebar />
        {pageLoading ? (
        <Loader />
      ):
        <Outlet />
    }
        {/* <Footer /> */}
      </main>

      <div className={`overlay-dark-sidebar ${mobileSide ? "show" : ""}`} />
      {/* <div className="customizer-overlay" /> */}
    </div>
  );
}

export default RouterConnection;
