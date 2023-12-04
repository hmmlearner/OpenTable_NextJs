import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { AuthenicationContext } from "../app/components/context/AuthContext";

const useAuth = () => {
  const { loading, data, error, setAuthState } =
    useContext(AuthenicationContext);
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }, handleClose:()=>void ) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email: email, password: password }
      );
      console.log(response);
      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
      console.log("Error in authenticating "+error.response.data.errorMessage);
    }
  };


  const signUp = async ({
    email,
    password,
    firstname,
    lastname,
    city,
    phone
}: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    city: string,
    phone: string;
  }, handleClose:()=>void ) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { email: email, password: password, firstname:firstname, lastname:lastname,phone:phone, city:city}
      );
      console.log(response);
      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
      console.log("Error in authenticating "+error.response.data.errorMessage);
    }
  };

  const signOut = async ()=>{
    deleteCookie("jwt");
    setAuthState({
        loading: false,
        data: null,
        error: null,
      });
  }

  return {
    signIn,
    signUp,
    signOut
  };
};
export default useAuth;
