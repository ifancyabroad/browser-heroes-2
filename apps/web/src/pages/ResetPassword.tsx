import { Link, useSearchParams } from "react-router-dom";
import { ACCOUNT_PASSWORD_MAX_LENGTH, ACCOUNT_PASSWORD_MIN_LENGTH } from "@app/shared";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { AuthField, useResetPassword } from "../features/auth";

export default function ResetPassword() {
	const [params] = useSearchParams();
	const resetPassword = useResetPassword();

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
					<section className="grid w-full max-w-md gap-4 border-2 border-border bg-bg-panel p-4">
						<h1 className="text-success">PASSWORD RESET</h1>
						<Link className="text-info hover:text-text-bright" to="/account">
							SIGN IN
						</Link>
					</section>
				) : (
					<form
						className="grid w-full max-w-md gap-4 border-2 border-border bg-bg-panel p-4"
						onSubmit={handleSubmit}
					>
						<h1 className="text-primary">CHOOSE A NEW PASSWORD</h1>

						<AuthField
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

						<Button type="submit" variant="primary" disabled={resetPassword.isPending}>
							{resetPassword.isPending ? "Resetting..." : "RESET PASSWORD"}
						</Button>

						{resetPassword.isError && (
							<p role="alert" className="text-error">
								This reset link is invalid or expired.
							</p>
						)}
					</form>
				)}
			</Container>
		</PageLayout>
	);
}
