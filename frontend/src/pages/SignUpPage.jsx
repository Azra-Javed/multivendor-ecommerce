import React, { useEffect } from "react";
import SignUp from "../components/SignUp/SignUp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);
  return (
    <div>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
