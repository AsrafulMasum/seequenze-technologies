import { Outlet } from "react-router-dom";
import Drawer from "../Components/Drawer";

const MainLayout = () => {
  return (
    <div className="font-['Lato']">
      <Drawer>
        <Outlet></Outlet>
      </Drawer>
    </div>
  );
};

export default MainLayout;
