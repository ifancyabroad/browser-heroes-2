import { Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import CreateCharacter from "./pages/CreateCharacter";
import DailyChallenge from "./pages/DailyChallenge";
import History from "./pages/History";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import Progress from "./pages/Progress";
import HallOfFame from "./pages/HallOfFame";
import { PrivateRoute } from "./features/auth";

export default function App() {
	return (
		<Routes>
			<Route index element={<Landing />} />
			<Route path="/create-character" element={<CreateCharacter />} />
			<Route path="/game" element={<Game />} />
			<Route path="/daily-challenge" element={<DailyChallenge />} />
			<Route path="/hall-of-fame" element={<HallOfFame />} />
			<Route path="/history" element={<History />} />
			<Route path="/progress" element={<Progress />} />
			<Route path="/contact" element={<Contact />} />
			<Route element={<PrivateRoute />}>
				<Route path="/account" element={<Account />} />
			</Route>
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
