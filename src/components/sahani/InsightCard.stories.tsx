import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, TrendingUp } from "lucide-react";
import { InsightCard } from "./InsightCard";

const meta = {
	title: "Sahani/InsightCard",
	component: InsightCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 400 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof InsightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		icon: TrendingUp,
		title: "Optimization Insight",
		children: (
			<p>
				Your <span className="font-black text-foreground">Carbohydrate</span>{" "}
				intake is peaking in the late evening. Try shifting your carb-heavy
				meals to lunchtime when you're more active.
			</p>
		),
	},
};

export const Warning: Story = {
	args: {
		icon: Info,
		title: "Attention Needed",
		variant: "warning",
		children: (
			<p>
				Your iron intake has been below recommended levels for the past 3
				days. Consider adding more leafy greens like Managu to your meals.
			</p>
		),
	},
};
