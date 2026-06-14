import { Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import CreateCharacter from "./pages/CreateCharacter";

export default function App() {
	return (
		<Routes>
			<Route index element={<Landing />} />
			<Route path="/create-character" element={<CreateCharacter />} />
			<Route path="/game" element={<Game />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
