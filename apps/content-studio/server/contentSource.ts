import { createHash, randomUUID } from "node:crypto";
import { readdir, readFile, realpath, rename, stat, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "prettier";
import ts from "typescript";
import {
	achievementSchema,
	classSchema,
	enemySchema,
	featSchema,
	itemAffixSchema,
	itemBaseSchema,
	itemSchema,
	skillSchema,
} from "../../../packages/content/src/schemas/index";
import type { ContentType } from "../../../packages/content/scripts/contentGeneration/types";
import type { Draft, FieldIssue, StudioCategory } from "./types";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
export const contentRoot = resolve(projectRoot, "packages/content/src");
export const imageRoot = resolve(projectRoot, "apps/web/public/assets/images");

type Schema = {
	safeParse(
		value: unknown,
	):
		| { success: true; data: unknown }
		| { success: false; error: { issues: Array<{ path: PropertyKey[]; message: string }> } };
};
type CategoryConfig = {
	contentType: ContentType;
	directory: string;
	builders: readonly string[];
	schema: Schema;
};
export const categoryConfigs: Record<StudioCategory, CategoryConfig> = {
	enemies: {
		contentType: "enemy",
		directory: "enemies",
		builders: ["buildEnemy"],
		schema: enemySchema,
	},
	skills: {
		contentType: "skill",
		directory: "skills",
		builders: ["buildSkill"],
		schema: skillSchema,
	},
	feats: {
		contentType: "feat",
		directory: "feats",
		builders: ["buildFeat"],
		schema: featSchema,
	},
	classes: {
		contentType: "class",
		directory: "classes",
		builders: ["buildClass"],
		schema: classSchema,
	},
	"item-bases": {
		contentType: "itemBase",
		directory: "itemBases",
		builders: ["buildItemBase"],
		schema: itemBaseSchema,
	},
	affixes: {
		contentType: "itemAffix",
		directory: "itemAffixes",
		builders: ["buildItemAffix"],
		schema: itemAffixSchema,
	},
	items: {
		contentType: "item",
		directory: "items",
		builders: ["buildWeapon", "buildArmour"],
		schema: itemSchema,
	},
	achievements: {
		contentType: "achievement",
		directory: "achievements",
		builders: ["buildAchievement"],
		schema: achievementSchema,
	},
};

export type SourceDefinition = {
	file: string;
	source: string;
	draft: Draft;
	normalized: Draft;
	revision: string;
	object: ts.ObjectLiteralExpression;
};

const revisionOf = (source: string) => createHash("sha256").update(source).digest("hex");

export async function discover(category: StudioCategory) {
	const config = categoryConfigs[category];
	const directory = resolve(contentRoot, config.directory);
	const files = await walk(directory);
	const result = new Map<string, string>();
	for (const file of files.filter(
		(candidate) => candidate.endsWith(".ts") && !candidate.endsWith("index.ts"),
	)) {
		try {
			const definition = await parseDefinition(file, config.builders, config.schema);
			if (typeof definition.normalized.id === "string") {
				result.set(definition.normalized.id, file);
			}
		} catch {
			// Unsupported files are reported if addressed, not allowed to break other categories.
		}
	}
	return result;
}

export async function loadDefinition(category: StudioCategory, id: string) {
	const files = await discover(category);
	const file = files.get(id);
	if (!file) {
		return undefined;
	}
	return parseDefinition(
		file,
		categoryConfigs[category].builders,
		categoryConfigs[category].schema,
	);
}

export async function parseDefinition(
	file: string,
	builders: readonly string[],
	schema: Schema,
): Promise<SourceDefinition> {
	assertWithin(contentRoot, file);
	assertWithin(await realpath(contentRoot), await realpath(file));
	const source = await readFile(file, "utf8");
	const sourceFile = ts.createSourceFile(
		file,
		source,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TS,
	);
	let object: ts.ObjectLiteralExpression | undefined;
	for (const statement of sourceFile.statements) {
		if (!ts.isExportAssignment(statement) || !ts.isCallExpression(statement.expression)) {
			continue;
		}
		const call = statement.expression;
		if (
			!ts.isIdentifier(call.expression) ||
			!builders.includes(call.expression.text) ||
			call.arguments.length !== 1
		) {
			continue;
		}
		if (ts.isObjectLiteralExpression(call.arguments[0])) {
			object = call.arguments[0];
		}
	}
	if (!object) {
		throw new Error(`Expected an approved default builder call`);
	}
	const draft = literalToValue(object) as Draft;
	const parsed = schema.safeParse(draft);
	if (!parsed.success) {
		throw new ValidationFailure(parsed.error.issues.map(issueToField));
	}
	return {
		file,
		source,
		draft,
		normalized: parsed.data as Draft,
		revision: revisionOf(source),
		object,
	};
}

export async function saveDefinition(
	category: StudioCategory,
	id: string,
	expectedRevision: string,
	draft: Draft,
) {
	const current = await loadDefinition(category, id);
	if (!current) {
		throw new NotFoundFailure();
	}
	if (current.revision !== expectedRevision) {
		throw new ConflictFailure();
	}
	if (draft.id !== id) {
		throw new ValidationFailure([{ path: "id", message: "ID cannot be changed" }]);
	}
	const schema = categoryConfigs[category].schema;
	const parsed = schema.safeParse(draft);
	if (!parsed.success) {
		throw new ValidationFailure(parsed.error.issues.map(issueToField));
	}
	const normalized = parsed.data as Draft;
	const changedFields = Object.keys({ ...current.normalized, ...normalized }).filter(
		(key) => JSON.stringify(current.normalized[key]) !== JSON.stringify(normalized[key]),
	);
	if (changedFields.length === 0) {
		return { ...current, changedFields };
	}

	const authored = { ...current.draft };
	for (const key of changedFields) {
		if (normalized[key] === undefined) {
			delete authored[key];
		} else {
			authored[key] = normalized[key];
		}
	}
	const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
	const replacement = printer.printNode(
		ts.EmitHint.Expression,
		valueToLiteral(authored),
		ts.createSourceFile("draft.ts", "", ts.ScriptTarget.Latest),
	);
	const proposed = await format(
		current.source.slice(0, current.object.getStart()) +
			replacement +
			current.source.slice(current.object.end),
		{ parser: "typescript", useTabs: true, printWidth: 100 },
	);
	const temporary = `${current.file}.studio-${process.pid}-${randomUUID()}.tmp`;
	await writeFile(temporary, proposed, { encoding: "utf8", flag: "wx" });
	try {
		await parseDefinition(temporary, categoryConfigs[category].builders, schema);
		const latest = await readFile(current.file, "utf8");
		if (revisionOf(latest) !== expectedRevision) {
			throw new ConflictFailure();
		}
		await rename(temporary, current.file);
	} catch (error) {
		await import("node:fs/promises").then(({ unlink }) =>
			unlink(temporary).catch(() => undefined),
		);
		throw error;
	}
	const saved = await parseDefinition(current.file, categoryConfigs[category].builders, schema);
	return { ...saved, changedFields };
}

export async function listAssets() {
	return (await walk(imageRoot))
		.filter((file) => /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
		.map((file) => relative(imageRoot, file).split(sep).join("/"))
		.sort();
}

export async function assetExists(path: string) {
	const file = resolve(imageRoot, path);
	assertWithin(imageRoot, file);
	return Promise.all([realpath(imageRoot), realpath(file), stat(file)])
		.then(([root, actual, value]) => {
			assertWithin(root, actual);
			return value.isFile();
		})
		.catch(() => false);
}

async function walk(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map((entry) => {
			const path = resolve(directory, entry.name);
			if (entry.isSymbolicLink()) {
				return [];
			}
			return entry.isDirectory() ? walk(path) : [path];
		}),
	);
	return nested.flat();
}

function assertWithin(root: string, file: string) {
	const path = relative(root, file);
	if (path.startsWith("..") || resolve(root, path) !== resolve(file)) {
		throw new Error("Path is outside the allowed root");
	}
}

export function literalToValue(node: ts.Expression): unknown {
	if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
		return node.text;
	}
	if (ts.isNumericLiteral(node)) {
		return Number(node.text);
	}
	if (node.kind === ts.SyntaxKind.TrueKeyword) {
		return true;
	}
	if (node.kind === ts.SyntaxKind.FalseKeyword) {
		return false;
	}
	if (node.kind === ts.SyntaxKind.NullKeyword) {
		return null;
	}
	if (
		ts.isPrefixUnaryExpression(node) &&
		node.operator === ts.SyntaxKind.MinusToken &&
		ts.isNumericLiteral(node.operand)
	) {
		return -Number(node.operand.text);
	}
	if (ts.isArrayLiteralExpression(node)) {
		return node.elements.map((item) => literalToValue(item as ts.Expression));
	}
	if (ts.isObjectLiteralExpression(node)) {
		const value: Draft = {};
		for (const property of node.properties) {
			if (
				!ts.isPropertyAssignment(property) ||
				(!ts.isIdentifier(property.name) && !ts.isStringLiteral(property.name))
			) {
				throw new Error("Only literal properties are supported");
			}
			value[property.name.text] = literalToValue(property.initializer);
		}
		return value;
	}
	throw new Error(`Unsupported authored expression: ${ts.SyntaxKind[node.kind]}`);
}

