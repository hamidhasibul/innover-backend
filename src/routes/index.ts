import { Router } from "express";
import registerRouter from "./auth/register.router";
import loginRouter from "./auth/login.router";
import logoutRouter from "./auth/logout.router";
import blogsRouter from "./api/blogs.router";

const router: Router = Router();

// Auth Routes

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

// API Routes

router.use("/api/blogs", blogsRouter);

export default router;
