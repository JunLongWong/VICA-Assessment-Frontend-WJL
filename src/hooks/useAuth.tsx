import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../redux/Api/api";
import { useLoginMutation } from "../redux/auth/authApi";
import {
  selectToken, logout as handleLogout,
  selectUser, selectUserId
} from "../redux/auth/authSlice";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);
  const userid = useAppSelector(selectUserId);

  console.log("user role>>>>> " + useAppSelector(selectUser)?.role)

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

  return {
    // avoid re-renders for similar inputs
    loggedUser: useMemo(
      () => ({
        token,
        user: userData?.user,
        isLoading: isLoadingLoggedUser,
        error,
        isError,
      }),
      [token, userData, isLoadingLoggedUser, isError, error]
    ),
    tryLogin: { login, isLoginRejected, isLoginSuccessful },
    logout,
  };
};