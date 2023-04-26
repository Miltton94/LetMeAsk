import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import NewRoom from "../pages/NewRoom/NewRoom";
import Room from "../pages/Room";
import AdminRoom from "../pages/AdminRoom";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/rooms/new"
        element={<NewRoom />}
      />
      <Route
        path="/rooms/:id"
        element={<Room />}
      />
      <Route
        path="/admin/rooms/:id"
        element={<AdminRoom />}
      />
    </Routes>
  );
};

export default Router;
