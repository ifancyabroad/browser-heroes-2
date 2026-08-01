import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
	achievementSchema,
	classSchema,
	enemySchema,
	featSchema,
	itemAffixSchema,
	itemBaseSchema,
	itemSchema,
	skillSchema,
} from "@app/content";
import { catalogByKey, isCategoryKey, type CategoryKey } from "../content/catalog";
import {
	loadContentDraft,
	saveContentDraft,
	StudioApiError,
	type ContentResponse,
	type Draft,
	type FieldIssue,
} from "../editor/api";
import { StructuredEditor } from "../editor/StructuredEditor";

const schemas = {
	enemies: enemySchema,
	skills: skillSchema,
	feats: featSchema,
	classes: classSchema,
	"item-bases": itemBaseSchema,
	affixes: itemAffixSchema,
	items: itemSchema,
	achievements: achievementSchema,
} as const;

export function EditPage() {
	const { category, id } = useParams();
	if (!isCategoryKey(category) || !id) {
		return <Navigate to="/enemies" replace />;
	}
	return <Editor category={category} id={id} />;
}

function Editor({ category, id }: { category: CategoryKey; id: string }) {
	const navigate = useNavigate();
	const [baseline, setBaseline] = useState<ContentResponse>();
	const [draft, setDraft] = useState<Draft>();
	const [issues, setIssues] = useState<FieldIssue[]>([]);
	const [message, setMessage] = useState<string>();
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<StudioApiError>();
	const dirty = useMemo(
		() =>
			baseline && draft ? JSON.stringify(baseline.draft) !== JSON.stringify(draft) : false,
		[baseline, draft],
	);
	useEffect(() => {
		void reload();
	}, [category, id]);
	useEffect(() => {
		const unload = (event: BeforeUnloadEvent) => {
			if (dirty) {
				event.preventDefault();
			}
		};
		const click = (event: MouseEvent) => {
			const anchor = event.target instanceof Element ? event.target.closest("a") : null;
			if (dirty && anchor && !window.confirm("Discard your unsaved changes?")) {
				event.preventDefault();
				event.stopPropagation();
			}
		};
		window.addEventListener("beforeunload", unload);
		document.addEventListener("click", click, true);
		return () => {
			window.removeEventListener("beforeunload", unload);
			document.removeEventListener("click", click, true);
		};
	}, [dirty]);

	if (!baseline || !draft) {
		return <div className="empty">{error ? error.message : "Loading editor…"}</div>;
	}
	const catalog = catalogByKey[category];
	return (
		<article className="editor-page">
			<Link className="back-link" to={`/${category}/${id}`}>
				← Back to details
			</Link>
			<div className="editor-heading">
				<div>
					<span className="eyebrow">Edit {catalog.singular}</span>
					<h2>{String(draft.name)}</h2>
					<code>{id}</code>
				</div>
				<div className="editor-actions">
					<button
						type="button"
						onClick={() => {
							if (!dirty || window.confirm("Discard your unsaved changes?")) {
								navigate(`/${category}/${id}`);
							}
						}}
					>
						Cancel
					</button>
					<button
						className="primary"
						type="button"
						disabled={!dirty || saving}
						onClick={() => void save()}
					>
						{saving ? "Saving…" : "Save"}
					</button>
				</div>
			</div>
			{message && <div className="notice success">{message}</div>}
			{error && (
				<div className="notice error">
					<strong>{error.message}</strong>
					{error.code === "conflict" && (
						<button type="button" onClick={() => void reload()}>
							Reload source
						</button>
					)}
				</div>
			)}
			{issues.length > 0 && (
				<div className="notice error">
					<strong>
						Please fix {issues.length} validation{" "}
						{issues.length === 1 ? "issue" : "issues"}.
					</strong>
					<ul>
						{issues.map((issue, index) => (
							<li key={`${issue.path}-${index}`}>
								<code>{issue.path || "definition"}</code> {issue.message}
							</li>
						))}
					</ul>
				</div>
			)}
			<form
				className="editor-form"
				onSubmit={(event) => {
					event.preventDefault();
					void save();
				}}
			>
				<StructuredEditor
					category={category}
					field="definition"
					path=""
					value={draft}
					issues={issues}
					onChange={(next) => {
						setDraft(next as Draft);
						setMessage(undefined);
						setError(undefined);
					}}
				/>
			</form>
			<div className="editor-footer">
				<span>{dirty ? "Unsaved changes" : "All changes saved"}</span>
				<button
					className="primary"
					type="button"
					disabled={!dirty || saving}
					onClick={() => void save()}
				>
					Save
				</button>
			</div>
		</article>
	);

	async function reload() {
		try {
			const loaded = await loadContentDraft(category, id);
			setBaseline(loaded);
			setDraft(loaded.draft);
			setIssues([]);
			setError(undefined);
			setMessage(undefined);
		} catch (caught) {
			setError(asApiError(caught));
		}
	}
	async function save() {
		if (!draft || !baseline) {
			return;
		}
		const parsed = schemas[category].safeParse(draft);
		if (!parsed.success) {
			setIssues(
				parsed.error.issues.map((issue) => ({
					path: issue.path.join("."),
					message: issue.message,
				})),
			);
			return;
		}
		setSaving(true);
		setIssues([]);
		setError(undefined);
		setMessage(undefined);
		try {
			const saved = await saveContentDraft(category, id, baseline.revision, draft);
			setBaseline(saved);
			setDraft(saved.draft);
			setMessage(
				saved.changedFields?.length
					? `Saved ${saved.file}. Changed: ${saved.changedFields.join(", ")}.`
					: `No changes needed in ${saved.file}.`,
			);
		} catch (caught) {
			const apiError = asApiError(caught);
			setError(apiError);
			setIssues(apiError.issues);
		} finally {
			setSaving(false);
		}
	}
}
const asApiError = (value: unknown) =>
	value instanceof StudioApiError
		? value
		: new StudioApiError(
				"writeFailed",
				value instanceof Error ? value.message : "Request failed",
			);
