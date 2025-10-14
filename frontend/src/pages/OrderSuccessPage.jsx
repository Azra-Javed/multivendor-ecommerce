import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import Lottie from "react-lottie";
import animationData from "../assets/animations/Success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Success = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Simulate a delay before showing animation
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Glowing ring */}
            <motion.div
              className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 blur-3xl opacity-30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Checkmark */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
              className="w-24 h-24 text-green-600 z-10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="26" cy="26" r="24" className="text-green-300" />
              <path d="M14 27l7 7 17-17" />
            </motion.svg>

            {/* Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-gray-800 mt-6 tracking-wide"
            >
              Congratulations!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-gray-600 mt-2 text-lg"
            >
              You’ve successfully completed your order 🎉
            </motion.p>

            {/* Confetti burst */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            >
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gray-400"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 1.5,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderSuccessPage;
