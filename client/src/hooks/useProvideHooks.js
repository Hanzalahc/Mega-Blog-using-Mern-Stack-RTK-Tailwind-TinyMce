import { toast, Toaster } from "react-hot-toast";
import { useState, useEffect, useRef, memo } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  Link,
  NavLink,
  useLocation,
  useParams,
  useLoaderData,
  Outlet,
} from "react-router-dom";
import apis from "../api/api";

const useProvideHooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const showSuccess = (message) =>
    toast.success(message || "Operation successful!");
  const showError = (message) =>
    toast.error(message || "Something went wrong!");
 

  return {
    apis,
    useEffect,
    useRef,
    useState,
    memo,
    loading,
    setLoading,
    dispatch,
    navigate,
    Link,
    useParams,
    useLoaderData,
    NavLink,
    location,
    Outlet,
    Toaster,
    showSuccess,
    showError,
  };
};

export default useProvideHooks;
