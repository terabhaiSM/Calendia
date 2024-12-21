import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
import availabilityRoutes from "./routes/availability";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/availability", availabilityRoutes);

export default app;