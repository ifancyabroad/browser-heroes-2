import type { LevelUpOption, LevelUpSelection } from "@app/engine";
import { RadioGroup } from "radix-ui";
import { LevelUpOptionCard } from "./LevelUpOptionCard";

type LevelUpOptionListProps = {
	options: readonly LevelUpOption[];
	selection: LevelUpSelection | null;
	disabled: boolean;
	onSelect: (selection: LevelUpSelection) => void;
};

export function LevelUpOptionList({
	options,
	selection,
	disabled,
	onSelect,
}: LevelUpOptionListProps) {
	function handleValueChange(value: string) {
		const option = options.find((candidate) => getOptionKey(candidate) === value);
		if (option) {
			onSelect(toSelection(option));
		}
	}

	return (
		<RadioGroup.Root
			value={selection ? getSelectionKey(selection) : ""}
			onValueChange={handleValueChange}
			disabled={disabled}
			className="grid gap-2"
			aria-label="Level-up choices"
		>
			{options.map((option) => (
				<LevelUpOptionCard
					key={getOptionKey(option)}
					option={option}
					value={getOptionKey(option)}
					selected={isSelectedOption(option, selection)}
					disabled={disabled}
				/>
			))}
		</RadioGroup.Root>
	);
}

function getOptionKey(option: LevelUpOption) {
	return option.type === "skill" ? `skill-${option.skillId}` : `feat-${option.featId}`;
}

function getSelectionKey(selection: LevelUpSelection) {
	return selection.type === "skill" ? `skill-${selection.skillId}` : `feat-${selection.featId}`;
}

function isSelectedOption(option: LevelUpOption, selection: LevelUpSelection | null) {
	if (!selection || option.type !== selection.type) {
		return false;
	}

	if (option.type === "skill" && selection.type === "skill") {
		return option.skillId === selection.skillId;
	}

	if (option.type === "feat" && selection.type === "feat") {
		return option.featId === selection.featId;
	}

	return false;
}

function toSelection(option: LevelUpOption): LevelUpSelection {
	if (option.type === "skill") {
		return {
			type: "skill",
			skillId: option.skillId,
		};
	}

	return {
		type: "feat",
		featId: option.featId,
	};
}
