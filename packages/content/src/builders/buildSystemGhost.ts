import {
	systemGhostSchema,
	type SystemGhostDefinition,
	type SystemGhostDefinitionInput,
} from "../schemas/systemGhost.schema";

export function buildSystemGhost(input: SystemGhostDefinitionInput): SystemGhostDefinition {
	return systemGhostSchema.parse(input);
}

export default buildSystemGhost;
