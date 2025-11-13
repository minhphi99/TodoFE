import { Button, Checkbox, Form, Input, Typography } from "antd";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";
import "./pages/Auth/Auth.css";
// import { loginWithId } from "../../api/userApi";
import { loginWithId } from "./api/userApi";
import { useState } from "react";

interface ILoginFormValue {
  username: string;
  password: string;
}

const Login = () => {
  const [form] = Form.useForm<ILoginFormValue>();
  const [loading, setLoading] = useState<boolean>(false);
  // const handleGoogleLogin = async () => {};

  const handleLogin = async (value: ILoginFormValue) => {
    try {
      const res = await loginWithId(value.username, value.password);
      console.log(value.username, value.password);
      console.log("logging in", res);
      if (res.data) {
      }
    } catch (error: any) {
      const status = error.response?.data?.error?.code;
      console.error(error, status);
      return error;
    }
  };

  const onFinish = async (value: ILoginFormValue) => {
    setLoading(true);
    try {
      await handleLogin(value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Typography.Title level={2}>Welcome back</Typography.Title>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            // onClick={() => form.submit()}
          >
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
        <GoogleLoginButton onClick={() => alert("Hello")} />
      </Form>
    </div>
  );
};

export default Login;
