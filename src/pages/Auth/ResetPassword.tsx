import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Auth.css";
import { forgotPassword } from "../../api/userApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPW = async (password: string) => {
    try {
      const { token } = useParams();
      console.log(token);
      const res = await forgotPassword(token as string, password);
      if (res.data) {
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const onFinish = async (password: string) => {
    setLoading(true);
    try {
      await handleResetPW(password);
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
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Reset
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
