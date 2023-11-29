"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    {
      label: "Open",
      value: open,
    },
    {
      label: "In Progress",
      value: inProgress,
    },
    {
      label: "Closed",
      value: closed,
    },
  ];

  return (
    <>
      <Card>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: ["Open", "In Progress", "Closed"],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: [open, inProgress, closed],
            },
          ]}
          width={500}
          height={300}
          colors={["#0C75CF"]}
        />
      </Card>
    </>
  );
};

export default IssueChart;
