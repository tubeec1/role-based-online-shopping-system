import React from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/appRoutes";

const App = () => {
  return <RouterProvider router={appRoutes} />;
};

export default App;
