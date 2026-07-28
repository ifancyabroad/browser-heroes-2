import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { useAuth, useLogout } from "../features/auth";

type RegisteredAccountProps = {
	displayName: string;
	email: string;
};

export default function Account() {
	const { user } = useAuth();

	return (
		<Layout>
			<Header />

			<div className="flex flex-1 items-center justify-center bg-bg-base p-4">
				<RegisteredAccount
					displayName={user?.displayName ?? ""}
					email={user?.email ?? ""}
				/>
			</div>
		</Layout>
	);
}

function RegisteredAccount({ displayName, email }: RegisteredAccountProps) {
	const logout = useLogout();

	return (
		<section className="grid w-full max-w-md gap-4 border-2 border-border bg-bg-panel p-4">
			<h1 className="text-primary">ACCOUNT</h1>

			<div>
				<p className="text-text-label">Display name</p>
				<p className="text-text-bright">{displayName}</p>
			</div>

			<div>
				<p className="text-text-label">Email</p>
				<p className="break-all text-text-bright">{email}</p>
			</div>

			<Button
				type="button"
				className="text-error"
				onClick={() => logout.mutate()}
				disabled={logout.isPending}
			>
				{logout.isPending ? "Signing out..." : "SIGN OUT"}
			</Button>
		</section>
	);
}
