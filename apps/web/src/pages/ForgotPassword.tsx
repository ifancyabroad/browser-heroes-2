import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { AuthField, useRequestPasswordReset } from "../features/auth";

export default function ForgotPassword() {
	const requestPasswordReset = useRequestPasswordReset();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);

		requestPasswordReset.mutate({ email: String(form.get("email")) });
	}

	return (
		<PageLayout>
			<Header />

			<Container className="flex items-center justify-center">
				<form
					className="grid w-full max-w-md gap-4 border-2 border-border bg-bg-panel p-4"
					onSubmit={handleSubmit}
				>
					<h1 className="text-primary">RESET PASSWORD</h1>

					<p>Enter your account email. If it exists, we will send a reset link.</p>

					<AuthField
						id="forgot-password-email"
						label="Email"
						name="email"
						type="email"
						autoComplete="email"
						required
						disabled={requestPasswordReset.isPending}
						autoFocus
					/>

					<Button
						type="submit"
						variant="primary"
						disabled={requestPasswordReset.isPending}
					>
						{requestPasswordReset.isPending ? "Sending..." : "SEND RESET EMAIL"}
					</Button>

					{requestPasswordReset.data && (
						<p className="text-info">{requestPasswordReset.data.message}</p>
					)}

					{requestPasswordReset.isError && (
						<p role="alert" className="text-error">
							Unable to request a reset email. Please try again.
						</p>
					)}
				</form>
			</Container>
		</PageLayout>
	);
}
