import { Request, Response } from "express";
import { db } from "../utils/db";

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies;

    if (cookie?.jwt) {
      return res
        .status(204)
        .json({ status: "success", message: "Logged out successfully" });
    }

    const refreshToken = cookie.jwt;

    const user = await db.user.findUnique({
      where: refreshToken,
    });

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(204)
        .json({ status: "success", message: "Logged out successfully" });
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: "",
      },
    });

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(204)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
