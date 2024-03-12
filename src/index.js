import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import propertiesRouter from "./routes/properties.js";
import hostsRouter from "./routes/hosts.js";
import amenitiesRouter from "./routes/amenities.js";
import loginRouter from "./routes/login.js";

import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import logMiddleware from "./middleware/logMiddleware.js";

const app = express();

//To initialize  Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());
app.use(log);

// Resource routes
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);
app.use("/properties", propertiesRouter);
app.use("/hosts", hostsRouter);
app.use("/amenities", amenitiesRouter);

// Login
app.use("/login", loginRouter);

// Trace errors
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler);

// Logging middleware
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
