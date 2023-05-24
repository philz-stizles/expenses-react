import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = (props) => {
  return (
    <div className={`Input${props.isValid ? " invalid" : ""}`}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    </div>
  );
};

Input.protoTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default Input;
