"use client";
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
import medusa from "@/lib/medusa";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LogIn() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Link href="/">
        <Button className="absolute top-5 left-5">Back to Home</Button>
      </Link>
      <LoginForm />
      <div
        className={cn(
          "flex flex-col justify-center items-center gap-5",
          "w-full max-w-[45vw] mt-16",
          "bg-slate-50 p-5 px-[5vw] drop-shadow-sm"
        )}
      >
        <h2>Are you new here?</h2>
        <Link href="/auth/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    medusa.auth.authenticate(data).then((res) => {
      if (res.response.status === 200) {
        localStorage.setItem("customer", JSON.stringify(res.customer));
        window.location.href = "/";
      }

      if (res.response.status === 401) {
        alert("Invalid credentials");
      }
    });
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="mb-5 text-2xl font-bold">Welcome Back!</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-[25vw] space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-gradient-to-l from-[#65C2ED] to-[#F1ADFF]"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
