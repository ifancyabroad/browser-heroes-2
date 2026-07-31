import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { useAuth, useLogout } from "../features/auth";

export default function Account() {
	const { user } = useAuth();
	const logout = useLogout();

	return (
		<PageLayout>
			<Header />

			<Container className="flex items-center justify-center">
				<section className="w-full max-w-sm">
					<header className="mb-5 grid gap-2">
						<h1 className="text-base text-primary">ACCOUNT</h1>
						<p className="text-text">View and manage your Browser Heroes account.</p>
					</header>

					<Card contentClassName="grid gap-4 p-4">
						<dl className="grid gap-4">
							<div>
								<dt className="text-text-label">Display name</dt>
								<dd className="text-text-bright">{user?.displayName ?? ""}</dd>
							</div>

							<div>
								<dt className="text-text-label">Email</dt>
								<dd className="break-all text-text-bright">{user?.email ?? ""}</dd>
							</div>
						</dl>
					</Card>

					<Button
						type="button"
						onClick={() => logout.mutate()}
						disabled={logout.isPending}
						className="mt-4"
					>
						{logout.isPending ? "Signing out..." : "SIGN OUT"}
					</Button>
				</section>
			</Container>
		</PageLayout>
	);
}
