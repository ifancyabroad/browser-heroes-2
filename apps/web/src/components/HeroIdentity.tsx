import { CLASSES_BY_ID, type ClassId } from "@app/content";
import type { ReactNode } from "react";
import { resolveImageUrl } from "../utils/image";

export function HeroIdentity({
	name,
	classId,
	level,
	displayName,
	nameTone = "default",
	portraitAdornment,
}: {
	name: string;
	classId: ClassId;
	level: number;
	displayName?: string | null;
	nameTone?: "default" | "primary";
	portraitAdornment?: ReactNode;
}) {
	const heroClass = CLASSES_BY_ID[classId];
	const identityTitle = displayName ? `${name} (${displayName})` : name;

	return (
		<div className="flex min-w-0 items-center gap-2 sm:min-w-52">
			<span className="relative shrink-0">
				<img
					src={resolveImageUrl(heroClass.icon)}
					alt=""
					width="40"
					height="40"
					loading="lazy"
					className="border-2 border-bg-elevated bg-bg-base"
				/>
				{portraitAdornment && (
					<span className="absolute -bottom-1 -right-1 flex">{portraitAdornment}</span>
				)}
			</span>
			<div className="grid min-w-0">
				<div className="flex min-w-0 items-center gap-2" title={identityTitle}>
					<span className="min-w-0 truncate">
						<span
							className={nameTone === "primary" ? "text-primary" : "text-text-bright"}
						>
							{name}
						</span>
						{displayName && <span className="text-info"> ({displayName})</span>}
					</span>
				</div>
				<span className="truncate text-text-muted">
					Level {level} {heroClass.name}
				</span>
			</div>
		</div>
	);
}
