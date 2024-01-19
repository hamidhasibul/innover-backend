// Libraries
import express, { Application } from "express";
import * as path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import "dotenv/config";

import { corsOptions } from "./configs/corsOptions";

import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logEvents";
import { credentials } from "./middlewares/credentials";

import registerRouter from "./routes/auth/register.router";
import loginRouter from "./routes/auth/login.router";
import logoutRouter from "./routes/auth/logout.router";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8080;

// Middlewares
app.use(express.static(path.join(process.cwd(), "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

// Routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server initiated @http://localhost:${PORT}/`);
});
