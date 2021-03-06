import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import classNames from "classnames";

import chock from "../../../assets/chocobo.gif";
import { paths } from "../../../router";
import "./navbar.scss";

function Navbar() {
  const history = useHistory();
  const lastActiveTab = parseInt(localStorage.getItem("lastActive"));
  const [activeTab, setActiveTab] = useState(lastActiveTab || 0);

  useEffect(() => {
    setActiveTab(
      paths.findIndex((path) => path.path === history.location.pathname)
    );
  }, [history.location]);

  useEffect(() => {
    history.listen(() => {
      setActiveTab(
        paths.findIndex((path) => path.path === history.location.pathname)
      );
    });
  });

  return (
    <div className="navbar">
      <div className="bottom">
        <img src={chock} alt="chocobo running" />
        {paths.map((path, index) => {
          return (
            activeTab === index && (
              <Link to={path.path} key={`tab-${index}`}>
                <div
                  className={classNames("tabs")}
                  onClick={() => setActiveTab(index)}
                >
                  {path.name}
                </div>
              </Link>
            )
          );
        })}
        <img src={chock} alt="chocobo running" />
      </div>
    </div>
  );
}

export default Navbar;
