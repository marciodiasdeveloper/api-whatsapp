import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import "@shared/container";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
// eslint-disable-next-line import-helpers/order-imports
import { errors } from "celebrate";

// import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { AppError } from "@shared/errors/appError";
import { handlingErrors } from "@shared/infra/http/middlewares/handlingErrors";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();

// app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  "/api-coverage",
  express.static(
    path.resolve(__dirname, "..", "..", "..", "..", "coverage", "lcov-report")
  )
);
app.get("/api-coverage", (request: Request, response: Response) => {
  return response.sendFile(
    path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "coverage",
      "lcov-report",
      "index.html"
    )
  );
});

app.use(cors());
app.use(router);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    // res.json(JSON.stringify(err));
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.log(err);

  res.status(500).json({
    status: "error",
    message: err.message, // 'Internal server error',
  });
});

app.use(Sentry.Handlers.errorHandler());
app.use(handlingErrors);

export { app };
