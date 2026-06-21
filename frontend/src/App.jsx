import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import appRoutes from "./routes/appRoutes";
import { getMe } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  return <RouterProvider router={appRoutes} />;
};

export default App;
