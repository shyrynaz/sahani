import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sahaniCardVariants = cva("relative overflow-hidden transition-all", {
	variants: {
		variant: {
			default:
				"bg-card text-card-foreground rounded-3xl border border-border shadow-sm",
			hero: "bg-foreground text-background rounded-[40px] shadow-2xl",
			dark: "bg-foreground text-background rounded-[40px]",
			stat: "bg-card text-card-foreground rounded-[32px] border border-border shadow-sm hover:shadow-md",
			tip: "bg-primary/5 border border-primary/10 rounded-[40px]",
		},
		padding: {
			default: "p-8",
			lg: "p-10",
			sm: "p-5",
			none: "",
		},
	},
	defaultVariants: {
		variant: "default",
		padding: "default",
	},
});

interface SahaniCardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof sahaniCardVariants> {}

function SahaniCard({
	className,
	variant,
	padding,
	children,
	...props
}: SahaniCardProps) {
	return (
		<div
			className={cn(sahaniCardVariants({ variant, padding, className }))}
			{...props}
		>
			{children}
		</div>
	);
}

export { SahaniCard, sahaniCardVariants };
export type { SahaniCardProps };
