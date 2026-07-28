import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { useAuth, useLogout } from "../features/auth";

export default function Account() {
	const { user } = useAuth();
	const logout = useLogout();

	return (
		<Layout>
			<Header />

			<Container className="flex items-center justify-center">
				<Card
					title="ACCOUNT"
					titleAlign="center"
					className="w-full max-w-md"
					contentClassName="grid gap-4 p-4"
				>
					<div>
						<p className="text-text-label">Display name</p>
						<p className="text-text-bright">{user?.displayName ?? ""}</p>
					</div>

					<div>
						<p className="text-text-label">Email</p>
						<p className="break-all text-text-bright">{user?.email ?? ""}</p>
					</div>

					<Button
						type="button"
						onClick={() => logout.mutate()}
						disabled={logout.isPending}
					>
						{logout.isPending ? "Signing out..." : "SIGN OUT"}
					</Button>
				</Card>
			</Container>
		</Layout>
	);
}
