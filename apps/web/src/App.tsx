import { Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import CreateCharacter from "./pages/CreateCharacter";
import Leaderboard from "./pages/Leaderboard";
import Stats from "./pages/Stats";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
	return (
		<Routes>
			<Route index element={<Landing />} />
			<Route path="/create-character" element={<CreateCharacter />} />
			<Route path="/game" element={<Game />} />
			<Route path="/leaderboard" element={<Leaderboard />} />
			<Route path="/stats" element={<Stats />} />
			<Route path="/account" element={<Account />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
