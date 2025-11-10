import { Button, Form, Input, Typography } from "antd";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <Typography.Title level={2}>Get Started Now</Typography.Title>
      <Form>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="signup-form-button">
            Sign up
          </Button>
          Or <Link to="/login">login now!</Link>
        </Form.Item>
        <GoogleLoginButton onClick={() => alert("Hello")} />
      </Form>
    </div>
  );
};

export default Signup;