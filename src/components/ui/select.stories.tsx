import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const meta = {
	title: "UI/Select",
	component: Select,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="w-[200px]">
				<SelectValue placeholder="Select a meal" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="breakfast">Breakfast</SelectItem>
				<SelectItem value="lunch">Lunch</SelectItem>
				<SelectItem value="dinner">Dinner</SelectItem>
			</SelectContent>
		</Select>
	),
};
