"use client";

import { useState, useEffect } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/AuthContext";
import { fetchProfile } from "@/utils/api";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(30, {
    message: "Username must not exceed 30 characters.",
  }),
  profileImage: z.string().optional(),
});

export default function ProfilePage() {
  const router = useRouter();
  const { state: authState, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with user data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!authState.token) {
        router.push('/signin');
        return;
      }

      try {
        setLoading(true);
        const response = await fetchProfile();
        const userData = response.data;
        
        form.reset({
          email: userData.email,
          username: userData.username,
          profileImage: userData.profileImage || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile data");
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [authState.token, form, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Define submission handler for profile updates
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real implementation, you would call an API to update the user profile
    // For now, we'll just show a success message
    console.log("Updated profile:", values);
    // In a real app, you would make an API call here
    // await updateProfile(values);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (!authState.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-white">Please sign in to view your profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Your Profile</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-900/30 rounded mb-4">
                {error}
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          {...field} 
                          className="bg-gray-800 text-white" 
                          disabled
                        />
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
                        <Input 
                          placeholder="yourusername" 
                          {...field} 
                          className="bg-gray-800 text-white" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg" 
                          {...field} 
                          className="bg-gray-800 text-white" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col space-y-4 pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Update Profile
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
                  >
                    Sign Out
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}