import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleRedirect } from "../../api/userApi";

const LoginWithGoogle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleRedirect = async () => {
      try {
        const res = await handleRedirect();
        if (res && res.accessToken) {
          localStorage.setItem("accessToken", res.accessToken);
          navigate("/todo");
        } else {
          // Handle case where accessToken is not in the response
          console.error("Login failed: No access token received.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Google login failed:", error);
        navigate("/login");
      }
    };

    handleGoogleRedirect();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default LoginWithGoogle;
