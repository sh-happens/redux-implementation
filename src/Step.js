import React from "react";
import { changeStepSize, useDispatch, useSelector } from "./redux";

const Step = () => {
  const stepSize = useSelector(
    (state) => state.stepSize,
    (current, prev) => current === prev
  );
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        Значение счётчика должно увеличиваться или уменьшаться на заданную
        величину шага
      </div>
      <div>Текущая величина шага: {stepSize}</div>
      <input
        type="range"
        min="1"
        max="5"
        value={stepSize}
        onChange={({ target }) => dispatch(changeStepSize(target.value))}
      />
    </div>
  );
};

export default Step;
