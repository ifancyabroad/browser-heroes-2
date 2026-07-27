import { useState } from "react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { useCurrentUser, useLogout } from "../features/auth";
import { LoginModal } from "../features/auth/components/LoginModal";
import { RegisterModal } from "../features/auth/components/RegisterModal";

type AccountDialog = "register" | "login" | null;

type GuestAccountProps = {
	onRegister: () => void;
	onLogin: () => void;
};

type RegisteredAccountProps = {
	displayName: string;
	email: string;
};

export default function Account() {
	const { data } = useCurrentUser();
	const user = data?.user ?? null;
	const [dialog, setDialog] = useState<AccountDialog>(null);

	function closeDialogs() {
		setDialog(null);
	}

	return (
		<Layout>
			<Header />

			<div className="flex flex-1 items-center justify-center bg-bg-base p-4">
				{user?.type === "registered" ? (
					<RegisteredAccount
						displayName={user.displayName ?? ""}
						email={user.email ?? ""}
					/>
				) : (
					<GuestAccount
						onRegister={() => setDialog("register")}
						onLogin={() => setDialog("login")}
					/>
				)}
			</div>

			<RegisterModal open={dialog === "register"} onClose={closeDialogs} />

			<LoginModal open={dialog === "login"} onClose={closeDialogs} onSuccess={closeDialogs} />
		</Layout>
	);
}

function GuestAccount({ onRegister, onLogin }: GuestAccountProps) {
	return (
		<section className="grid w-full max-w-md gap-4 border-2 border-border bg-bg-panel p-4">
			<h1 className="text-primary">ACCOUNT</h1>

			<p>Create an account to keep your heroes available across browsers and devices.</p>

			<div className="flex flex-wrap gap-3">
				<Button type="button" variant="primary" onClick={onRegister}>
					CREATE ACCOUNT
				</Button>

				<Button type="button" onClick={onLogin}>
					SIGN IN
				</Button>
			</div>
		</section>
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
