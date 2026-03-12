import type { Meta, StoryObj } from "@storybook/react-vite";
import { SahaniCard } from "./SahaniCard";

const meta = {
	title: "Sahani/SahaniCard",
	component: SahaniCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof SahaniCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<div>
				<h3 className="text-lg font-black text-foreground mb-2">Default Card</h3>
				<p className="text-sm text-muted-foreground">
					White background, rounded-3xl, subtle shadow.
				</p>
			</div>
		),
	},
};

export const Hero: Story = {
	args: {
		variant: "hero",
		padding: "lg",
		children: (
			<div className="relative z-10">
				<span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1.5 rounded-full mb-6 inline-block border border-primary/20">
					Featured
				</span>
				<h2 className="text-4xl font-black mb-4 leading-tight">
					Hero Card Title
				</h2>
				<p className="text-sahani-tertiary font-medium">
					Dark background with green accents and large rounded corners.
				</p>
			</div>
		),
	},
};

export const Dark: Story = {
	args: {
		variant: "dark",
		children: (
			<div>
				<h4 className="font-black flex items-center gap-2 mb-4">
					Dark Card
				</h4>
				<p className="text-xs text-sahani-tertiary leading-relaxed font-medium">
					Dark background for tips, highlights, and emphasis.
				</p>
			</div>
		),
	},
};

export const Stat: Story = {
	args: {
		variant: "stat",
		children: (
			<div>
				<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">
					Average Daily Intake
				</p>
				<h2 className="text-4xl font-black text-foreground mb-2">
					1,850{" "}
					<span className="text-lg text-sahani-tertiary">kcal</span>
				</h2>
			</div>
		),
	},
};

export const Tip: Story = {
	args: {
		variant: "tip",
		children: (
			<div>
				<h4 className="font-black text-foreground text-sm mb-1">Pro Tip</h4>
				<p className="text-xs text-muted-foreground font-medium leading-relaxed">
					Shop the perimeter of the grocery store first for fresh produce.
				</p>
			</div>
		),
	},
};
