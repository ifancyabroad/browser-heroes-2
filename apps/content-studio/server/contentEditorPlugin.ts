import type { IncomingMessage, ServerResponse } from "node:http";
import { relative, resolve, sep } from "node:path";
import type { Plugin } from "vite";
import { contentSpecs } from "../../../packages/content/scripts/contentGeneration/specs";
import type {
	ContentType,
	ReferencePath,
} from "../../../packages/content/scripts/contentGeneration/types";
import {
	assetExists,
	categoryConfigs,
	contentRoot,
	discover,
	listAssets,
	loadDefinition,
	saveDefinition,
	ConflictFailure,
	NotFoundFailure,
	ValidationFailure,
} from "./contentSource";
import type { ApiErrorCode, Draft, StudioCategory } from "./types";

const apiPrefix = "/__studio/api";
const maxBody = 1024 * 1024;

export function contentEditorPlugin(): Plugin {
	return {
		name: "content-studio-editor",
		apply: "serve",
		configureServer(server) {
			server.middlewares.use(apiPrefix, async (request, response) => {
				try {
					await handle(request, response);
				} catch (error) {
					writeFailure(response, error);
				}
			});
		},
	};
}

async function handle(request: IncomingMessage, response: ServerResponse) {
	const host = request.headers.host ?? "";
	if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) {
		return json(response, 403, failure("writeFailed", "Studio API is loopback-only"));
	}
	const origin = request.headers.origin;
	if (origin) {
		try {
			if (new URL(origin).host !== host) {
				return json(response, 403, failure("writeFailed", "Origin is not allowed"));
			}
		} catch {
			return json(response, 403, failure("writeFailed", "Origin is not allowed"));
		}
	}
	const path = new URL(request.url ?? "/", `http://${host}`).pathname.split("/").filter(Boolean);
	if (path.length === 1 && path[0] === "assets" && request.method === "GET") {
		const paths = await listAssets();
		return json(response, 200, {
			assets: paths.map((assetPath) => ({
				path: assetPath,
				folder: assetPath.includes("/")
					? assetPath.slice(0, assetPath.lastIndexOf("/"))
					: "",
			})),
		});
	}
	if (path.length !== 3 || path[0] !== "content") {
		return json(response, 404, failure("notFound", "Endpoint not found"));
	}
	let category: StudioCategory;
	let id: string;
	try {
		category = decodeURIComponent(path[1]) as StudioCategory;
		id = decodeURIComponent(path[2]);
	} catch {
		return json(response, 400, failure("notFound", "Malformed content path"));
	}
	if (!(category in categoryConfigs)) {
		return json(response, 404, failure("notFound", "Unknown category"));
	}
	if (request.method === "GET") {
		const definition = await loadDefinition(category, id);
		if (!definition) {
			throw new NotFoundFailure();
		}
		return json(response, 200, payload(definition, category));
	}
	if (request.method !== "PUT") {
		return json(response, 405, failure("writeFailed", "Method not allowed"));
	}
	const body = (await readBody(request)) as { revision?: unknown; draft?: unknown };
	if (
		typeof body.revision !== "string" ||
		typeof body.draft !== "object" ||
		body.draft === null ||
		Array.isArray(body.draft)
	) {
		throw new ValidationFailure([{ path: "", message: "Expected revision and draft" }]);
	}
	await validateReferences(category, body.draft as Draft);
	await validateArtwork(category, id, body.draft as Draft);
	const saved = await saveDefinition(category, id, body.revision, body.draft as Draft);
	return json(response, 200, { ...payload(saved, category), changedFields: saved.changedFields });
}

function payload(
	definition: Awaited<ReturnType<typeof loadDefinition>> & {},
	category: StudioCategory,
) {
	return {
		category,
		id: definition.normalized.id,
		draft: definition.normalized,
		revision: definition.revision,
		file: relative(resolve(contentRoot, ".."), definition.file).split(sep).join("/"),
	};
}

async function validateReferences(category: StudioCategory, draft: Draft) {
	const checks: Array<[string, StudioCategory, unknown]> = [];
	const spec = contentSpecs.find(
		(candidate) => candidate.type === categoryConfigs[category].contentType,
	);
	for (const rule of spec?.referenceRules ?? []) {
		const target = categoryByContentType[rule.targetType];
		for (const [path, id] of readReferenceValues(draft, rule.path)) {
			checks.push([path, target, id]);
		}
	}
	const issues = [];
	const idsByCategory = new Map<StudioCategory, ReadonlySet<string>>();
	for (const target of new Set(checks.map(([, target]) => target))) {
		idsByCategory.set(target, new Set((await discover(target)).keys()));
	}
	for (const [path, target, id] of checks) {
		if (typeof id !== "string" || !idsByCategory.get(target)?.has(id)) {
			issues.push({ path, message: `References missing ${target} ID ${JSON.stringify(id)}` });
		}
	}
	if (issues.length) {
		const error = new ValidationFailure(issues);
		error.name = "invalidReference";
		throw error;
	}
}

