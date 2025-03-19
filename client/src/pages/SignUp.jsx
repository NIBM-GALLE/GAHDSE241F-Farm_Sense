import React from "react";
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
import signupPng from "../assets/images/signup.png";

function SignUp() {
  const navigate = useNavigate();
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // Check for at least one special character

  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),

    password: z
      .string()
      .regex(format, {
        message: "Password must contain at least one special character",
      })
      .min(8, {
        message: "Password must contain at least 8 characters",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="min-h-screen grid sm:grid-cols-2 mx-auto justify-center items-center px-4">
      <div className="mx-auto">
        <img src={signupPng} alt="login" className="max-w-full h-auto" />
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex">
            <ModeToggle />
          </div>
          <h1 className="font-purple-purse text-4xl mb-2">Hello There !</h1>
          <h2 className="font-poppins text-2xl ">Register a account with us</h2>
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
                Register
              </Button>
            </form>
            <div className="flex mt-5 mb-4">
              <div>Already a member ?</div>
              <div
                className="ml-1 cursor-pointer hover:underline text-green-500"
                onClick={() => navigate("/")}
              >
                Login
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
