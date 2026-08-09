// @vitest-environment node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
	categoryConfigs,
	contentRoot,
	discover,
	literalToValue,
	parseDefinition,
	valueToLiteral,
} from "./contentSource";
import { contentSpecs } from "../../../packages/content/scripts/contentGeneration/specs";

describe("content source", () => {
	it("maps every studio category to the generator's existing content specification", () => {
		const generatedTypes = new Set(contentSpecs.map((spec) => spec.type));
		for (const config of Object.values(categoryConfigs)) {
			expect(generatedTypes.has(config.contentType)).toBe(true);
		}
	});
	it.each([
		["enemies", "abomination"],
		["skills", "acrobatic_strike"],
		["feats", "corrosive_blood"],
		["classes", "warrior"],
		["item-bases", "base_dagger"],
		["affixes", "accurate"],
		["items", "acid_edge"],
		["achievements", "acquire_legendary_item"],
	] as const)("discovers and parses %s", async (category, expectedId) => {
		const definitions = await discover(category);
		expect(definitions.has(expectedId)).toBe(true);
		const file = definitions.get(expectedId)!;
		const parsed = await parseDefinition(
			file,
			categoryConfigs[category].builders,
			categoryConfigs[category].schema,
		);
		expect(parsed.normalized.id).toBe(expectedId);
		expect(parsed.revision).toMatch(/^[a-f0-9]{64}$/);
	});

	it("round trips supported plain data through TypeScript literals", () => {
		const value = {
			name: "Blade",
			damage: -2,
			enabled: true,
			tags: ["one", "two"],
			nested: { optional: null },
		};
		const printed = ts
			.createPrinter()
			.printNode(
				ts.EmitHint.Expression,
				valueToLiteral(value),
				ts.createSourceFile("test.ts", "", ts.ScriptTarget.Latest),
			);
		const file = ts.createSourceFile(
			"test.ts",
			`const value = ${printed}`,
			ts.ScriptTarget.Latest,
			true,
		);
		const declaration = (file.statements[0] as ts.VariableStatement).declarationList
			.declarations[0];
		expect(literalToValue(declaration.initializer!)).toEqual(value);
	});

	it("rejects expressions outside the supported literal shape", () => {
		const source = ts.createSourceFile(
			"test.ts",
			"const value = { ...other }",
			ts.ScriptTarget.Latest,
			true,
		);
		const declaration = (source.statements[0] as ts.VariableStatement).declarationList
			.declarations[0];
		expect(() => literalToValue(declaration.initializer!)).toThrow("Only literal properties");
	});

	it("keeps representative files beneath the owned content root", async () => {
		const definitions = await discover("classes");
		const file = definitions.get("warrior")!;
		const source = await readFile(file, "utf8");
		expect(source).toContain("import { buildClass }");
		expect(resolve(contentRoot, "classes/warrior.ts")).toBe(file);
	});
});
