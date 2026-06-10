import { Router } from "express";
import { createGuestSession, getCurrentUser } from "../controllers/auth.controller";

export const authRoutes = Router();

authRoutes.post("/guest", createGuestSession);
authRoutes.get("/me", getCurrentUser);
