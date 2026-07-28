import { Layout } from "../components/Layout";
import { ButtonLink } from "../components/Button";

export default function NotFound() {
	return (
		<Layout>
			<div className="flex-1 flex items-center justify-center">
				<div className="space-y-2 text-center">
					<h1>404 Page not found</h1>
					<p>The page you’re looking for doesn’t exist.</p>
					<ButtonLink to="/" variant="primary">
						Go to Home
					</ButtonLink>
				</div>
			</div>
		</Layout>
	);
}
