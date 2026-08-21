import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { registerCredentialsIdentity } from "@/lib/auth/resolve-auth-user";
import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";

const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export async function POST(request: Request) {
  try {
    const parsed = registerSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
    }

    await connectToDatabase();
    const email = parsed.data.email.toLowerCase();
    if (await User.exists({ email })) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const password = await hash(parsed.data.password, 12);
    const user = await User.create({
      email,
      username: parsed.data.name,
      firstName: parsed.data.name.split(" ")[0],
      lastName: parsed.data.name.split(" ").slice(1).join(" "),
      photo: "",
      password,
    });

    try {
      await registerCredentialsIdentity(user._id.toString());
    } catch (error) {
      await User.deleteOne({ _id: user._id });
      throw error;
    }

    return NextResponse.json({ id: user._id.toString() }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We couldn't create your account right now." }, { status: 500 });
  }
}
