import Main from "../views/components/Main";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Main>
      <Outlet />
    </Main>
  );
};

export default Layout;
