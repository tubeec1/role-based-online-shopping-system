import React from "react";
import PublicHeader from "../components/ui/PublicHeader";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <PublicHeader />

      <Outlet />
    </div>
  );
};

export default PublicLayout;
