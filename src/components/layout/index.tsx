import React from "react"
import Header from "./header";
import Sidebar from "./Sidebar/sidebar";
// import Header from "./header";
import Main from "./main";
import { Navigate, Outlet } from "react-router-dom";

export default function MainLayout() {
  const auth = sessionStorage.getItem("token");
  // Todo: need to remove useeffect 
  React.useEffect(() => {
    sessionStorage.setItem('token', 'token')
  }, [])



  // todo : need to replace true with auth
  return true ? (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
