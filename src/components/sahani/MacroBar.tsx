import * as React from "react";
import { cn } from "@/lib/utils";

interface MacroBarProps extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	value: number;
	target: number;
	color?: "blue" | "amber" | "red" | "cyan" | "green";
	size?: "sm" | "default";
	showValues?: boolean;
}

const colorMap = {
	blue: "bg-blue-500",
	amber: "bg-amber-500",
	red: "bg-red-500",
	cyan: "bg-cyan-400",
	green: "bg-primary",
};

const trackColorMap = {
	blue: "bg-blue-100",
	amber: "bg-amber-100",
	red: "bg-red-100",
	cyan: "bg-cyan-100",
	green: "bg-secondary",
};

function MacroBar({
	label,
	value,
	target,
	color = "green",
	size = "default",
	showValues = true,
	className,
	...props
}: MacroBarProps) {
	const percent = Math.min(100, Math.round((value / target) * 100));
	const barHeight = size === "sm" ? "h-1.5" : "h-2";

	return (
		<div className={cn("", className)} {...props}>
			{showValues && (
				<div className="flex justify-between items-end mb-2">
					<p className="text-xs font-black text-foreground uppercase tracking-wider">
						{label}
					</p>
					<p className="text-sm font-black text-primary">
						{value}g / {target}g
					</p>
				</div>
			)}
			{!showValues && (
				<p className="text-[9px] font-black text-sahani-tertiary uppercase tracking-wider mb-2">
					{label}
				</p>
			)}
			<div
				className={cn(
					barHeight,
					"rounded-full overflow-hidden",
					trackColorMap[color],
				)}
			>
				<div
					className={cn(
						"h-full rounded-full transition-all duration-700",
						colorMap[color],
					)}
					style={{ width: `${percent}%` }}
				/>
			</div>
			{!showValues && (
				<p className="text-sm font-black text-foreground mt-2">{value}g</p>
			)}
		</div>
	);
}

export { MacroBar };
export type { MacroBarProps };
