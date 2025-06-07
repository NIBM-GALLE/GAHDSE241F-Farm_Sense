import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../components/ModeToggle";

// Google logo image (public CDN)
const googleLogo =
  "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

// Import or define verifyEmailPng
// If you have the image file, use the import below:
// import verifyEmailPng from "../assets/images/verify_email.png";
// If you don't have the image, use a placeholder:
const verifyEmailPng = "https://placehold.co/400x400?text=Verify+Email";

function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formSchema = z.object({
    code: z.string().length(6, {
      message: "Verification code must be exactly 6 digits",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  // You need to define or import verifyEmail function
  const verifyEmail = async (code, navigate) => {
    // Dummy implementation for demonstration
    // Replace with your actual verification logic
    return new Promise((resolve) => {
      setTimeout(() => {
        alert("Email verified with code: " + code);
        navigate("/dashboard");
        resolve();
      }, 1000);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await verifyEmail(data.code, navigate);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid sm:grid-cols-2 justify-center items-center">
      <div className="mx-auto hidden sm:block">
        <img src={verifyEmailPng} alt="verify_email_img" />
        {/* Google Logo below the main image */}
        <div className="flex justify-center mt-6">
          <img
            src={googleLogo}
            alt="Google"
            className="w-14 h-14 rounded-full shadow border"
            title="Google"
          />
        </div>
      </div>
      <div className="mx-auto">
        <ModeToggle />
        <div className="text-center my-6">
          <h1 className="font-purple-purse text-4xl">Verify Your Email</h1>
          <h2 className="font-poppins text-2xl">
            We've sent a 6-digit code to your email address
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter 6-digit code"
                      {...field}
                      maxLength={6}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Check your email for the verification code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Didn't receive a code?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() =>
                  alert("Resend code functionality not implemented")
                }
              >
                Resend code
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default VerifyEmail;
