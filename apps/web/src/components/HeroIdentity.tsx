import { CLASSES_BY_ID, type ClassId } from "@app/content";
import type { ReactNode } from "react";
import { resolveImageUrl } from "../utils/image";

export function HeroIdentity({
	name,
	classId,
	nameAdornment,
}: {
	name: string;
	classId: ClassId;
	nameAdornment?: ReactNode;
}) {
	const heroClass = CLASSES_BY_ID[classId];

	return (
		<div className="flex min-w-0 items-center gap-2 sm:min-w-52">
			<img
				src={resolveImageUrl(heroClass.icon)}
				alt=""
				width="40"
				height="40"
				loading="lazy"
				className="shrink-0 border-2 border-bg-elevated bg-bg-base"
			/>
			<div className="grid min-w-0">
				<div className="flex items-center gap-2">
					<span className="truncate text-text-bright">{name}</span>
					{nameAdornment}
				</div>
				<span className="text-text-muted">{heroClass.name}</span>
			</div>
		</div>
	);
}
