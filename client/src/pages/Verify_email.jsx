import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import verifyEmailPng from "../assets/images/verify_email.png";
import { useUserStore } from "../stores/useUserStore";

function VerifyEmail() {
  const { verifyEmail, loading } = useUserStore();
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
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

  useEffect(() => {
    // Update the form value whenever digits change
    const code = digits.join("");
    form.setValue("code", code);
  }, [digits, form]);

  const onSubmit = async (data) => {
    await verifyEmail(data.code, navigate);
  };

  const handleDigitChange = (index, value) => {
    // Only allow numbers
    const numValue = value.replace(/\D/g, "");

    // Update the digits array
    const newDigits = [...digits];
    newDigits[index] = numValue;
    setDigits(newDigits);

    // Auto-focus to next input if a digit was entered
    if (numValue && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    const pasteDigits = pasteData.split("").slice(0, 6);

    if (pasteDigits.length === 6) {
      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasteDigits[i] || "";
      }
      setDigits(newDigits);
      inputRefs.current[5].focus();
    }
  };

  return (
    <div className="min-h-screen grid sm:grid-cols-2 justify-center items-center">
      <div className="mx-auto hidden sm:block">
        <img src={verifyEmailPng} alt="verify_email_img" />
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
                    <div className="flex justify-center space-x-2">
                      {digits.map((digit, index) => (
                        <Input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          value={digit}
                          onChange={(e) =>
                            handleDigitChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          maxLength={1}
                          className="w-12 h-16 text-center text-2xl"
                          inputMode="numeric"
                          pattern="[0-9]*"
                        />
                      ))}
                    </div>
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
              disabled={loading.verifyEmailLoading}
            >
              {loading.verifyEmailLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Didn't receive a code?{" "}
              <button type="button" className="text-primary hover:underline">
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
