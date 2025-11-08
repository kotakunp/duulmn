"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(30, {
    message: "Username must not exceed 30 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // 1. Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  // 2. Define submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError(null);
      await signup(values.email, values.username, values.password);
      router.push("/"); // Redirect to home after successful signup
      router.refresh(); // Refresh the page to update UI after signup
    } catch (error) {
      setError(error instanceof Error ? error.message : "Signup failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} className="bg-gray-800 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="yourusername" {...field} className="bg-gray-800 text-white" />
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
                      <Input type="password" placeholder="••••••••" {...field} className="bg-gray-800 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-900/30 rounded">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-gray-400 mb-2">
            Already have an account?{" "}
            <Link href="/signin" className="text-purple-400 hover:underline">
              Sign in
            </Link>
          </div>
          <div className="text-sm text-gray-400">
            <Link href="/" className="text-purple-400 hover:underline">
              Back to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}