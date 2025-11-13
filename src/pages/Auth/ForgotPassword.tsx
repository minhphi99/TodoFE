import { Button, Form, Input, Typography } from "antd";
import type { forgotPassword } from "../../api/userApi";
import { useState } from "react";

const ForgotPassword = () => {
  // const [form] = Form.useForm<ISignUpFormValue>();
  // const [loading, setLoading] = useState<boolean>(false);

  // const handleForgot = async (value: ISignUpFormValue) => {
  //   try {
  //     const res = await forgotPassword(
  //       value.username,
  //       value.email,
  //       value.password,
  //       value.confirmPassword
  //     );
  //     if (res.data) {
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return error;
  //   }
  // };

  // const onFinish = async (value: ISignUpFormValue) => {
  //   setLoading(true);
  //   try {
  //     await handleForgot(value);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="forgot-container">
      <Typography.Title level={2}>Forgot Password</Typography.Title>
      <Form form={form} onFinish={onFinish}>
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
          <Button
            type="primary"
            htmlType="submit"
            className="forgot-form-button"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
