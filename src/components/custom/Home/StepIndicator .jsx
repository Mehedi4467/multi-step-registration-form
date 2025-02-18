import { motion } from "framer-motion";

const StepIndicator = ({ step, totalSteps }) => {
  return (
    <div className="flex justify-between items-center mb-6 relative w-full">
      {[1, 2, 3].map((num, index) => (
        <div key={num} className="relative flex flex-col items-center w-full">
          {/* Step Number */}
          <motion.div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all ${
              step >= num
                ? "border-[#1b2962] bg-[#1b2962] text-white"
                : "border-gray-400 bg-gray-200 text-gray-600"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: step === num ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {num}
          </motion.div>

          {/* Step Line */}
          {index < totalSteps - 1 && (
            <motion.div
              className="absolute top-5 left-[101%] transform -translate-x-1/2 h-1 bg-gray-300"
              style={{
                width: step > num ? "100%" : "0%",
                height: "4px",
              }}
              animate={{
                width: step > num ? "100%" : "0%",
                backgroundColor: step > num ? "#1b2962" : "#d1d5db",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
