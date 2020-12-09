import React, { useState } from "react";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("mail");

  const handleClick = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="header-container">
      <label>Joaquin Coronado Ramírez - actividad 9</label>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          <Link to="/alumno">Alumnos</Link>
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          <Link to="/materia">Materias</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
