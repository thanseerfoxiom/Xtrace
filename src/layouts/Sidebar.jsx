import React, { useContext } from "react";
import { ContextDatas } from "../services/Context";
import {
  basePath,
  ProductsPath,
  ReceivingPath,
  RestuarantPath,
  SuppliersPath,
} from "../services/UrlPaths";
import { Link, useNavigate } from "react-router-dom/dist";

function Sidebar() {
  const { mobileSide, setmobileSide, urlPath, setUrlPath } =
    useContext(ContextDatas);

  let navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
      <div
        className={`sidebar sidebar-collapse ${mobileSide ? "collapsed" : ""}`}
        id="sidebar"
      >
        <div className="sidebar__menu-group">
          <ul className="sidebar_nav">
            <li className={urlPath === basePath ? "active" : ""}>
              <Link to={basePath} onClick={() => setUrlPath(basePath)}>
                <span className="nav-icon uil uil-create-dashboard" />
                <span className="menu-text">Dashboard</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>
            <li className={urlPath.includes(ProductsPath) ? "active" : ""}>
             
            <Link
                to={basePath + ProductsPath}
                onClick={() => setUrlPath(basePath + ProductsPath)}
              >
                <span className="nav-icon uil uil-box" />
                {/* <span className="nav-icon uil uil-box" /> */}
                <span className="menu-text">Product</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>
            <li className={urlPath.includes(SuppliersPath) ? "active" : ""}>
             
              <Link
                to={basePath + SuppliersPath}
                onClick={() => setUrlPath(basePath + SuppliersPath)}
              >
                <span className="nav-icon  uil uil-truck" />
                <span className="menu-text">Suppliers</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
    
            </li>

            <li className={urlPath.includes(RestuarantPath) ? "active" : ""}>
              <Link
                to={basePath + RestuarantPath}
                onClick={() => setUrlPath(basePath + RestuarantPath)}
              >
                <span className="nav-icon uil uil-restaurant" />
                <span className="menu-text">Restaurant</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>

            <li className={urlPath.includes(ReceivingPath) ? "active" : ""}>
              <Link
                to={basePath + ReceivingPath}
                onClick={() => setUrlPath(basePath + ReceivingPath)}
              >
                <span className="nav-icon uil uil-inbox" />
                <span className="menu-text">Receiving</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
