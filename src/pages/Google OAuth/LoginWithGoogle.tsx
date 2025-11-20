import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleRedirect } from "../../api/userApi";

const LoginWithGoogle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleRedirect = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const res = await handleRedirect(params.get("code") as string);
        if (res && res.token) {
          localStorage.setItem("accessToken", res.token);
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
  }, []);

  return <div>Loading...</div>;
};

export default LoginWithGoogle;
