import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../utils/db";

export const loginHandler = async (req: Request, res: Response) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res
      .status(401)
      .json({ status: "error", message: "Phone & Password required" });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        phone,
      },
    });

    if (!user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const match = bcrypt.compare(password, user.password);

    if (match) {
      const accessToken = jwt.sign(
        { userID: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      const refreshToken = jwt.sign(
        { userID: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await db.user.update({
        where: { id: user.id },
        data: {
          refreshToken,
        },
      });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        accessToken,
      });
    } else {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