const categoryByContentType: Record<ContentType, StudioCategory> = {
	skill: "skills",
	enemy: "enemies",
	item: "items",
	itemBase: "item-bases",
	itemAffix: "affixes",
	class: "classes",
	feat: "feats",
	achievement: "achievements",
};

function readReferenceValues(draft: Draft, path: ReferencePath): Array<[string, unknown]> {
	const combat = draft.combat as Draft | undefined;
	switch (path) {
		case "combat.skillIds[]":
			return Array.isArray(combat?.skillIds)
				? combat.skillIds.map((id, index) => [`combat.skillIds.${index}`, id])
				: [];
		case "combat.featIds[]":
			return Array.isArray(combat?.featIds)
				? combat.featIds.map((id, index) => [`combat.featIds.${index}`, id])
				: [];
		case "restrictedToClassIds[]":
			return Array.isArray(draft.restrictedToClassIds)
				? draft.restrictedToClassIds.map((id, index) => [
						`restrictedToClassIds.${index}`,
						id,
					])
				: [];
		case "startingEquipment.*":
			return typeof draft.startingEquipment === "object" &&
				draft.startingEquipment !== null &&
				!Array.isArray(draft.startingEquipment)
				? Object.entries(draft.startingEquipment as Draft)
						.filter(([, id]) => id !== undefined)
						.map(([slot, id]) => [`startingEquipment.${slot}`, id])
				: [];
	}
}

async function validateArtwork(category: StudioCategory, id: string, draft: Draft) {
	const current = await loadDefinition(category, id);
	const fields = ["icon", "portrait", "enemyPortrait"];
	const issues = [];
	for (const field of fields) {
		if (
			typeof draft[field] === "string" &&
			draft[field] !== current?.normalized[field] &&
			!(await assetExists(draft[field] as string))
		) {
			issues.push({ path: field, message: "Artwork file does not exist" });
		}
	}
	if (
		Array.isArray(draft.iconPool) &&
		JSON.stringify(draft.iconPool) !== JSON.stringify(current?.normalized.iconPool)
	) {
		for (const [index, path] of draft.iconPool.entries()) {
			if (typeof path !== "string" || !(await assetExists(path))) {
				issues.push({ path: `iconPool.${index}`, message: "Artwork file does not exist" });
			}
		}
	}
	if (issues.length) {
		const error = new ValidationFailure(issues);
		error.name = "invalidAsset";
		throw error;
	}
}

async function readBody(request: IncomingMessage) {
	let body = "";
	let size = 0;
	for await (const chunk of request) {
		size += typeof chunk === "string" ? Buffer.byteLength(chunk) : chunk.length;
		if (size > maxBody) {
			throw new ValidationFailure([{ path: "", message: "Request is too large" }]);
		}
		body += chunk;
	}
	try {
		return JSON.parse(body);
	} catch {
		throw new ValidationFailure([{ path: "", message: "Invalid JSON" }]);
	}
}

function writeFailure(response: ServerResponse, error: unknown) {
	if (error instanceof NotFoundFailure) {
		return json(response, 404, failure("notFound", error.message));
	}
	if (error instanceof ConflictFailure) {
		return json(response, 409, failure("conflict", error.message));
	}
	if (error instanceof ValidationFailure) {
		return json(response, 400, {
			error: {
				code:
					error.name === "invalidReference"
						? "invalidReference"
						: error.name === "invalidAsset"
							? "invalidAsset"
							: "validation",
				message: error.message,
				issues: error.issues,
			},
		});
	}
	return json(
		response,
		500,
		failure("writeFailed", error instanceof Error ? error.message : "Save failed"),
	);
}
const failure = (code: ApiErrorCode, message: string) => ({ error: { code, message } });
function json(response: ServerResponse, status: number, value: unknown) {
	response.statusCode = status;
	response.setHeader("Content-Type", "application/json");
	response.setHeader("Cache-Control", "no-store");
	response.end(JSON.stringify(value));
}
