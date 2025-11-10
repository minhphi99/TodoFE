import { Button, Checkbox, Form, Input, Typography } from "antd";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  return (
    <div className="login-container">
      <Typography.Title level={2}>Welcome back</Typography.Title>
      <Form>
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
          <Button type="primary" htmlType="submit" className="login-form-button">
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