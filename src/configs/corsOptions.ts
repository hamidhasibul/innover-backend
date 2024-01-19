import { allowedOrigins } from "./allowedOrigins";

export const corsOptions = {
  origin: function (
    origin: string,
    callback: (err: Error, allow?: boolean) => void
  ) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // remove !origin on production

      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
