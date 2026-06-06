import type { IClass } from "../types/class";
import { classSchema } from "../schemas/class.schema";

export const buildClass = (cls: IClass) => {
	const parsed = classSchema.parse(cls);
	return parsed;
};

export default buildClass;
