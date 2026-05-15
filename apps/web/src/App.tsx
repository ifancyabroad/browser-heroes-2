import { Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

export default function App() {
	return (
		<Routes>
			<Route index element={<Landing />} />
			<Route path="/game" element={<Game />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
