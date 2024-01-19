import { logoutHandler } from "../../controllers/logout.controller";
import { Router } from "express";

const router: Router = Router();

router.route("/").get(logoutHandler);

export default router;
