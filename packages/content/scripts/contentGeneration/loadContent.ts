import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";

import type { ContentSpec, ContentValue, LoadedContent } from "./types";
import { sanitizeName, walkTypeScriptFiles } from "./paths";

type ContentModule = {
	default?: unknown;
};

export async function loadContentForSpec(
	spec: ContentSpec,
	srcDir: string,
): Promise<LoadedContent[]> {
	const dir = join(srcDir, spec.dirName);
	const files = walkTypeScriptFiles(dir).sort((a, b) => a.localeCompare(b, "en"));
	const loaded: LoadedContent[] = [];

	for (const [idx, file] of files.entries()) {
		const value = await loadContentValue(file);
		const name = sanitizeName(basename(file).replace(/\.ts$/, ""));

		loaded.push({
			spec,
			file,
			importName: `${spec.importPrefix}_${name}_${idx}`,
			id: value.id,
			value,
		});
	}

	return loaded;
}

async function loadContentValue(file: string): Promise<ContentValue> {
	const mod = (await import(pathToFileURL(file).href)) as ContentModule;

	if (!isContentValue(mod.default)) {
		throw new Error(`Content module ${file} must default-export an object with a string id`);
	}

	return mod.default;
}

function isContentValue(value: unknown): value is ContentValue {
	return (
		typeof value === "object" &&
		value !== null &&
		"id" in value &&
		typeof (value as { id: unknown }).id === "string" &&
		(value as { id: string }).id.length > 0
	);
}
