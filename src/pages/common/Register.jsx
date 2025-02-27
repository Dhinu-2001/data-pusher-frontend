import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userAxiosInstance from "../../axios/UserAxios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Username should only contain letters and numbers",
      }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords must match",
        code: "custom",
      });
    }
  });

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const { username, email, password } = data;
    localStorage.setItem("registeredEmail", email);
    try {
      await userAxiosInstance.post("/register/", { username, email, password });
      navigate("/login");
      toast.success("Successfully registered");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-black relative overflow-hidden w-screen min-h-screen flex">
      <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 space-y-6">
            <div className="w-8 h-8 bg-purple-600 rounded border-violet-400 items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 7h10M7 12h10M7 17h10" />
              </svg>
            </div>
            <span className="text-white text-xl font-semibold">
              Data-Pusher
            </span>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">
                Create an account
              </h2>
              {/* <p className="text-gray-500">Sign up and get 30 day free trial</p> */}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Username</label>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 rounded border-violet-400 border-2 bg-white"
                />
                {errors.username && (
                  <span className="text-red-400">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  {...register("email")}
                  type=""
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded border-violet-400 border-2 bg-white"
                />
                {errors.email && (
                  <span className="text-red-400">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Password</label>
                <div className="relative">
                  <input
                    {...register("password")}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded border-violet-400 border-2 pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-400">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    placeholder="Re-enter your password"
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded border-violet-400 border-2 pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-400">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <button className="w-full py-2 px-4 rounded border-violet-400 bg-purple-600 hover:bg-purple-800 hover:text-white text-black">
                Submit
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-gray-200" />
                <span className="text-sm text-gray-500">or</span>
                <div className="h-[1px] flex-1 bg-gray-200" />
              </div>

            </form>

            <div className="flex justify-between text-sm">
              <p className="text-gray-600">
                Have any account?
                <Link
                  to="/login"
                  className="text-violet-500 ml-1 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded border-violet-400 opacity-30"
            style={{
              bottom: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`card-${i}`}
            className="absolute w-12 h-12 rounded border-violet-400g-purple-900/20 border border-purple-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${Math.random() * 4 + 6}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Register;
