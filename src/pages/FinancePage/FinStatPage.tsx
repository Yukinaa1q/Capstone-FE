import Selection from "@/components/Input/Selection";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import subjectList from "@/interfaces/Subject";
import ContentLayout from "@/layouts/ContentLayout";
import SectionLayout from "@/layouts/SectionLayout";
import { capitalizeFirstLetter } from "@/utils/utils";
import { Monitor } from "lucide-react";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FinStatPage = () => {
  const [yearlyChecked, setYearlyChecked] = React.useState(false);
  const chartData = [
    {
      month: "January",
      income: 25000000,
      outcome: 15000000,
    },
    {
      month: "February",
      income: 30000000,
      outcome: 20000000,
    },
    {
      month: "March",
      income: 35000000,
      outcome: 25000000,
    },
    {
      month: "April",
      income: 40000000,
      outcome: 30000000,
    },
    {
      month: "May",
      income: 45000000,
      outcome: 35000000,
    },
    {
      month: "June",
      income: 50000000,
      outcome: 40000000,
    },
    {
      month: "July",
      income: 55000000,
      outcome: 45000000,
    },
    {
      month: "August",
      income: 60000000,
      outcome: 50000000,
    },
    {
      month: "September",
      income: 65000000,
      outcome: 55000000,
    },
    {
      month: "October",
      income: 70000000,
      outcome: 60000000,
    },
    {
      month: "November",
      income: 75000000,
      outcome: 65000000,
    },
    {
      month: "December",
      income: 80000000,
      outcome: 70000000,
    },
  ];

  const chartConfig = {
    income: {
      label: "Income",
      color: "#2563eb",
    },
    outcome: {
      label: "Outcome",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const subjectIncomeData = subjectList.map((subject) => ({
    subject,
    income: Math.floor(Math.random() * 1000000),
  }));

  const subjectChartConfig = {
    income: {
      label: "Income",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ContentLayout>
      <SectionLayout sectionTitle="Income/Outcome Overview">
        <div className="flex items-center gap-4 mb-4">
          <Selection
            disabled={yearlyChecked}
            selectList={months}
            placeholder="Month"
            className="w-40"
          />

          <Label className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={(checked) => {
                const isChecked =
                  checked === true || checked === "indeterminate";
                setYearlyChecked(isChecked);
              }}
            />
            <span>Yearly Overview</span>
          </Label>
        </div>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] h-[320px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel={true} />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="outcome" fill="var(--color-outcome)" radius={4} />
          </BarChart>
        </ChartContainer>
      </SectionLayout>

      <SectionLayout sectionTitle="Income Per Subject this Month">
        <ChartContainer
          config={subjectChartConfig}
          className="min-h-[200px] h-[320px] w-full"
        >
          <BarChart accessibilityLayer data={subjectIncomeData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subject"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => capitalizeFirstLetter(value)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel={true} />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </SectionLayout>
    </ContentLayout>
  );
};

export default FinStatPage;
