import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { InputField } from "../../../components/FormFields";
import { generateHeroName } from "../utils/generateHeroName";
import { HERO_NAME_MAX_LENGTH } from "@app/shared";
import { isValidHeroNameShape } from "../utils/heroName";

type HeroNameModalProps = {
	heroClassName: string;
	isSubmitting?: boolean;
	onClose: () => void;
	onConfirm: (heroName: string) => void;
};

export function HeroNameModal({
	heroClassName,
	isSubmitting = false,
	onClose,
	onConfirm,
}: HeroNameModalProps) {
	const [heroName, setHeroName] = useState(generateHeroName);

	const trimmedName = heroName.trim();
	const isValidName = isValidHeroNameShape(heroName);
	const validationMessage =
		heroName && !isValidName ? "Use letters only, with no spaces or symbols." : null;

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setHeroName(event.target.value);
	}

	function handleReroll() {
		setHeroName(generateHeroName());
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (!isValidName) {
			return;
		}

		onConfirm(trimmedName);
	}

	return (
		<Modal
			open
			title={`NAME YOUR ${heroClassName.toUpperCase()}`}
			onClose={onClose}
			dismissible={!isSubmitting}
			footer={
				<>
					<Button type="button" onClick={onClose} disabled={isSubmitting}>
						Cancel
					</Button>

					<Button
						type="submit"
						form="hero-name-form"
						disabled={!isValidName || isSubmitting}
						variant="primary"
					>
						{isSubmitting ? "Creating..." : "BEGIN JOURNEY"}
					</Button>
				</>
			}
		>
			<form id="hero-name-form" className="flex items-start gap-3" onSubmit={handleSubmit}>
				<InputField
					id="hero-name-input"
					type="text"
					label="Hero name"
					className="min-w-0 flex-1"
					value={heroName}
					onChange={handleChange}
					disabled={isSubmitting}
					autoComplete="off"
					maxLength={HERO_NAME_MAX_LENGTH}
					error={validationMessage}
					autoFocus
				/>

				<Button
					type="button"
					className="mt-7"
					onClick={handleReroll}
					disabled={isSubmitting}
				>
					Reroll
				</Button>
			</form>
		</Modal>
	);
}
