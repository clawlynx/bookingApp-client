//layout for showing multiple components in same route

import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="">
      <Header />
      <div className="px-2 pt-4 mt-4">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
