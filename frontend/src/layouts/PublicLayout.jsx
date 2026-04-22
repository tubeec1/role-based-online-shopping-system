import React from "react";
import PublicHeader from "../components/ui/PublicHeader";
import { Outlet } from "react-router-dom";
import PublicFooter from "../components/ui/PublicFooter";

const PublicLayout = () => {
  return (
    <div>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
