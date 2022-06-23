import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../redux/Api/api";
import { useLoginMutation } from "../redux/auth/authApi";
import {
  selectToken, logout as handleLogout,
  selectUserId
} from "../redux/auth/authSlice";
import jwt_decode from "jwt-decode"
import { UserRoleEnum } from "../models/UserRoleEnum";
import moment from "moment"


export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token: string = useAppSelector(selectToken);
  const userid = useAppSelector(selectUserId);

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
    if (token !== "") {
      return jwt_decode(token)
    }
  }

  const isTokenValid = (token: string): boolean => {
    try {
      const decodedToken: any = decodeJwt(token)
      const timeNow = moment().unix()
      const expireTime = timeNow - decodedToken.exp
      return expireTime < 0 ? true : false
    } catch {
      console.log("Invalid Token")
      return false
    }
  }

  const getLoggedInUserRole = () => {
    if (isTokenValid(token)) {
      const decodedJwtToken: any = decodeJwt(token)
      const currentUserRole = decodedJwtToken.role
      return currentUserRole
    } else { console.log("Invalid Token") }
  }

  const isAuthorized = (authorizeUsers: UserRoleEnum[]): boolean => {
    if (!isTokenValid(token)) { return false; }
    if (authorizeUsers.indexOf(getLoggedInUserRole()) === -1) { return false; }
    return true
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
    decodeJwt,
    isAuthorized,
    isTokenValid,
  };
};