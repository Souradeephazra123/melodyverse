"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm, useFormState } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { UserLogin } from "@/app/login/action";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const Login = ({
  defaultValue,
  isRemember,
}: {
  defaultValue: {
    email: "y2@yopmail.com" | undefined;
    password: "abcd1234" | undefined;
  };
  isRemember: boolean | string | undefined;
}) => {
  const [isHidden, setIsHidden] = React.useState(true);
  const router = useRouter();
  const { handleSubmit, setValue, watch, control } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: isRemember === "true" ? defaultValue.email : "",
      password: isRemember === "true" ? defaultValue.password : "",
      remember: isRemember === "true",
    },
  });
  const { pending } = useFormStatus();
  const { isDirty, isValid, errors } = useFormState({ control });

  const onSubmit = async (formdata: LoginFormData) => {
    const userCredential = {
      email: formdata.email,
      password: formdata.password,
    };
    try {
      const res = await UserLogin(userCredential);
      const RemeberMe = watch("remember");

      if (res.message === "Login successful") {
        toast.success("Login successful");
        Cookie.set("userProfile", JSON.stringify(userCredential, null, 2), {
          secure: true,
          sameSite: "strict",
        });
        Cookie.set("token", res.access_token, {
          secure: true,
          sameSite: "strict",
        });
        Cookie.set("userid", res.user_id, {
          secure: true,
          sameSite: "strict",
        });
        if (RemeberMe) {
          Cookie.set("remeberme", "true", {
            secure: true,
            sameSite: "strict",
          });
        }
        router.push("/dashboard");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" flex flex-col gap-5 p-6 border-[1px] border-[#C1C1C1]  rounded-2xl">
        <p className=" text-3xl font-bold text-center">Login</p>
        <p className=" text-xl font-semibold text-center">
          Welcome back to Infloso
        </p>
        <p className=" text-sm text-center">Hear the sound of your thoughts</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-5 max-w-[80vw]"
        >
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                {" "}
                <label>
                  Email <span className=" text-red-600">*</span>
                </label>
                <input
                  {...field}
                  type="text"
                  placeholder="Enter Email ID"
                  className=" w-[70vw] sm:w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
                />
                {errors.email && (
                  <p className=" text-red-600">
                    {typeof errors.email?.message === "string" &&
                      errors.email.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue={""}
            rules={{
              required: "password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Minimum eight characters, at least one letter and one number",
              },
            }}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                {" "}
                <label>
                  Password <span className=" text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter password"
                    className=" w-[70vw] sm:w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsHidden(!isHidden)}
                    className="absolute right-2 top-2 text-sm text-blue-500"
                  >
                    {isHidden ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className=" text-red-600">
                    {typeof errors.password?.message === "string" &&
                      errors.password.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                {" "}
                <div className="flex gap-1 items-center">
                  <input
                    {...field}
                    type="checkbox"
                    className=" w-5 h-5 bg-Black rounded-lg p-2 text-black  border-[1px] border-[#C1C1C1]"
                    value={field.value ? "true" : "false"}
                  />
                  <label>Remeber Me</label>
                </div>
              </div>
            )}
          />
          <p className=" text-red-500 text-right underline cursor-pointer">
            forgot password
          </p>
          <button
            disabled={!isValid}
            type="submit"
            className={` ${
              isValid ? "bg-black text-white" : " bg-gray-400 text-white"
            }  font-semibold  rounded-md py-2`}
          >
            Submit
          </button>
        </form>

        <p className=" text-sm text-center">
          Don't have an account? &nbsp;{" "}
          <Link href={"/signup"} className=" font-bold ">
            SIGNUP
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