export function valueToLiteral(value: unknown): ts.Expression {
	if (typeof value === "string") {
		return ts.factory.createStringLiteral(value);
	}
	if (typeof value === "number") {
		return value < 0
			? ts.factory.createPrefixUnaryExpression(
					ts.SyntaxKind.MinusToken,
					ts.factory.createNumericLiteral(-value),
				)
			: ts.factory.createNumericLiteral(value);
	}
	if (typeof value === "boolean") {
		return value ? ts.factory.createTrue() : ts.factory.createFalse();
	}
	if (value === null) {
		return ts.factory.createNull();
	}
	if (Array.isArray(value)) {
		return ts.factory.createArrayLiteralExpression(value.map(valueToLiteral), true);
	}
	if (typeof value === "object") {
		return ts.factory.createObjectLiteralExpression(
			Object.entries(value as Draft)
				.filter(([, item]) => item !== undefined)
				.map(([key, item]) =>
					ts.factory.createPropertyAssignment(
						ts.factory.createIdentifier(key),
						valueToLiteral(item),
					),
				),
			true,
		);
	}
	throw new Error(`Cannot write ${typeof value}`);
}

const issueToField = (issue: { path: PropertyKey[]; message: string }): FieldIssue => ({
	path: issue.path.join("."),
	message: issue.message,
});
export class ValidationFailure extends Error {
	issues: FieldIssue[];
	constructor(issues: FieldIssue[]) {
		super("Content validation failed");
		this.issues = issues;
	}
}
export class ConflictFailure extends Error {
	constructor() {
		super("The source changed since it was loaded");
	}
}
export class NotFoundFailure extends Error {
	constructor() {
		super("Content definition not found");
	}
}
