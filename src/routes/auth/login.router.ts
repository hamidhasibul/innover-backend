import { loginHandler } from "../../controllers/login.controller";
import { Router } from "express";

const router: Router = Router();

router.route("/").post(loginHandler);

export default router;
