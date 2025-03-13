import React, { useContext, useState } from "react";
import { ContextDatas } from "../services/Context";
import {
  basePath,
  DishesPath,
  HaccapPath,
  OperationsPath,
  ProductsPath,
  ReceivingPath,
  RestuarantPath,
  StoragesPath,
  SuppliersPath,
  TodoPath,
} from "../services/UrlPaths";
import { Link, useLocation, useNavigate } from "react-router-dom/dist";
import { ChevronDown, ChevronRight } from "lucide-react";
function Sidebar() {
  const { mobileSide, setmobileSide, urlPath, setUrlPath } = useContext(ContextDatas);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuop,setMenuop]=useState(false)

  return (
    <div className="sidebar-wrapper">
      <div
        className={`sidebar sidebar-collapse ${mobileSide ? "collapsed" : ""}`}
        id="sidebar"
      >
        <div className="sidebar__menu-group">
          <ul className="sidebar_nav">
            {/* 1. Dashboard */}
            <li className={currentPath === basePath ? "active ms-2" : ""}>
              <Link to={basePath}>
                <span className="nav-icon uil uil-create-dashboard" />
                <span className="menu-text">Dashboard</span>
              </Link>
            </li>
            {/* 2. Product */}
            <li className={currentPath.includes(ProductsPath) ? "active ms-2" : ""}>
              <Link to={basePath + ProductsPath}>
                <span className="nav-icon uil uil-box" />
                <span className="menu-text">Product</span>
              </Link>
            </li>
            {/* 3. Suppliers */}
            <li className={currentPath.includes(SuppliersPath) ? "active ms-2" : ""}>
              <Link to={basePath + SuppliersPath}>
                <span className="nav-icon uil uil-truck" />
                <span className="menu-text">Suppliers</span>
              </Link>
            </li>
            {/* 5. Dishes */}
            <li className={currentPath.includes(DishesPath) ? "active ms-2" : ""}>
              <Link to={basePath + DishesPath}>
                <span className="nav-icon uil uil-crockery" />
                <span className="menu-text">Dishes</span>
              </Link>
            </li>
            <li className={currentPath.includes(HaccapPath) ? "active ms-2" : ""}>
              <Link to={basePath + HaccapPath}>
                <span className="nav-icon uil uil-check-circle" />
                <span className="menu-text">HACCAP</span>
              </Link>
            </li>
            <li className={currentPath.includes(TodoPath) ? "active ms-2" : ""}>
              <Link to={basePath + TodoPath}>
                <span className="nav-icon uil uil-list-ul" />
                <span className="menu-text">ToDo HACCAP</span>
              </Link>
            </li>

            {/* 6. Operations (Parent Menu) */}
            <li
              className={
                currentPath.includes(RestuarantPath) ||
                currentPath.includes(StoragesPath) ||
                currentPath.includes(ReceivingPath)||
                currentPath.includes(ReceivingPath)||
                currentPath.includes(OperationsPath)
                  ? "active has-submenu ms-2"
                  : "has-submenu"
              }
            >
              <a href="#!" onClick={() => setMenuop(!menuop)}>
                <span className="nav-icon uil uil-cog" />
                <span className="menu-text">Operations</span>
                {menuop ? (
                  <ChevronRight size={16} className="wh-10 flex-shrink-0 ms-auto" />
                ) : (
                  <ChevronDown size={16} className="wh-10 flex-shrink-0 ms-auto" />
                )}
              </a>

              {/* Sub-menu */}
              {menuop && (
                <div>
                  <ul className="sub-menu ms-3">
                    <li className={currentPath.includes(RestuarantPath)||currentPath.includes(OperationsPath) ? "active ms-2" : ""}>
                      <Link to={basePath + RestuarantPath}>
                        <span className="nav-icon uil uil-restaurant" />
                        <span className="menu-text">Kitchen</span>
                      </Link>
                    </li>
                    <li className={currentPath.includes(ReceivingPath) ? "active ms-2" : ""}>
                      <Link to={basePath + ReceivingPath}>
                        <span className="nav-icon uil uil-inbox" />
                        <span className="menu-text">Receiving</span>
                      </Link>
                    </li>
                    <li className={currentPath.includes(StoragesPath) ? "active ms-2" : ""}>
                      <Link to={basePath + StoragesPath}>
                        <span className="nav-icon uil uil-store" />
                        <span className="menu-text">Storage</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
