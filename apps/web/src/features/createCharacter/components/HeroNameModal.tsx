import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { generateHeroName } from "../generateHeroName";
import { HERO_NAME_MAX_LENGTH } from "@app/shared";
import { isValidHeroNameShape } from "../heroName";

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
			closeOnBackdropClick={!isSubmitting}
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
			<form id="hero-name-form" onSubmit={handleSubmit}>
				<label htmlFor="hero-name-input" className="mb-2 block text-text-label">
					Hero name
				</label>
				<div className="flex gap-3">
					<input
						id="hero-name-input"
						type="text"
						value={heroName}
						onChange={handleChange}
						disabled={isSubmitting}
						autoComplete="off"
						maxLength={HERO_NAME_MAX_LENGTH}
						aria-invalid={Boolean(validationMessage)}
						aria-describedby={validationMessage ? "hero-name-error" : undefined}
						className="min-w-0 flex-1 border-2 border-border bg-bg-base px-3 py-2 text-text-bright caret-primary outline-none placeholder:text-text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
						autoFocus
					/>

					<Button type="button" onClick={handleReroll} disabled={isSubmitting}>
						Reroll
					</Button>
				</div>

				{validationMessage && (
					<p id="hero-name-error" className="mt-2 text-error">
						{validationMessage}
					</p>
				)}
			</form>
		</Modal>
	);
}
