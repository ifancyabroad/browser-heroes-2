import type { FeatDefinition, FeatDefinitionInput } from "../schemas/feat.schema";
import { featSchema } from "../schemas/feat.schema";

export const buildFeat = (feat: FeatDefinitionInput): FeatDefinition => {
	const parsed = featSchema.parse(feat);
	return parsed;
};

export default buildFeat;
