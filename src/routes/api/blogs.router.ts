import fileUpload from "express-fileupload";
import { postBlog } from "../../controllers/blogs.controller";
import { Router } from "express";
import { filePayloadExists } from "../../middlewares/filePayloadExists";
import { fileSizeLimiter } from "../../middlewares/fileSizeLimiter";
import { fileExtLimiter } from "../../middlewares/fileExtLimiter";

const router: Router = Router();

router
  .route("/")
  .post(
    fileUpload({ createParentPath: true }),
    filePayloadExists,
    fileExtLimiter([".png", ".jpg", ".jpeg"]),
    fileSizeLimiter,
    postBlog
  );

export default router;
