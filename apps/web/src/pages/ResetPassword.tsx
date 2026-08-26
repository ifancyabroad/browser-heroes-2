import { useSearchParams } from "react-router-dom";
import { ACCOUNT_PASSWORD_MAX_LENGTH, ACCOUNT_PASSWORD_MIN_LENGTH } from "@app/shared";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { InputField } from "../components/FormFields";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageLayout } from "../components/PageLayout";
import { useAuthModalStore, useResetPassword } from "../features/auth";

export default function ResetPassword() {
	const [params] = useSearchParams();
	const resetPassword = useResetPassword();
	const openLogin = useAuthModalStore((state) => state.openLogin);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);

		resetPassword.mutate({
			token: params.get("token") ?? "",
			password: String(form.get("password")),
		});
	}

	return (
		<PageLayout>
			<Header />

			<Container className="flex items-center justify-center">
				{resetPassword.isSuccess ? (
					<section className="w-full max-w-sm">
						<header className="mb-5 grid gap-2">
							<h1 className="text-base text-success">PASSWORD RESET</h1>
							<p className="text-text">
								Your password has been updated. You can now sign in with your new
								password.
							</p>
						</header>

						<Button type="button" variant="primary" onClick={openLogin}>
							CONTINUE TO SIGN IN
						</Button>
					</section>
				) : (
					<section className="w-full max-w-sm">
						<header className="mb-5 grid gap-2">
							<h1 className="text-base text-primary">CHOOSE A NEW PASSWORD</h1>
							<p className="text-text">Enter a new password for your account.</p>
						</header>

						<form className="grid gap-4" onSubmit={handleSubmit}>
							<InputField
								id="reset-password"
								label="New password"
								name="password"
								type="password"
								autoComplete="new-password"
								minLength={ACCOUNT_PASSWORD_MIN_LENGTH}
								maxLength={ACCOUNT_PASSWORD_MAX_LENGTH}
								required
								disabled={resetPassword.isPending}
								autoFocus
							/>

							<Button
								type="submit"
								variant="primary"
								disabled={resetPassword.isPending}
							>
								{resetPassword.isPending ? "Resetting..." : "RESET PASSWORD"}
							</Button>

							{resetPassword.isError && (
								<p role="alert" className="text-error">
									This reset link is invalid or expired.
								</p>
							)}
						</form>
					</section>
				)}
			</Container>
			<Footer />
		</PageLayout>
	);
}
