import axios from "axios";

type ILoginGoogle = {
  code: string;
  redirectUri: string;
  refreshToken?: string;
  grantType: string;
};

export const loginGoogle = async (payload: ILoginGoogle) => {
  const res = await axios.post(
    `${import.meta.env.VITE_URL}/v1/tokens/google`,
    payload
  );
  return res;
};

export const loginWithId = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};
