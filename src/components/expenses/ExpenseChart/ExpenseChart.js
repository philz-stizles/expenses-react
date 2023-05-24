import React, { useMemo } from "react";
import ExpenseChartBar from "../ExpenseChartBar/ExpenseChartBar";
import "./ExpenseChart.css";

const ExpenseChart = ({ data}) => {
  const dataPoints = useMemo(() => {
    const points = [
      { label: "Jan", value: 0 },
      { label: "Feb", value: 0 },
      { label: "Mar", value: 0 },
      { label: "Apr", value: 0 },
      { label: "May", value: 0 },
      { label: "Jun", value: 0 },
      { label: "Jul", value: 0 },
      { label: "Aug", value: 0 },
      { label: "Sep", value: 0 },
      { label: "Oct", value: 0 },
      { label: "Nov", value: 0 },
      { label: "Dec", value: 0 },
    ];

    for (const expense of data) {
      const month = expense.date.getMonth(); // starting at 0 => January => 0
      points[month].value += expense.amount;
      // points[month].maxValue = Math.max(...dataPointValues);
    }

    return points;
  }, [data])

  return (
    <div className="chart">
      {dataPoints.map((datum) => (
        <ExpenseChartBar
          key={datum.label}
          value={datum.value}
          maxValue={null}
          label={datum.label}
        />
      ))}
    </div>
  );
};

export default ExpenseChart;
