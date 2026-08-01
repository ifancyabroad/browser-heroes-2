import { NavLink, Outlet } from "react-router-dom";
import { catalogs } from "../content/catalog";

export function StudioLayout() {
	return (
		<div className="studio-shell">
			<header className="studio-header">
				<div>
					<span className="eyebrow">Browser Heroes 2</span>
					<h1>Content Studio</h1>
				</div>
				<span className="read-only">Local studio</span>
			</header>
			<div className="studio-body">
				<nav className="studio-nav" aria-label="Content categories">
					{catalogs.map((catalog) => (
						<NavLink
							key={catalog.key}
							to={`/${catalog.key}`}
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							<span>{catalog.label}</span>
							<small>{catalog.entries.length}</small>
						</NavLink>
					))}
				</nav>
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
