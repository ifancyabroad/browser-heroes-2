import type { ClassDefinition, ClassDefinitionInput } from "../schemas/class.schema";
import { classSchema } from "../schemas/class.schema";

export const buildClass = (cls: ClassDefinitionInput): ClassDefinition => {
	const parsed = classSchema.parse(cls);
	return parsed;
};

export default buildClass;
