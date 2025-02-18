"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import FormComponent from "./FormComponent";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div className="min-h-screen bg-[url('/image/main_bg.webp')]  bg-cover bg-center bg-no-repeat">
      <div className="bg-opacity-80 bg-black h-screen flex justify-center items-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="w-[40%] mx-auto bg-white rounded-3xl rounded-tr-none rounded-bl-none  p-5 shadow-lg">
            <FormComponent />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
