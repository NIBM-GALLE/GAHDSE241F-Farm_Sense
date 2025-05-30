import React from "react";
import loginPng from "../assets/images/login.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../components/ModeToggle";

function Login() {
  const navigate = useNavigate();
  // schema for form validation
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(4, {
      message: "Please enter your password",
    }),
  });

  // Initialize the form with react-hook-form and zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen grid sm:grid-cols-2 mx-auto justify-center items-center px-4">
      <div className="mx-auto hidden sm:block">
        <img src={loginPng} alt="login" className="max-w-full h-auto" />
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex">
            <ModeToggle />
          </div>
          <h1 className="font-purple-purse text-4xl mb-2">Oh, You're back!</h1>
          <h2 className="font-poppins text-2xl ">
            Log in with your credentials
          </h2>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
              >
                Login
              </Button>
            </form>
            <div className="flex mt-5 gap-5 justify-between mb-4">
              <div className="flex">
                <div>Not a member ?</div>
                <div
                  className="ml-2 cursor-pointer hover:underline text-green-500"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </div>
              </div>
              <div
                className="cursor-pointer text-red-400 hover:underline"
                onClick={() => navigate("/forget-password")}
              >
                Forget Password ?
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
