import path from "path";
import { v4 as uuidv4 } from "uuid";

export const uploadFiles = (files: Record<string, any>) => {
  const fileNames: Record<string, string> = {};

  Object.keys(files).forEach((key) => {
    const rootPath = process.cwd();
    const fileName = `${uuidv4()}_${files[key].name}`;
    const filePath = path.join(rootPath, "public/files", fileName);

    files[key].mv(filePath, (error: Error) => {
      if (error) {
        throw new Error(`${error}`);
      }
    });

    fileNames[key] = fileName;
  });

  return fileNames;
};
