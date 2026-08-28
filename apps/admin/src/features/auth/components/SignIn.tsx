import { useState, type FormEvent } from "react";
import { useLogin } from "../hooks/useLogin";

export function SignIn() {
	const login = useLogin();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function submit(event: FormEvent) {
		event.preventDefault();
		login.mutate({ email, password });
	}

	return (
		<main className="auth-screen">
			<section className="auth-card">
				<div className="brand-mark">BH</div>
				<p className="eyebrow">Browser Heroes</p>
				<h1>Metrics console</h1>
				<p className="muted">Sign in with the configured administrator account.</p>
				<form onSubmit={submit}>
					<label>
						<span>Email</span>
						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</label>
					<label>
						<span>Password</span>
						<input
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
					</label>
					{login.isError ? (
						<p className="form-error">Unable to sign in with those credentials.</p>
					) : null}
					<button className="primary" disabled={login.isPending}>
						{login.isPending ? "Signing in…" : "Sign in"}
					</button>
				</form>
			</section>
		</main>
	);
}
