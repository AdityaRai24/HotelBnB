"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export function LoginTrigger() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleLogin = async () => {
    try {
      const loginData = {
        password: values.password,
        email: values.email,
        callbackUrl: "/",
        redirect: false,
      };
      const res = await signIn("credentials", loginData);
      if (res?.ok) {
        toast.success("Login Successful");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleClick = async () => {
    try {
      const res = await signIn("google");
      if (res?.ok) {
        toast.success("Login Successful");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 className="cursor-pointer">Login</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Enter your details to Login.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-start gap-4">
            <Label htmlFor="email" className="text-left w-[23%]">
              Email
            </Label>
            <Input
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              id="email"
              name="email"
              placeholder="Your Email"
              className="col-span-3"
            />
          </div>
          <div className="flex items-center justify-start gap-4">
            <Label htmlFor="password" className="text-left w-[23%]">
              Password
            </Label>
            <Input
              id="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              name="password"
              type="password"
              placeholder="Your Password"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col ">
          <Button
            type="submit"
            onClick={() => handleLogin()}
            className="w-full"
          >
            Login
          </Button>
          <h1 className="text-center py-3"> -- OR --</h1>
          <Button
            onClick={() => handleClick()}
            type="submit"
            className="w-full bg-[white] flex items-center justify-center gap-3 border border-primary hover:text-black text-black hover:bg-white"
          >
            <Image src={"/google.svg"} alt="google" width={20} height={20} />{" "}
            Continue With Google
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
