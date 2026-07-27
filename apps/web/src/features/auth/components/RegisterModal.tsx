import { useState } from "react";
import {
	ACCOUNT_PASSWORD_MAX_LENGTH,
	ACCOUNT_PASSWORD_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
} from "@app/shared";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useRegisterAccount } from "../hooks/useRegisterAccount";
import { AuthField } from "./AuthField";

type RegisterModalProps = {
	open: boolean;
	onClose: () => void;
};

export function RegisterModal({ open, onClose }: RegisterModalProps) {
	const registerAccount = useRegisterAccount();
	const [error, setError] = useState<string | null>(null);

	function handleClose() {
		registerAccount.reset();
		setError(null);
		onClose();
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		const form = new FormData(event.currentTarget);

		registerAccount.mutate(
			{
				displayName: String(form.get("displayName")),
				email: String(form.get("email")),
				password: String(form.get("password")),
			},
			{
				onSuccess: handleClose,
				onError: () =>
					setError("Unable to create the account. Check your details and try again."),
			},
		);
	}

	return (
		<Modal
			open={open}
			title="CREATE ACCOUNT"
			onClose={handleClose}
			dismissible={!registerAccount.isPending}
			footer={
				<>
					<Button
						type="button"
						onClick={handleClose}
						disabled={registerAccount.isPending}
					>
						Cancel
					</Button>

					<Button
						type="submit"
						form="register-account-form"
						variant="primary"
						disabled={registerAccount.isPending}
					>
						{registerAccount.isPending ? "Creating..." : "CREATE ACCOUNT"}
					</Button>
				</>
			}
		>
			<form id="register-account-form" className="grid gap-4" onSubmit={handleSubmit}>
				<p>Your existing heroes will stay with this account.</p>

				<AuthField
					id="register-display-name"
					label="Display name"
					name="displayName"
					autoComplete="nickname"
					minLength={DISPLAY_NAME_MIN_LENGTH}
					maxLength={DISPLAY_NAME_MAX_LENGTH}
					required
					disabled={registerAccount.isPending}
					autoFocus
				/>

				<AuthField
					id="register-email"
					label="Email"
					name="email"
					type="email"
					autoComplete="email"
					required
					disabled={registerAccount.isPending}
				/>

				<AuthField
					id="register-password"
					label="Password"
					name="password"
					type="password"
					autoComplete="new-password"
					minLength={ACCOUNT_PASSWORD_MIN_LENGTH}
					maxLength={ACCOUNT_PASSWORD_MAX_LENGTH}
					required
					disabled={registerAccount.isPending}
				/>

				{error && (
					<p role="alert" className="text-error">
						{error}
					</p>
				)}
			</form>
		</Modal>
	);
}
