import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name should be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <section className="bg-slate-300 flex justify-center items-center min-h-screen max-h-screen bg-lightorange">
      <form
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md ml-20  text-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-darkblue">
          Login
        </h2>

        <div className=" bg-purple-400 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-semibold mb-1">
              Name
            </label>
            <input
              id="name"
              className=" w-full h-10 px-4 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="text-red-600">{errors.name.message}</em>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              className="w-full h-10 px-4 border border-gray-300 rounded-lg"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="text-red-600">{errors.email.message}</em>
            )}
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-lg font-semibold mb-1">
              Password
            </label>
            <input
              id="password"
              className="w-full h-10 px-4 border border-gray-300 rounded-lg pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute top-3 right-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <i className="fa fa-eye text-darkblue"></i>
              ) : (
                <i className="fa fa-eye-slash text-darkblue"></i>
              )}
            </button>
            {errors.password && (
              <em className="text-red-600">{errors.password.message}</em>
            )}
          </div>
        </div>

        <button
          className="w-full h-12 mt-6 bg-darkblue text-Black font-semibold rounded-lg hover:bg-red-500 transition duration-300"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default UserLogin;
