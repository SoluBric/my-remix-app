import express from "express";
import path from "path";
import dotenv from "dotenv";
import payload from "payload";
// import payload from "./payload";

dotenv.config();

const app = express();

payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    console.log("Payload is up and running");
  },
});

// Mount Payload's admin panel on /admin
app.use("/admin", payload.router);

// Serve Remix app
app.use(express.static(path.join(path.resolve(), "public")));

app.all(
  "*",
  createRequestHandler({
    getLoadContext() {
      return {};
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
