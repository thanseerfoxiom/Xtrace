import React, { useContext, useState } from "react";
import { ContextDatas } from "../services/Context";
import {
  basePath,
  DishesPath,
  HaccapPath,
  ProductsPath,
  ReceivingPath,
  RestuarantPath,
  StoragesPath,
  SuppliersPath,
  TodoPath,
} from "../services/UrlPaths";
import { Link, useNavigate } from "react-router-dom/dist";
import { ChevronDown, ChevronRight } from "lucide-react";
function Sidebar() {
  const { mobileSide, setmobileSide, urlPath, setUrlPath } = useContext(ContextDatas);
  const navigate = useNavigate();
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
            <li className={urlPath === basePath ? "active ms-2" : ""}>
              <Link to={basePath} onClick={() => setUrlPath(basePath)}>
                <span className="nav-icon uil uil-create-dashboard" />
                <span className="menu-text">Dashboard</span>
              </Link>
            </li>
            {/* 2. Product */}
            <li className={urlPath.includes(ProductsPath) ? "active ms-2" : ""}>
              <Link
                to={basePath + ProductsPath}
                onClick={() => setUrlPath(basePath + ProductsPath)}
              >
                <span className="nav-icon uil uil-box" />
                <span className="menu-text">Product</span>
              </Link>
            </li>
            {/* 3. Suppliers */}
            <li className={urlPath.includes(SuppliersPath) ? "active ms-2" : ""}>
              <Link
                to={basePath + SuppliersPath}
                onClick={() => setUrlPath(basePath + SuppliersPath)}
              >
                <span className="nav-icon  uil uil-truck" />
                <span className="menu-text">Suppliers</span>
              </Link>
            </li>

            
            {/* 5. Dishes */}
            <li className={urlPath.includes(DishesPath) ? "active ms-2" : ""}>
              <Link
                to={basePath + DishesPath}
                onClick={() => setUrlPath(basePath + DishesPath)}
              >
                <span className="nav-icon uil uil-crockery" />
                <span className="menu-text">Dishes</span>
              </Link>
            </li>
            <li className={urlPath.includes(HaccapPath) ? "active ms-2" : ""}>
              <Link
                to={basePath + HaccapPath}
                onClick={() => setUrlPath(basePath + HaccapPath)}
              >
                <span className="nav-icon uil uil-check-circle" />
                <span className="menu-text">HACCAP</span>
              </Link>
            </li>
            <li className={urlPath.includes(TodoPath) ? "active ms-2" : ""}>
              <Link
                to={basePath + TodoPath}
                onClick={() => setUrlPath(basePath + TodoPath)}
              >
                <span className="nav-icon uil  uil-list-ul" />
                <span className="menu-text">ToDo HACCAP</span>
              </Link>
            </li>

            {/* 6. Operations (Parent Menu) */}
            <li
              className={
                /* If either Kitchen or Storage path is active, highlight "Operations" */
                urlPath.includes(RestuarantPath) || urlPath.includes(StoragesPath) || urlPath.includes(ReceivingPath)
                  ? "active has-submenu ms-2"
                  : " has-submenu"
              }
            >
              
              {/* Parent link for "Operations" — typically not navigable or could toggle sub-menu */}
              <a href="#!" onClick={(e) => setMenuop(!menuop)}>
                <span className="nav-icon uil uil-cog" />
                <span className="menu-text">Operations</span>
                {menuop
                ?<ChevronRight size={16} className="wh-10 flex-shrink-0 ms-auto" />:<ChevronDown size={16} className="wh-10 flex-shrink-0 ms-auto" />}
                
                

             
              </a>

              {/* Sub-menu with Kitchen & Storage */}
              {menuop? 
              <div >
              <ul className="sub-menu ms-3">
                <li
                  className={urlPath.includes(RestuarantPath) ? "active ms-2" : ""}
                >
                  <Link
                    to={basePath + RestuarantPath}
                    onClick={() => setUrlPath(basePath + RestuarantPath)}
                  >
                    <span className="nav-icon uil uil-restaurant" />
                    <span className="menu-text">Kitchen</span>
                  </Link>
                </li>
                {/* 4. Receiving */}
            <li className={urlPath.includes(ReceivingPath) ? "active ms-2" : ""}>
              <Link
                to={basePath + ReceivingPath}
                onClick={() => setUrlPath(basePath + ReceivingPath)}
              >
                <span className="nav-icon uil uil-inbox" />
                <span className="menu-text">Receiving</span>
              </Link>
            </li>
                <li className={urlPath.includes(StoragesPath) ? "active ms-2" : ""}>
                  <Link
                    to={basePath + StoragesPath}
                    onClick={() => setUrlPath(basePath + StoragesPath)}
                  >
                    <span className="nav-icon uil uil-store" />
                    <span className="menu-text">Storage</span>
                  </Link>
                </li>
              </ul>
              </div>
              :""}
            </li>

            {/*
              NOTE:
              - We removed the old Kitchen and Storage top-level <li> items
              - They are now nested under "Operations".
            */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
