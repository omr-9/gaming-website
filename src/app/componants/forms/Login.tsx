"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MotionItem from "../defaults/MotionItem";
import { Form } from "@/components/ui/form";
import FormInput from "../FormInput";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { login } from "@/app/actions/auth";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const res = await login(data);
      if (res !== undefined && res.success) {
        toast.success(res.success);
        setLoading(false);
        router.push("/");
      } else if (res !== undefined && res.error) {
        toast.error(res.error);
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <MotionItem
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      initial={{ opacity: 0, y: 100 }}
    >
      <div className="border border-input flex flex-col items-center w-full gap-4 bg-black/30 rounded-xl p-10  md:px-10 lg:px-20  max-w-[1375px]">
        <div className="text-2xl text-center mb-6 md:text-3xl font-semibold">
          <span className="text-rose-500">Gaming</span> Boi
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full  space-y-7"
          >
            <FormInput name="email" label="Email" type="email" />
            <FormInput name="password" label="Password" type="password" />
            <Button
              className="bg-rose-500  text-white hover:bg-rose-400 w-full"
              type="submit"
            >
              {loading ? "loading..." : "Login"}
            </Button>
          </form>
        </Form>
        <div className="capitalize text-sm flex gap-2 items-center mt-4 ">
          <p className=" text-gray-50 ">Do not have an account ?!</p>
          <Link className=" text-rose-500 hover:underline" href={"/signup"}>
            Register With Us Now !
          </Link>
        </div>
      </div>
    </MotionItem>
  );
};

export default Login;
