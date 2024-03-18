import User from "@/modals/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { unstable_noStore } from "next/cache";


unstable_noStore()
export async function POST(req, res) {
  try {
    const data = await req.json();
    const response = await User.findOne({ email: data.email });
    if (response === null) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const create = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        loginType: "credentials",
      });
      return NextResponse.json({create,msg:"Account Created Successfully"});
    }else{
        return NextResponse.json({msg:"Account already exists."},{status:500})
    }
  } catch (error) {
    throw new Error(error);
  }
}
