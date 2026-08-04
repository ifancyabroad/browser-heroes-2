import { classes, type ClassId } from "@app/content";
import { SelectField } from "./FormFields";

type ClassSelectProps = {
	value: ClassId | "all";
	onChange: (value: ClassId | "all") => void;
};

const classOptions = [
	{ label: "All classes", value: "all" },
	...[...classes]
		.sort((a, b) => a.order - b.order)
		.map((gameClass) => ({ label: gameClass.name, value: gameClass.id })),
] satisfies readonly { label: string; value: ClassId | "all" }[];

export function ClassSelect({ value, onChange }: ClassSelectProps) {
	return (
		<SelectField
			label="CLASS"
			value={value}
			options={classOptions}
			className="min-w-40"
			onChange={onChange}
		/>
	);
}
