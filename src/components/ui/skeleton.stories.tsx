import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
	title: "UI/Skeleton",
	component: Skeleton,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = { render: () => <Skeleton className="h-4 w-[250px]" /> };
export const Circle: Story = { render: () => <Skeleton className="h-12 w-12 rounded-full" /> };
export const Card: Story = {
	render: () => (
		<div className="space-y-3" style={{ width: 300 }}>
			<Skeleton className="h-[125px] w-full rounded-xl" />
			<Skeleton className="h-4 w-[250px]" />
			<Skeleton className="h-4 w-[200px]" />
		</div>
	),
};
