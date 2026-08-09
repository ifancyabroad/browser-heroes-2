import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { InputField, TextareaField } from "../components/FormFields";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageLayout } from "../components/PageLayout";
import { useSendContactMessage } from "../features/contact";

export default function Contact() {
	const contact = useSendContactMessage();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formElement = event.currentTarget;
		const form = new FormData(formElement);

		contact.mutate(
			{
				email: String(form.get("email")),
				subject: String(form.get("subject")),
				message: String(form.get("message")),
			},
			{
				onSuccess: () => formElement.reset(),
			},
		);
	}

	return (
		<PageLayout>
			<Header />
			<Container className="flex items-center justify-center">
				<form className="grid w-full max-w-lg gap-4" onSubmit={handleSubmit}>
					<header className="grid gap-2">
						<h1 className="text-base text-primary">CONTACT</h1>
						<p className="text-text">Send a message to the Browser Heroes team.</p>
					</header>

					<InputField
						id="contact-email"
						label="Email address"
						name="email"
						type="email"
						autoComplete="email"
						required
						disabled={contact.isPending}
						autoFocus
					/>
					<InputField
						id="contact-subject"
						label="Subject"
						name="subject"
						type="text"
						maxLength={120}
						required
						disabled={contact.isPending}
					/>
					<TextareaField
						id="contact-message"
						label="Message"
						name="message"
						maxLength={5000}
						required
						disabled={contact.isPending}
					/>

					<Button type="submit" variant="primary" disabled={contact.isPending}>
						{contact.isPending ? "Sending..." : "SEND MESSAGE"}
					</Button>

					{contact.data && <p className="text-success">{contact.data.message}</p>}
				</form>
			</Container>
			<Footer />
		</PageLayout>
	);
}
