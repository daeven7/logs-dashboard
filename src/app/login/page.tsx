"use client";
import React from "react";
import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Typography } from "antd";
import { login, signInWithGoogle } from "../../utils/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const SignInPage: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await login(values);
      router.push("/");
    } catch (err: any) {
      console.error("Error in login ", err);
    }
  };

  return (
    <div className="centeredForm">
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
              <Button
                icon={<GoogleOutlined />}
                onClick={signInWithGoogle}
                className="button w-full"
                iconPosition="end"
              >
                Sign In With Google
              </Button>
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
