import FinancialStatApi from "@/api/FinancialStatApi";
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
import React, { useEffect, useState } from "react";
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

  const [chartData, setChartData] = React.useState<
    { month: string; income: number; outcome: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await FinancialStatApi.getIncomeOutcomeOverYear()) as {
        month: string;
        income: number;
        outcome: number;
      }[];
      // setChartData(res);
      setChartData(res);
    };
    fetchData();
  }, []);

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

  const [subjectIncomeData, setSubjectIncomeData] = useState<
    { subject: string; income: number }[]
  >([]);

  useEffect(() => {
    const fetchSubjectIncomeData = async () => {
      const res = (await FinancialStatApi.getIncomePerSubject()) as {
        subject: string;
        income: number;
      }[];
      setSubjectIncomeData(res);
    };
    fetchSubjectIncomeData();
  });

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

            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          </BarChart>
        </ChartContainer>
      </SectionLayout>
    </ContentLayout>
  );
};

export default FinStatPage;
