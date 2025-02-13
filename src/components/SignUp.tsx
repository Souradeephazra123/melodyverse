"use client";
import { sendWelcomeMessage, signUp } from "@/app/signup/action";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm, useFormState } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Cookie from "js-cookie";
import Link from "next/link";

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  tndc: string;
}

const SignUp = () => {
  const router = useRouter();
  const [isHidden, setIsHidden] = React.useState(true);
  const { handleSubmit, setValue, watch, control } = useForm<SignUpFormData>({
    mode: "onChange",
  });
  const { pending } = useFormStatus();
  const { isDirty, isValid, errors } = useFormState({ control });

  const onSubmit = async (formData: SignUpFormData) => {
    const res = await signUp(formData);

    if (res.message === "User created successfully") {
      toast.success("User created successfully");
      const res = await sendWelcomeMessage(formData.email, formData.name);
      if (res.message === "Email sent successfully") {
        toast.success("Email sent successfully");
      }
      Cookie.set("userProfile", JSON.stringify(formData, null, 2));
      router.push("/login");
    } else {
      console.log("error in user creation");
      toast.error(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" flex flex-col gap-5 p-6 border-[1px] border-[#C1C1C1]  rounded-2xl">
        <p className=" text-3xl font-bold">Create your account</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-5 max-w-[80dvw]"
        >
          <div className=" w-full flex flex-col sm:flex-row gap-3">
            <Controller
              name={"name"}
              control={control}
              defaultValue={""}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <div className=" flex flex-col gap-2">
                  <label>
                    Name <span className=" text-red-600">*</span>
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your name"
                    className="w-[70vw] sm:w-96 bg-Black rounded-lg text-black p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
                  />
                  {errors.name && (
                    <p className=" text-red-600">
                      {typeof errors.name?.message === "string" &&
                        errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
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
                  className=" w-[70vw] sm:w-96 bg-Black rounded-lg p-2 text-black placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
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
                    type={isHidden ? "text" : "password"}
                    placeholder="Enter password"
                    className=" w-[70vw] sm:w-96 bg-Black rounded-lg p-2 text-black  border-[1px] border-[#C1C1C1]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsHidden(!isHidden)}
                    className="absolute right-8 top-3 sm:right-2 sm:top-2 text-sm text-blue-500"
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
            name="tndc"
            control={control}
            rules={{
              required: "Please accept terms and conditions",
            }}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                {" "}
                <div className="flex gap-1 items-center">
                  <input
                    {...field}
                    type="checkbox"
                    className=" w-5 h-5 bg-Black rounded-lg p-2 text-black  border-[1px] border-[#C1C1C1]"
                  />
                  <label>
                    You are agree to our{" "}
                    <Link href={"/tndc"} className=" underline">
                      {" "}
                      terms and conditions
                    </Link>{" "}
                    <span className=" text-red-600">*</span>
                  </label>
                </div>
                {errors.tndc && (
                  <p className=" text-red-600">
                    {typeof errors.tndc?.message === "string" &&
                      errors.tndc.message}
                  </p>
                )}
              </div>
            )}
          />
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
          Have an account? &nbsp;{" "}
          <Link href="/login" className=" font-bold ">
            LOGIN
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
