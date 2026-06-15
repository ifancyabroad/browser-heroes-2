import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

export function ensureDir(path: string) {
	mkdirSync(path, { recursive: true });
}

export function walkTypeScriptFiles(dir: string): string[] {
	if (!existsSync(dir)) return [];

	const entries = readdirSync(dir, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);

		if (entry.isDirectory()) {
			files.push(...walkTypeScriptFiles(fullPath));
			continue;
		}

		if (
			entry.isFile() &&
			entry.name.endsWith(".ts") &&
			!entry.name.endsWith(".d.ts") &&
			entry.name !== "index.ts"
		) {
			files.push(fullPath);
		}
	}

	return files;
}

export function writeFileIfChanged(path: string, content: string) {
	if (existsSync(path) && readFileSync(path, "utf-8") === content) {
		return;
	}

	writeFileSync(path, content, "utf-8");
	console.log(`Wrote ${path}`);
}

export function toImportPath(from: string, to: string) {
	let rel = relative(dirname(from), to);
	if (!rel.startsWith(".")) rel = `./${rel}`;
	return toPosixPath(rel).replace(/\.ts$/, "");
}

export function toRelativeDisplayPath(fromDir: string, file: string) {
	return toPosixPath(relative(fromDir, file));
}

export function sanitizeName(base: string) {
	return base.replace(/[^A-Za-z0-9_$]/g, "_");
}

export function toPosixPath(path: string) {
	return path.split(sep).join("/");
}
