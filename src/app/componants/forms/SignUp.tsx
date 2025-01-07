"use client";
import React, { useRef, useState, useTransition } from "react";
import MotionItem from "../defaults/MotionItem";
import { z } from "zod";
import FormInput from "../FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signup } from "@/app/actions/auth";

const RegisterScima = z
  .object({
    avatar: z.any(),
    name: z
      .string()
      .min(3, { message: "Name must be at least 5 characters long" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterScima>>({
    resolver: zodResolver(RegisterScima),
    defaultValues: {
      password: "",
      email: "",
      name: "",
      confirmPassword: "",
      avatar: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterScima>) => {
    setLoading(true);
    try {
      if (firstRef.current?.files?.length) {
        const formData = new FormData();
        formData.append("file", firstRef.current.files[0]);
        formData.append("upload_preset", "ml_default");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/de21tagzv/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (!res.ok) {
          const error = await res.json();
          console.error("cloudinary error ", error);
          throw new Error("faild to upload image");
        }
        const cloudinaryData = await res.json();
        data.avatar = {
          secure_url: cloudinaryData.secure_url,
          public_id: cloudinaryData.public_id,
        };
      }
      const response = await signup(data);
      // console.log(response);
      if (response.success) {
        toast.success(response.success);
        form.reset();
        router.push("/login");
      } else {
        toast.error(response?.error || "something went wrong");
      }
    } catch (error) {
      console.error("signup error  ", error);
      toast.error("something went wrong during signup");
    } finally {
      setLoading(false);
    }
  };
  return (
    <MotionItem
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      initial={{ opacity: 0, y: 100 }}
    >
      <div className="border border-input flex flex-col items-center w-full gap-4 bg-black/70 rounded-xl p-10  md:px-10 lg:px-20  max-w-[1375px]">
        <div className="text-2xl text-center mb-6 md:text-3xl font-semibold">
          <span className="text-rose-500">Gaming</span> Boi
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex  w-full flex-col gap-6"
          >
            {/* <FileUploadDemo name="avatar" /> */}
            <Input
              type="file"
              name="avatar"
              ref={firstRef}
              className="text-base text-white"
            />
            <FormInput name="name" label="Name" type="text" />
            <FormInput name="email" label="Email" type="text" />
            <FormInput name="password" label="Password" type="password" />{" "}
            <FormInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />
            <Button
              className="bg-rose-500  text-white hover:bg-rose-400 w-full"
              disabled={loading}
              type="submit"
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="capitalize  text-sm md:text-sm md:font-semibold flex items-center gap-2">
          <p className="  text-gray-50 ">Already Have An Account ?!</p>{" "}
          <Link className=" text-rose-500 hover:underline" href={"/login"}>
            Login In to Your Account
          </Link>
        </div>
      </div>
    </MotionItem>
  );
};

export default SignUp;
