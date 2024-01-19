import { registerUser } from "../../controllers/register.controller";
import { Router } from "express";

const router: Router = Router();

router.route("/").post(registerUser);

export default router;
