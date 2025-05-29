import type { FormProps } from "antd";
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
