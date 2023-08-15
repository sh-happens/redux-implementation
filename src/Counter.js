import React from "react";
import { updateCounter, useDispatch, useSelector } from "./redux";

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const stepSize = useSelector(
    (state) => state.stepSize,
    (current, prev) => current === prev
  );
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(updateCounter(-parseInt(stepSize)))}>
        -
      </button>
      <span> {counter} </span>
      <button onClick={() => dispatch(updateCounter(parseInt(stepSize)))}>
        +
      </button>
    </div>
  );
};

export default Counter;
