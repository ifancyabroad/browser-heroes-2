import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { contentSpecs } from "./contentGeneration/specs";
import { ensureDir, writeFileIfChanged } from "./contentGeneration/paths";
import { loadContentForSpec } from "./contentGeneration/loadContent";
import {
	renderIdFile,
	renderIndexFile,
	renderManifestsFile,
	renderRegistryFile,
} from "./contentGeneration/render";
import { validateContentGraph } from "./contentGeneration/validateReferences";
import type { ContentType, LoadedContent } from "./contentGeneration/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src");
const OUT_DIR = join(SRC, "generated");

async function run() {
	ensureDir(OUT_DIR);

	const entriesByType = new Map<ContentType, LoadedContent[]>();

	for (const spec of contentSpecs) {
		const entries = await loadContentForSpec(spec, SRC);
		entries.sort((a, b) => a.id.localeCompare(b.id, "en"));
		entriesByType.set(spec.type, entries);
	}

	const allEntries = [...entriesByType.values()].flat();
	validateContentGraph(allEntries, ROOT);

	for (const spec of contentSpecs) {
		const entries = entriesByType.get(spec.type) ?? [];

		writeFileIfChanged(join(OUT_DIR, `${spec.type}Ids.ts`), renderIdFile(spec, entries));
		writeFileIfChanged(
			join(OUT_DIR, `${spec.plural}.registry.ts`),
			renderRegistryFile(spec, entries, OUT_DIR),
		);
	}

	writeFileIfChanged(join(OUT_DIR, "manifests.ts"), renderManifestsFile(contentSpecs));
	writeFileIfChanged(join(OUT_DIR, "index.ts"), renderIndexFile(contentSpecs));
}

if (process.argv.includes("--watch")) {
	console.log(
		"Watch mode is handled externally by chokidar-cli. Run without --watch to generate once.",
	);
}

run().catch((error: unknown) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
