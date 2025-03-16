"use client";
import React from "react";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import styles from "./navbar.module.scss";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const Navbar: React.FC = () => {

  const supabase = createClient();
  const router = useRouter()
  const onClick = async () => {
    const { error } = await supabase.auth.signOut()
    router.push("/login")
  };

  return (
    <Layout>
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
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
