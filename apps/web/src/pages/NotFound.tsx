import { ButtonLink } from "../components/Button";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";

export default function NotFound() {
	return (
		<PageLayout>
			<Header />
			<Container className="flex items-center justify-center">
				<div className="grid justify-items-center gap-4 text-center">
					<h1 className="text-primary">PAGE NOT FOUND</h1>
					<p>The page you're looking for doesn't exist.</p>
					<ButtonLink to="/" variant="primary">
						GO HOME
					</ButtonLink>
				</div>
			</Container>
		</PageLayout>
	);
}
