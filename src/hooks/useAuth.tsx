import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../redux/Api/api";
import { useLoginMutation } from "../redux/auth/authApi";
import {
  selectToken, logout as handleLogout,
  selectUser, selectUserId
} from "../redux/auth/authSlice";
import jwt_decode from "jwt-decode"


export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token: string = useAppSelector(selectToken);
  const userid = useAppSelector(selectUserId);
  const userObj = useAppSelector(selectUser)

  // automatically handles logout once the token and userid are removed from redux
  // update localStorage in sync with the store
  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid);
  }, [token, userid]);

  const {
    data: userData,
    isLoading: isLoadingLoggedUser,
    error,
    isError,
    isSuccess,
  } = useGetUserQuery(userid ?? "", {
    skip: !userid,
  });

  const [login, { isError: isLoginRejected, isSuccess: isLoginSuccessful }] =
    useLoginMutation();

  useEffect(() => {
    if (isLoginSuccessful) {
      navigate("/index");
    }
  }, [isLoginSuccessful, navigate]);

  const logout = () => {
    localStorage.clear();
    dispatch(handleLogout());
    navigate("/");
  };

  const decodeJwt = (token: string) => {
    if (token) {
      return jwt_decode(token)
    }
    else { return false }
  }
  const getLoggedInUserRole = () => {
    try {
      const decodedJwtToken: any = decodeJwt(token)
      const currentUserRole = decodedJwtToken.role
      return currentUserRole
    } catch (error) {
      console.log("error decoding token")
    }
  }

  return {
    // avoid unneccessary recomputing 
    loggedUser: useMemo(
      () => ({
        token,
        user: userData?.user,
        isLoading: isLoadingLoggedUser,
        error,
        isError,
        isSuccess
      }),
      [token, userData, isLoadingLoggedUser, isError, error, isSuccess]
    ),
    tryLogin: { login, isLoginRejected, isLoginSuccessful },
    logout,
    getLoggedInUserRole,
  };
};