"use client";
import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card } from "antd";
import { Typography } from "antd";
import Link from "next/link";
import { signup } from "../../utils/actions";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await signup(values);
      router.push("/");
    } catch (err: any) {
      console.error("Error in signup ", err);
    }
  };

  return (
    <div className="centeredForm">
      <Card className="formCard">
        <div className="container">
          <Text strong className="formTitle">
            Sign Up
          </Text>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>

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
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                {
                  pattern:
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, have at least 1 letter, 1 number, and 1 special character.",
                },
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
                Sign Up
              </Button>
              <div className="formFooter">
                or{" "}
                <Link href="/login" className="link">
                  {" "}
                  Back to Login!{" "}
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
