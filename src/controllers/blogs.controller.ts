import { Request, Response } from "express";
import { uploadFiles } from "../utils/uploadFiles";
import { db } from "../utils/db";

export const postBlog = async (req: Request, res: Response) => {
  const { title, paragraph, tags, authorName, authorDesignation } = req.body;
  const files: Record<string, any> = req.files;

  try {
    const fileNames = uploadFiles(files);

    const blog = await db.blogpost.create({
      data: {
        title,
        paragraph,
        image: fileNames.postImage,
        tags,
        author: {
          create: {
            name: authorName,
            designation: authorDesignation,
            image: fileNames.authorImage,
          },
        },
      },
    });

    return res
      .status(201)
      .json({ status: "success", message: "Blog has been posted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
