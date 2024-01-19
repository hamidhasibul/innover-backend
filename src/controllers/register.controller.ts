import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../utils/db";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "Valid credentials required" });
  }

  const userExists = await db.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (userExists) {
    return res
      .status(409)
      .json({ status: "error", message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, phone, password: hashedPassword };

    const newUser = await db.user.create({
      data: userData,
    });

    return res.status(201).json({
      status: "success",
      message: `User ${newUser.name} has been created`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
