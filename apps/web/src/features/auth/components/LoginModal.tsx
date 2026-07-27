import { useState } from "react";
import type { AuthUserResponse } from "@app/shared";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useLogin } from "../hooks/useLogin";
import { AuthField } from "./AuthField";

type LoginModalProps = {
	open: boolean;
	onClose: () => void;
	onSuccess: (response: AuthUserResponse) => void;
};

export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
	const login = useLogin();
	const [error, setError] = useState<string | null>(null);

	function handleClose() {
		login.reset();
		setError(null);
		onClose();
	}

	function handleSuccess(response: AuthUserResponse) {
		login.reset();
		onSuccess(response);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		const form = new FormData(event.currentTarget);

		login.mutate(
			{
				email: String(form.get("email")),
				password: String(form.get("password")),
			},
			{
				onSuccess: handleSuccess,
				onError: () => setError("Email or password is incorrect."),
			},
		);
	}

	return (
		<Modal
			open={open}
			title="SIGN IN"
			onClose={handleClose}
			dismissible={!login.isPending}
			footer={
				<>
					<Button type="button" onClick={handleClose} disabled={login.isPending}>
						Cancel
					</Button>

					<Button
						type="submit"
						form="login-form"
						variant="primary"
						disabled={login.isPending}
					>
						{login.isPending ? "Signing in..." : "SIGN IN"}
					</Button>
				</>
			}
		>
			<form id="login-form" className="grid gap-4" onSubmit={handleSubmit}>
				<AuthField
					id="login-email"
					label="Email"
					name="email"
					type="email"
					autoComplete="email"
					required
					disabled={login.isPending}
					autoFocus
				/>

				<AuthField
					id="login-password"
					label="Password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
					disabled={login.isPending}
				/>

				<Link className="text-info hover:text-text-bright" to="/forgot-password">
					Forgot password?
				</Link>

				{error && (
					<p role="alert" className="text-error">
						{error}
					</p>
				)}
			</form>
		</Modal>
	);
}
