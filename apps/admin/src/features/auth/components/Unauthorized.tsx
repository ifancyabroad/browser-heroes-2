import { useLogout } from "../hooks/useLogout";

export function Unauthorized() {
	const logout = useLogout();
	return (
		<main className="auth-screen">
			<section className="auth-card">
				<p className="eyebrow">Access restricted</p>
				<h1>Not authorized</h1>
				<p className="muted">This account does not have access to the metrics console.</p>
				<button
					className="primary"
					onClick={() => logout.mutate()}
					disabled={logout.isPending}
				>
					Sign out
				</button>
			</section>
		</main>
	);
}
