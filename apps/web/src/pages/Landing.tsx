import { Card } from "../components/Card";
import logo from "../assets/images/logos/browser_heroes.png";
import { useCurrentUser } from "../features/auth";
import { Link } from "../components/Link";

export default function Landing() {
	const { data } = useCurrentUser();

	console.log("currentUser", data?.user);

	return (
		<div className="min-h-screen flex flex-col overflow-hidden">
			{/* TODO: Add header */}

			<div className="flex-1 flex items-center justify-center">
				<div className="max-w-sm w-full">
					<Card className="text-center flex flex-col items-center gap-4 p-4">
						<img src={logo} alt="Browser Heroes" width="260" />
						<p>Your new adventure awaits you!</p>
						<div className="flex justify-center gap-4">
							<Link className="text-primary" to="/create-character">
								PLAY NOW
							</Link>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
