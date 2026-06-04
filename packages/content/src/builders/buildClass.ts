import type { IClass } from "../types/class";
import { ClassSchema } from "../schemas/class.schema";

export const buildClass = (cls: IClass) => {
	const parsed = ClassSchema.parse(cls);
	return parsed;
};

export default buildClass;
