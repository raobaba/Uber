import app from "./app.js";
const PORT = process.env.PORT || 3000;

// UncaughtException Error
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
