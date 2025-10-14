import { motion } from "framer-motion";

const SimpleLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-gray-300 border-t-gray-600"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default SimpleLoader;
