import { Router } from "express";
import {
	emailBodySchema,
	loginBodySchema,
	registerBodySchema,
	resetPasswordBodySchema,
} from "@app/shared";
import {
	createGuestSession,
	finishPasswordReset,
	forgotPassword,
	getCurrentUser,
	login,
	logout,
	register,
} from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate";
import { requireTrustedOrigin } from "../middlewares/origin";
import {
	guestCreationLimit,
	loginLimits,
	passwordResetCompletionLimit,
	passwordResetRequestLimits,
	registrationLimit,
} from "../middlewares/authRateLimits";

export const authRoutes = Router();
authRoutes.use(requireTrustedOrigin);

authRoutes.post("/guest", guestCreationLimit, createGuestSession);
authRoutes.get("/me", getCurrentUser);
authRoutes.post("/register", registrationLimit, validateBody(registerBodySchema), register);
authRoutes.post("/login", ...loginLimits, validateBody(loginBodySchema), login);
authRoutes.post("/logout", logout);
authRoutes.post(
	"/forgot-password",
	...passwordResetRequestLimits,
	validateBody(emailBodySchema),
	forgotPassword,
);
authRoutes.post(
	"/reset-password",
	passwordResetCompletionLimit,
	validateBody(resetPasswordBodySchema),
	finishPasswordReset,
);
