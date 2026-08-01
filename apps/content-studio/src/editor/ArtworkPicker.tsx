import { useEffect, useMemo, useState } from "react";
import { ContentImage } from "../components/ContentImage";
import { loadAssets, type Asset } from "./api";

export function ArtworkPicker({
	onChoose,
	onClose,
}: {
	onChoose(path: string): void;
	onClose(): void;
}) {
	const [assets, setAssets] = useState<Asset[]>([]);
	const [search, setSearch] = useState("");
	const [folder, setFolder] = useState("");
	const [error, setError] = useState<string>();
	useEffect(() => {
		let active = true;
		void loadAssets()
			.then((value) => {
				if (active) {
					setAssets(value.assets);
				}
			})
			.catch((caught: unknown) => {
				if (active) {
					setError(
						caught instanceof Error ? caught.message : "Artwork could not be loaded",
					);
				}
			});
		return () => {
			active = false;
		};
	}, []);
	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [onClose]);
	const folders = useMemo(() => [...new Set(assets.map((asset) => asset.folder))], [assets]);
	const visible = assets.filter(
		(asset) =>
			(!folder || asset.folder === folder) &&
			asset.path.toLowerCase().includes(search.toLowerCase()),
	);
	return (
		<div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
			<section
				className="asset-modal"
				role="dialog"
				aria-modal="true"
				aria-label="Choose artwork"
				onMouseDown={(event) => event.stopPropagation()}
			>
				<div className="asset-header">
					<h2>Choose artwork</h2>
					<button type="button" onClick={onClose}>
						Close
					</button>
				</div>
				<div className="asset-filters">
					<input
						aria-label="Search artwork"
						placeholder="Search paths"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
					<select
						aria-label="Artwork folder"
						value={folder}
						onChange={(event) => setFolder(event.target.value)}
					>
						<option value="">All folders</option>
						{folders.map((value) => (
							<option key={value}>{value}</option>
						))}
					</select>
				</div>
				<div className="asset-grid">
					{error && <p className="asset-error">{error}</p>}
					{!error && assets.length === 0 && <p className="muted">Loading artwork…</p>}
					{visible.map((asset) => (
						<button type="button" key={asset.path} onClick={() => onChoose(asset.path)}>
							<ContentImage path={asset.path} label={asset.path} size="card" />
							<span>{asset.path}</span>
						</button>
					))}
				</div>
			</section>
		</div>
	);
}
