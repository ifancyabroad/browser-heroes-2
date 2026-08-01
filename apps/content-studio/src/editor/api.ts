import type { CategoryKey } from "../content/catalog";

export type Draft = Record<string, unknown>;
export type FieldIssue = { path: string; message: string };
export type ContentResponse = {
	category: CategoryKey;
	id: string;
	draft: Draft;
	revision: string;
	file: string;
	changedFields?: string[];
};
export type Asset = { path: string; folder: string };
export class StudioApiError extends Error {
	code: string;
	issues: FieldIssue[];
	constructor(code: string, message: string, issues: FieldIssue[] = []) {
		super(message);
		this.code = code;
		this.issues = issues;
	}
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(`/__studio/api${path}`, init);
	const value = (await response.json()) as T & {
		error?: { code: string; message: string; issues?: FieldIssue[] };
	};
	if (!response.ok || value.error) {
		throw new StudioApiError(
			value.error?.code ?? "writeFailed",
			value.error?.message ?? "Request failed",
			value.error?.issues,
		);
	}
	return value;
}

export const loadContentDraft = (category: CategoryKey, id: string) =>
	request<ContentResponse>(`/content/${encodeURIComponent(category)}/${encodeURIComponent(id)}`);
export const saveContentDraft = (
	category: CategoryKey,
	id: string,
	revision: string,
	draft: Draft,
) =>
	request<ContentResponse>(`/content/${encodeURIComponent(category)}/${encodeURIComponent(id)}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ revision, draft }),
	});
export const loadAssets = () => request<{ assets: Asset[] }>("/assets");
