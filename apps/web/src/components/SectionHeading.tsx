type SectionHeadingProps = {
	title: string;
};

export function SectionHeading({ title }: SectionHeadingProps) {
	return <h2 className="text-base text-text-bright">{title}</h2>;
}
