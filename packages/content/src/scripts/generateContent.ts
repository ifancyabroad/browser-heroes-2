import { readdirSync, writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const SRC = join(ROOT, "src");
const OUT_DIR = join(ROOT, "generated");

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

function toImportPath(from: string, to: string) {
	let rel = relative(dirname(from), to);
	if (!rel.startsWith(".")) rel = `./${rel}`;
	return rel.split(sep).join("/").replace(/\.ts$/, "");
}

function sanitizeName(base: string) {
	return base.replace(/[^A-Za-z0-9_$]/g, "_");
}

function collectType(dir: string, prefix: string): Collected {
	const files = walk(dir);
	const collected: Collected = [];
	let idx = 0;
	for (const f of files) {
		const name = sanitizeName(f.replace(/.*[\\/]/, "").replace(/\.ts$/, ""));
		const importName = `${prefix}_${name}_${idx++}`;
		collected.push({ id: "", file: f, importName });
	}
	return collected;
}

async function generateFor(type: string, dir: string, typeDefImportPath: string) {
	const plural = pluralize(type);
	const collected = collectType(dir, type.slice(0, 3));
	const idsFile = join(OUT_DIR, `${type}Ids.ts`);
	const registryFile = join(OUT_DIR, `${plural}.registry.ts`);

	for (const c of collected) {
		// placeholder to ensure importName exists; actual imports are emitted in output file
	}

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
	const idsArrayText = `export const ${type}Ids = ${JSON.stringify(collected.map((c) => c.id))} as const;\nexport type ${capitalize(type)}Id = (typeof ${type}Ids)[number];`;

	const registryLines = [
		"// Generated — do not edit by hand",
		"",
		`import type { ${capitalize(type)}Definition } from '${typeDefImportPath}';`,
		"",
		...sortedImportLines,
		"",
		idsArrayText,
		"",
		`export const ${plural}: readonly ${capitalize(type)}Definition[] = [${collected.map((c) => c.importName).join(", ")}];`,
		"",
		`export const ${plural.toUpperCase()}_BY_ID: Record<${capitalize(type)}Id, ${capitalize(type)}Definition> = {`,
		...collected.map((c) => `  ${JSON.stringify(c.id)}: ${c.importName},`),
		`};`,
	];

	writeFileSync(idsFile, `// Generated — do not edit by hand\n\n${idsArrayText}\n`, "utf-8");
	writeFileSync(registryFile, registryLines.join("\n"), "utf-8");
	console.log(`Wrote ${idsFile}`);
	console.log(`Wrote ${registryFile}`);
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

async function run() {
	const skillsDir = join(SRC, "skills");
	const enemiesDir = join(SRC, "enemies");
	const itemsDir = join(SRC, "items");
	const classesDir = join(SRC, "classes");

	mkdirSync(OUT_DIR, { recursive: true });

	await generateFor("skill", skillsDir, "../src/types/skill");
	await generateFor("enemy", enemiesDir, "../src/types/enemy");
	await generateFor("item", itemsDir, "../src/types/item");
	await generateFor("class", classesDir, "../src/types/class");

	const manifests = [
		"// Generated — do not edit by hand",
		"",
		"import { skillIds } from './skillIds';",
		"import { enemyIds } from './enemyIds';",
		"import { itemIds } from './itemIds';",
		"import { classIds } from './classIds';",
		"",
		"export const SKILL_IDS = skillIds;",
		"export const ENEMY_IDS = enemyIds;",
		"export const ITEM_IDS = itemIds;",
		"export const CLASS_IDS = classIds;",
	];
	writeFileSync(join(OUT_DIR, "manifests.ts"), manifests.join("\n"), "utf-8");
	console.log(`Wrote ${join(OUT_DIR, "manifests.ts")}`);
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
