import { join } from "node:path";

import type { ContentSpec, LoadedContent } from "./types";
import { toImportPath } from "./paths";

const GENERATED_BANNER = "// Generated - do not edit by hand";

export function renderIdFile(spec: ContentSpec, entries: readonly LoadedContent[]) {
	return [
		GENERATED_BANNER,
		"",
		'import { z } from "zod";',
		"",
		`export const ${spec.type}Ids = ${JSON.stringify(entries.map((e) => e.id))} as const;`,
		`export const ${spec.type}IdSchema = z.enum(${spec.type}Ids);`,
		`export type ${spec.typeName}Id = z.infer<typeof ${spec.type}IdSchema>;`,
		"",
	].join("\n");
}

export function renderRegistryFile(
	spec: ContentSpec,
	entries: readonly LoadedContent[],
	outDir: string,
) {
	const registryFile = join(outDir, `${spec.plural}.registry.ts`);
	const rawArrayName = `raw${capitalize(spec.plural)}`;
	const rawMapName = `raw${capitalize(spec.plural)}ById`;
	const importLines = entries.map(
		(entry) => `import ${entry.importName} from '${toImportPath(registryFile, entry.file)}';`,
	);

	return [
		GENERATED_BANNER,
		"",
		`import type { ${spec.definitionType} } from '${spec.definitionImportPath}';`,
		`import type { ${spec.typeName}Id } from './${spec.type}Ids';`,
		...spec.typeImportLines,
		`import type { ${spec.helperTypeNames.join(", ")} } from '../types/contentTypes';`,
		`import { ${spec.type}IdSchema, ${spec.type}Ids } from './${spec.type}Ids';`,
		"",
		...importLines,
		"",
		`export { ${spec.type}IdSchema, ${spec.type}Ids };`,
		`export type { ${spec.typeName}Id } from './${spec.type}Ids';`,
		"",
		`export type ${spec.typeName} = ${spec.typeExpression};`,
		"",
		`const ${rawArrayName} = [${entries
			.map((entry) => entry.importName)
			.join(", ")}] satisfies readonly ${spec.definitionType}[];`,
		"",
		"// Reference IDs are validated by generateContent.ts before this registry is written.",
		`export const ${spec.plural} = ${rawArrayName} as readonly ${spec.typeName}[];`,
		"",
		`const ${rawMapName} = {`,
		...entries.map((entry) => `  ${JSON.stringify(entry.id)}: ${entry.importName},`),
		`} satisfies Record<${spec.typeName}Id, ${spec.definitionType}>;`,
		"",
		"// Reference IDs are validated by generateContent.ts before this registry is written.",
		`export const ${spec.registryConstantName ?? spec.plural.toUpperCase()}_BY_ID = ${rawMapName} as Record<${spec.typeName}Id, ${spec.typeName}>;`,
		"",
	].join("\n");
}

function capitalize(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export function renderManifestsFile(specs: readonly ContentSpec[]) {
	const imports = specs.map(
		(spec) => `import { ${spec.type}IdSchema, ${spec.type}Ids } from './${spec.type}Ids';`,
	);
	const idsExports = specs.map(
		(spec) => `export const ${spec.type.toUpperCase()}_IDS = ${spec.type}Ids;`,
	);
	const schemaExports = specs.map(
		(spec) => `export const ${spec.type.toUpperCase()}_ID_SCHEMA = ${spec.type}IdSchema;`,
	);

	return [GENERATED_BANNER, "", ...imports, "", ...idsExports, "", ...schemaExports, ""].join(
		"\n",
	);
}

export function renderIndexFile(specs: readonly ContentSpec[]) {
	return [
		GENERATED_BANNER,
		"",
		...specs.map((spec) => `export * from './${spec.plural}.registry';`),
		"export * from './manifests';",
		"",
	].join("\n");
}
