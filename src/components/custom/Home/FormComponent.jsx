import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import StepIndicator from "./StepIndicator ";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
const FormComponent = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const totalSteps = 3;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      dob: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const submitForm = async (value) => {
    const toastId = toast.loading("Please wait...");
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill all required fields!");
      return;
    } else {
      try {
        const { data } = await axios.post(`/api/form`, value);
        if (data?.status) {
          toast.success(data?.message, { id: toastId });
          reset();
          setStep(1);
        } else {
          toast.error(data?.message, { id: toastId });
        }
      } catch (err) {
        toast.error(err?.message, { id: toastId });
      }
    }
  };

  return (
    <div>
      <StepIndicator step={step} totalSteps={totalSteps} />
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)}>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Name"
                    className="mt-3 border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Email"
                    className="mt-3 border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <Controller
                name="dob"
                control={control}
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                    className="mt-3  border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                  />
                )}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob.message}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Address Information</h2>

              {/* Address Line 1 */}
              <Controller
                name="address1"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Address Line 1"
                    className="mt-3 border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                  />
                )}
              />
              {errors.address1 && (
                <p className="text-red-500 text-sm">
                  {errors.address1.message}
                </p>
              )}

              {/* Address Line 2 (Optional) */}
              <Controller
                name="address2"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Address Line 2 (Optional)"
                    className="mt-3 border border-gray-400 px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                  />
                )}
              />

              {/* City */}
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="City"
                    className="mt-3 border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                  />
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}

              {/* State Dropdown */}

              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-3 border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none w-full bg-white"
                  >
                    <option value="">Select State</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                )}
              />
              {errors.division && (
                <p className="text-red-500 text-sm">
                  {errors.division.message}
                </p>
              )}

              {/* Zip Code */}
              <Controller
                name="zip"
                control={control}
                rules={{
                  required: "Zip Code is required",
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: "Invalid Zip Code",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Zip Code"
                    className="mt-3 border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                  />
                )}
              />
              {errors.zip && (
                <p className="text-red-500 text-sm">{errors.zip.message}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Account Information</h2>

              {/* Username */}
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Username"
                    className="border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                  />
                )}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}

              {/* Password */}
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder="Password"
                      className="mt-3 border border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                    />
                  )}
                />
                <motion.div
                  className="absolute top-3 right-3 cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-600" />
                  ) : (
                    <Eye size={20} className="text-gray-600" />
                  )}
                </motion.div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      placeholder="Confirm Password"
                      className="border mt-3 border-[#1b2962] px-2 h-10 rounded-xl rounded-tr-none rounded-bl-none outline-none"
                    />
                  )}
                />
                <motion.div
                  className="absolute top-3 right-3 cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} className="text-gray-600" />
                  ) : (
                    <Eye size={20} className="text-gray-600" />
                  )}
                </motion.div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
          <div className="flex justify-between mt-4">
            {step > 1 && <Button onClick={prevStep}>Previous</Button>}
            {step < 3 ? (
              <Button onClick={nextStep}>Next</Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default FormComponent;
