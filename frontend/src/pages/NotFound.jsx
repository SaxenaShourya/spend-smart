import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import notFoundImg from "../assets/404.webp";
import { Home } from "../utils/Icons";

const NotFound = () => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center px-4">
      <h3 className="text-3xl md:text-4xl lg:text-6xl mb-2">OOPS!</h3>
      <img
        src={notFoundImg}
        alt="404 not found image"
        className="w-[35rem] md:w-[45rem]"
      />
      <h4 className="text-2xl lg:text-4xl mt-2 text-primary">Page Not Found</h4>
      <p className="text-base md:text-lg text-center text-pretty mt-4">
        You will be redirecting to the home page in {countdown}s.
      </p>
      <Button
        color="primary"
        onClick={() => navigate("/")}
        className="mt-6 text-lg"
        startContent={<Home />}
      >
        Back to home
      </Button>
    </section>
  );
};

export default NotFound;
