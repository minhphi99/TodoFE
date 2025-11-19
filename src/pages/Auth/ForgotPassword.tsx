import { Button, Form, Input, Typography } from "antd";
import { resetPassword } from "../../api/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleForgot = async (values: { email: string }) => {
    try {
      const res = await resetPassword(values);
      //navigate ve trang chu
      if (res.data) {
        //navigate ve trang chu, display message
        navigate("/login");
      } else {
        //display loi?, ve trang chu
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      await handleForgot(values);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <Typography.Title level={2}>Forgot Password</Typography.Title>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="forgot-form-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
