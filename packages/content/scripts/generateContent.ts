import { readdirSync, writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src");
const OUT_DIR = join(SRC, "generated");

type Collected = { id: string; file: string; importName: string }[];

function walk(dir: string): string[] {
	if (!existsSync(dir)) return [];
	const entries = readdirSync(dir, { withFileTypes: true });
	const files: string[] = [];
	for (const e of entries) {
		const full = join(dir, e.name);
		if (e.isDirectory()) files.push(...walk(full));
		else if (
			e.isFile() &&
			e.name.endsWith(".ts") &&
			!e.name.endsWith(".d.ts") &&
			e.name !== "index.ts"
		)
			files.push(full);
	}
	return files;
}

function writeFileIfChanged(path: string, content: string) {
	if (existsSync(path) && readFileSync(path, "utf-8") === content) {
		return;
	}

	writeFileSync(path, content, "utf-8");
	console.log(`Wrote ${path}`);
}

function toImportPath(from: string, to: string) {
	let rel = relative(dirname(from), to);
	if (!rel.startsWith(".")) rel = `./${rel}`;
	return rel.split(sep).join("/").replace(/\.ts$/, "");
}

function sanitizeName(base: string) {
	return base.replace(/[^A-Za-z0-9_$]/g, "_");
}

function collectType(dir: string, prefix: string): Collected {
	const files = walk(dir).sort((a, b) => a.localeCompare(b, "en"));
	const collected: Collected = [];
	let idx = 0;
	for (const f of files) {
		const name = sanitizeName(f.replace(/.*[\\/]/, "").replace(/\.ts$/, ""));
		const importName = `${prefix}_${name}_${idx++}`;
		collected.push({ id: "", file: f, importName });
	}
	return collected;
}

function generateFor(type: string, dir: string, typeDefImportPath: string) {
	const plural = pluralize(type);
	const collected = collectType(dir, type.slice(0, 3));
	const idsFile = join(OUT_DIR, `${type}Ids.ts`);
	const registryFile = join(OUT_DIR, `${plural}.registry.ts`);

	const idValues: string[] = [];
	for (const c of collected) {
		const source = readFileSync(c.file, "utf-8");
		const match = source.match(/\bid\s*:\s*["']([^"']+)["']/);
		if (!match) {
			console.error(`No id found in ${c.file}`);
			process.exitCode = 1;
			return;
		}
		c.id = match[1];
		idValues.push(match[1]);
	}

	const dup = idValues.filter((v, i, a) => a.indexOf(v) !== i);
	if (dup.length) {
		console.error(`Duplicate ids found for ${type}:`, [...new Set(dup)]);
		process.exitCode = 1;
		return;
	}

	collected.sort((a, b) => a.id.localeCompare(b.id, "en"));

	const sortedImportLines = collected.map(
		(c) => `import ${c.importName} from '${toImportPath(registryFile, c.file)}';`,
	);
	const typeName = capitalize(type);
	const idsArrayText = [
		'import { z } from "zod";',
		"",
		`export const ${type}Ids = ${JSON.stringify(collected.map((c) => c.id))} as const;`,
		`export const ${type}IdSchema = z.enum(${type}Ids);`,
		`export type ${typeName}Id = z.infer<typeof ${type}IdSchema>;`,
	].join("\n");

	const registryLines = [
		"// Generated — do not edit by hand",
		"",
		`import type { ${typeName}Definition } from '${typeDefImportPath}';`,
		`import type { ${typeName}Id } from './${type}Ids';`,
		`import { ${type}IdSchema, ${type}Ids } from './${type}Ids';`,
		"",
		...sortedImportLines,
		"",
		`export { ${type}IdSchema, ${type}Ids };`,
		`export type { ${typeName}Id } from './${type}Ids';`,
		"",
		`export const ${plural}: readonly ${typeName}Definition[] = [${collected.map((c) => c.importName).join(", ")}];`,
		"",
		`export const ${plural.toUpperCase()}_BY_ID: Record<${typeName}Id, ${typeName}Definition> = {`,
		...collected.map((c) => `  ${JSON.stringify(c.id)}: ${c.importName},`),
		`};`,
	];

	writeFileIfChanged(idsFile, `// Generated — do not edit by hand\n\n${idsArrayText}\n`);
	writeFileIfChanged(registryFile, registryLines.join("\n"));
}

function capitalize(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

function pluralize(type: string) {
	switch (type) {
		case "class":
			return "classes";
		case "enemy":
			return "enemies";
		default:
			return `${type}s`;
	}
}

function run() {
	const skillsDir = join(SRC, "skills");
	const enemiesDir = join(SRC, "enemies");
	const itemsDir = join(SRC, "items");
	const classesDir = join(SRC, "classes");
	const featsDir = join(SRC, "feats");

	mkdirSync(OUT_DIR, { recursive: true });

	generateFor("skill", skillsDir, "../schemas");
	generateFor("enemy", enemiesDir, "../schemas");
	generateFor("item", itemsDir, "../schemas");
	generateFor("class", classesDir, "../schemas");
	generateFor("feat", featsDir, "../schemas");

	const manifests = [
		"// Generated — do not edit by hand",
		"",
		"import { skillIdSchema, skillIds } from './skillIds';",
		"import { enemyIdSchema, enemyIds } from './enemyIds';",
		"import { itemIdSchema, itemIds } from './itemIds';",
		"import { classIdSchema, classIds } from './classIds';",
		"import { featIdSchema, featIds } from './featIds';",
		"",
		"export const SKILL_IDS = skillIds;",
		"export const ENEMY_IDS = enemyIds;",
		"export const ITEM_IDS = itemIds;",
		"export const CLASS_IDS = classIds;",
		"export const FEAT_IDS = featIds;",
		"",
		"export const SKILL_ID_SCHEMA = skillIdSchema;",
		"export const ENEMY_ID_SCHEMA = enemyIdSchema;",
		"export const ITEM_ID_SCHEMA = itemIdSchema;",
		"export const CLASS_ID_SCHEMA = classIdSchema;",
		"export const FEAT_ID_SCHEMA = featIdSchema;",
	];
	const manifestsPath = join(OUT_DIR, "manifests.ts");
	writeFileIfChanged(manifestsPath, manifests.join("\n"));

	const indexSource = [
		"// Generated — do not edit by hand",
		"",
		"export * from './skills.registry';",
		"export * from './enemies.registry';",
		"export * from './items.registry';",
		"export * from './classes.registry';",
		"export * from './feats.registry';",
		"export * from './manifests';",
	];
	const indexPath = join(OUT_DIR, "index.ts");
	writeFileIfChanged(indexPath, indexSource.join("\n"));
}

if (process.argv.includes("--watch")) {
	console.log(
		"Watch mode is handled externally by chokidar-cli. Run without --watch to generate once.",
	);
	run();
} else {
	run();
}

export {};
