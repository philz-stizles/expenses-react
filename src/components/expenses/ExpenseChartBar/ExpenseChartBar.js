import React from "react";
import "./ExpenseChartBar.css";

const ExpenseChartBar = (props) => {
  console.log(props.label, props.value, props.maxValue)
  let barFillHeight =
    props.maxValue <= 0
      ? "0%"
      : `${Math.round(props.value / props.maxValue) * 100}%`;
  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
};

export default ExpenseChartBar;
