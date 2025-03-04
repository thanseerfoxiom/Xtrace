import React, { useState } from "react";
import { Route, Routes } from "react-router-dom/dist";
import RouterConnection from "./connection/RouterConnection";
import PageLogin from "./pages/public/PageLogin";
import PageDashboard from "./pages/private/Dasboard/PageDashboard";
import PageNotFound from "./pages/public/PageNotFound";
import {
  basePath,
  DetailsPath,
  DishesPath,
  HaccapPath,
  OperationsPath,
  ProductsPath,
  ReceipePath,
  ReceivingPath,
  RestuarantPath,
  settingsPath,
  StoragesPath,
  SuppliersPath,
  ThermometerPath,
  TodoPath,
} from "./services/UrlPaths";

import SettingsManagement from "./pages/private/Settings/SettingsManagement";
import PrivateRoute from "./utils/PrivateRoute";
import Products from "./pages/private/Product/Product";
import Suppliers from "./pages/private/Suppliers/Suppliers";
import Restaurant from "./pages/private/Restaurant/Restaurant";
import Receiving from "./pages/private/Receiving/Receiving";
import Storage from "./pages/private/Storage/storage"
import Recepies from "./pages/private/Menu/Recepies";
import Dishes from "./pages/private/Menu/Dishes";
import Thermometers from "./pages/private/Restaurant/Thermometers";
import { BaseUrl } from "./services/BaseUrls";
import Details from "./pages/private/Receiving/Details";
import Operations from "./pages/private/Restaurant/Operations";
import HaccapList from "./pages/private/Haccap/HaccapList";
import TodoHaccap from "./pages/private/Haccap/TodoHaccap";



function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route path={`${basePath+DetailsPath}/:id`} element={<Details />} />
        <Route path={basePath} element={<PrivateRoute><RouterConnection /></PrivateRoute>}>
          <Route index element={<PageDashboard />} />
          <Route
            path={basePath + settingsPath}
            element={<SettingsManagement />}
          />
          <Route
            path={basePath + ProductsPath}
            element={<Products />}
          />
          <Route
            path={basePath + SuppliersPath}
            element={<Suppliers />}
          />
          <Route
            path={basePath + RestuarantPath}
            element={<Restaurant />}
          />    
          <Route
            path={basePath + ReceivingPath}
            element={<Receiving />}
          />     
          <Route
            path={basePath + StoragesPath}
            element={<Storage />}
          />
          <Route
            path={basePath + DishesPath}
            element={<Dishes />}
          />       
          <Route
            path={`${basePath+ReceipePath}/:id`}
            element={<Recepies />}
          />      
          <Route
            path={`${basePath+ThermometerPath}/:id`}
            element={<Thermometers />}
          /> 
          <Route
            path={`${basePath+OperationsPath}/:id`}
            element={<Operations />}
          /> 
          <Route
            path={`${basePath+HaccapPath}`}
            element={<HaccapList />}
          /> 
          <Route
            path={`${basePath+TodoPath}`}
            element={<TodoHaccap />}
          /> 
        </Route>
        
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
