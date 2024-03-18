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
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export function RegisterTrigger() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);

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


  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/registerUser`,
        values
      );
      let data = {};
      data.name = response.data.create.name;
      data.email = response.data.create.email;
      data.id = response.data.create._id;
      data.password = response.data.create.password;
      data.fromSignup = true;
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.ok) {
        toast.success("Account Created Successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 className="cursor-pointer">Register</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Enter Details and create your account now.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-start gap-4">
            <Label htmlFor="name" className="text-left w-[23%]">
              Name
            </Label>
            <Input
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              id="name"
              name="name"
              placeholder="Your Name"
              className="col-span-3"
            />
          </div>
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
            onClick={() => handleRegister()}
            type="submit"
            className="w-full"
          >
            Register
          </Button>
          <h1 className="text-center py-3"> -- OR --</h1>
          <Button
            type="submit"
            onClick={() => handleClick()}
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
