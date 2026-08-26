import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { InputField } from "../components/FormFields";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageLayout } from "../components/PageLayout";
import { useRequestPasswordReset } from "../features/auth";

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
				<section className="w-full max-w-sm">
					<header className="mb-5 grid gap-2">
						<h1 className="text-base text-primary">FORGOT PASSWORD</h1>
						<p className="text-text">
							Enter your account email and we will send you a password reset link.
						</p>
					</header>

					<form className="grid gap-4" onSubmit={handleSubmit}>
						<InputField
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
							<p className="text-success">{requestPasswordReset.data.message}</p>
						)}
					</form>
				</section>
			</Container>
			<Footer />
		</PageLayout>
	);
}
