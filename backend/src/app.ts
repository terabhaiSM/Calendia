import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
import availabilityRoutes from "./routes/availability";
import slotRoutes from "./routes/slots";
import appointmentRoutes from "./routes/appointments";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/appointments", appointmentRoutes);
export default app;