// import { login, signup } from './actions'

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   )
// }

'use client'
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Card, Typography } from "antd";
import { login } from "./actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Link } from "react-router-dom";
// import { useAuthContext } from "../../hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { AppUtils } from "../../utils/app.utils";
// import { ALERT_TYPE } from "../../types/alert.type";

const { Text } = Typography;

const SignInPage: React.FC = () => {
  const router = useRouter();
  // const navigate = useNavigate();

  // const { login } = useAuthContext();

  // const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: any) => {
    try {
      // await login(values);
      // navigate("/app");
      await login(values)
      console.log("login successful in onfinish")
      router.push("/")
      // redirect
    } catch (err: any) {
      // AppUtils.openNotification(ALERT_TYPE.ERROR, api, {
      //   message: "Error",
      //   description: e.message,
      //   placement: "topRight",
      // });

      console.error("Error in on finish login ", err)
    }
  };

  return (
    <div className="centeredForm">
      {/* {contextHolder} */}

      <Card className="cardForm">
        <div className="container">
          <Text strong className="formTitle">
            Sign In
          </Text>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" className="button">
                Sign In
              </Button>
              <div className="formFooter">
                or{" "}
                <Link href="/signUp" className="link">
                  {" "}
                  Sign Up now!{" "}
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
