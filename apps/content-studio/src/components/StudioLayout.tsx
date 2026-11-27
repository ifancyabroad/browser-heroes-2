import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { catalogs } from "../content/catalog";

export function StudioLayout() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const category =
		catalogs.find((catalog) => pathname.split("/")[1] === catalog.key)?.key ?? "enemies";
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<div className="studio-shell">
			<a className="skip-link" href="#main-content">
				Skip to content
			</a>
			<header className="studio-header">
				<div>
					<span className="eyebrow">Browser Heroes</span>
					<h1>Content Studio</h1>
				</div>
				<div className="studio-status">
					<span>Local content library</span>
					<span className="read-only">Read only</span>
				</div>
			</header>
			<div className="studio-body">
				<label className="mobile-category-picker">
					<span>Browse</span>
					<select
						aria-label="Content category"
						value={category}
						onChange={(event) => navigate(`/${event.target.value}`)}
					>
						{catalogs.map((catalog) => (
							<option key={catalog.key} value={catalog.key}>
								{catalog.label} ({catalog.entries.length})
							</option>
						))}
					</select>
				</label>
				<nav className="studio-nav" aria-label="Content categories">
					<span className="nav-heading">Browse content</span>
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
				<main id="main-content" tabIndex={-1}>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
