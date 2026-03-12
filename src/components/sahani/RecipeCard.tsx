import * as React from "react";
import { ArrowRight, ChefHat, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string;
	imageUrl?: string;
	calories: number;
	rating?: number;
}

function RecipeCard({
	name,
	imageUrl,
	calories,
	rating,
	className,
	...props
}: RecipeCardProps) {
	return (
		<div
			className={cn(
				"min-w-[240px] bg-card rounded-3xl border border-border shadow-sm overflow-hidden group hover:shadow-lg transition-all cursor-pointer",
				className,
			)}
			{...props}
		>
			<div className="h-40 overflow-hidden relative">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={name}
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					/>
				) : (
					<div className="w-full h-full bg-secondary flex items-center justify-center">
						<ChefHat className="w-10 h-10 text-sahani-tertiary" />
					</div>
				)}
				{rating !== undefined && (
					<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg">
						<div className="flex items-center gap-1">
							<Star className="w-3 h-3 fill-primary text-primary" />
							<span className="text-[10px] font-black text-foreground">
								{rating.toFixed(1)}
							</span>
						</div>
					</div>
				)}
			</div>
			<div className="p-5">
				<h4 className="font-black text-sm text-foreground mb-2 line-clamp-1">
					{name}
				</h4>
				<div className="flex items-center justify-between">
					<span className="text-[10px] font-bold text-sahani-tertiary uppercase tracking-wider">
						{calories} kcal
					</span>
					<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
						<ArrowRight className="w-3 h-3" />
					</div>
				</div>
			</div>
		</div>
	);
}

export { RecipeCard };
export type { RecipeCardProps };
