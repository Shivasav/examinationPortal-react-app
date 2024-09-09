import React from "react";
import Header from "./Header";
import BackgroundLines from "./BackgroundLines";

 function Layout(props){
  return (
    <div className="mi-wrapper">
      <BackgroundLines />
      <Header />
      {props.children}
    </div>
  );
}

export default Layout;
