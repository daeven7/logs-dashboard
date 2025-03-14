'use client'
import React from "react";
import { Layout, Button, notification } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../hooks/auth";
import styles from "./navbar.module.scss";
// import { AppUtils } from "../../utils/app.utils";
// import { ALERT_TYPE } from "../../types/alert.type";
const { Header } = Layout;

const Navbar: React.FC = () => {
//   const navigate = useNavigate();

//   const { logout, username } = useAuthContext();
//   const [api, contextHolder] = notification.useNotification();
//   const onClick = async () => {
//     try {
//       await logout();
//       navigate("/");
//     } catch (e: any) {
//       AppUtils.openNotification(ALERT_TYPE.ERROR, api, {
//         message: "Error",
//         description: e.message,
//         placement: "topRight",
//       });
//     }
//   };

const onClick= async()=>{
    console.log("logout clicked")
}

  return (
    <Layout>
       {/* {contextHolder} */}
      <Header className={styles.header}>
        <div className={styles.content}>
          <div className={styles.appName}>Dashboard</div>
          <div>
            <Button
              icon={<LogoutOutlined />}
              onClick={onClick}
              className={styles.navBarButton}
            >
              Logout
            </Button>
            {/* <Button icon={<UserOutlined />} className={styles.navBarButton}>
              "Jon" 
            </Button> */}
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
