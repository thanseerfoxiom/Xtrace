import React, { useState } from "react";
import { Route, Routes } from "react-router-dom/dist";
import RouterConnection from "./connection/RouterConnection";
import PageLogin from "./pages/public/PageLogin";
import PageDashboard from "./pages/private/Dasboard/PageDashboard";
import PageNotFound from "./pages/public/PageNotFound";
import {
  basePath,
  ProductsPath,
  ReceivingPath,
  RestuarantPath,
  settingsPath,
  SuppliersPath,
} from "./services/UrlPaths";

import SettingsManagement from "./pages/private/Settings/SettingsManagement";
import PrivateRoute from "./utils/PrivateRoute";
import Products from "./pages/private/Product/Product";
import Suppliers from "./pages/private/Suppliers/Suppliers";
import Restaurant from "./pages/private/Restaurant/Restaurant";
import Receiving from "./pages/private/Receiving/Receiving";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
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
          
          
          
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
