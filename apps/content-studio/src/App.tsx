import { Navigate, Route, Routes } from "react-router-dom";
import { StudioLayout } from "./components/StudioLayout";
import { CatalogPage } from "./pages/CatalogPage";
import { DetailPage } from "./pages/DetailPage";
import { EditPage } from "./pages/EditPage";

export default function App() {
	return (
		<Routes>
			<Route element={<StudioLayout />}>
				<Route index element={<Navigate to="/enemies" replace />} />
				<Route path=":category" element={<CatalogPage />} />
				<Route path=":category/:id" element={<DetailPage />} />
				<Route path=":category/:id/edit" element={<EditPage />} />
				<Route path="*" element={<Navigate to="/enemies" replace />} />
			</Route>
		</Routes>
	);
}
