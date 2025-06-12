/* import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const login = (username: string | undefined, password: string | undefined) => {
  axios
    .post(
      "http://localhost:8000/api/user/auth/login",
      {
        username: username,
        password: password,
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then((r) => {
      console.log(r.data);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  login(values["username"], values["password"]);
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function LoginFrorm() {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginFrorm; 
*/

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Tabs,
  Card,
  message,
  Space,
  Typography,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

type TabItem = {
  key: string;
  label: string;
  children: React.ReactNode;
};

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    message.success(
      `${activeTab === "login" ? "Вход выполнен" : "Регистрация успешна"}`
    );
    console.log("Received values:", values);
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
    form.resetFields();
  };

  const tabItems: TabItem[] = [
    {
      key: "login",
      label: "Вход",
      children: (
        <Form form={form} name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Пожалуйста, введите email!" },
              { type: "email", message: "Некорректный email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Пожалуйста, введите пароль!" },
              { min: 6, message: "Пароль должен быть не менее 6 символов" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "register",
      label: "Регистрация",
      children: (
        <Form form={form} name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Имя" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Пожалуйста, введите email!" },
              { type: "email", message: "Некорректный email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Пожалуйста, введите пароль!" },
              { min: 6, message: "Пароль должен быть не менее 6 символов" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Пожалуйста, подтвердите пароль!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Подтвердите пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{ width: 420 }}
        headStyle={{ textAlign: "center" }}
        title={
          <Space direction="vertical" size="small">
            <Title level={3} style={{ margin: 0 }}>
              {activeTab === "login" ? "Вход в систему" : "Регистрация"}
            </Title>
          </Space>
        }
      >
        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          centered
          items={tabItems}
        />

        <div style={{ textAlign: "center", marginTop: 16 }}>
          {activeTab === "login" ? (
            <span>
              <a onClick={() => setActiveTab("register")}>Забыли пароль?</a>
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
