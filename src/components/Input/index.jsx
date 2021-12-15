import "./styles.scss";

import { useEffect, useState } from "react";

export const INPUT_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  SUBMIT: "submit",
};

export default function Input({
  className="",
  type = "text",
  required = false,
  label = "",
  name = "",
  value = "",
  register = {},
}) {
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    setInputVal(value);
  }, [value])

  return (
    <>
      { type === INPUT_TYPES.TEXT ||
        type === INPUT_TYPES.EMAIL ||
        type === INPUT_TYPES.PASSWORD ?
          <label htmlFor={name}>{label}</label> : null
      }
      <input
        className={className}
        {...register}
        name={name}
        required={required}
        type={type}
        onChange={(e) => setInputVal(e.target.value)}
        value={inputVal}
      />
    </>
  );
}