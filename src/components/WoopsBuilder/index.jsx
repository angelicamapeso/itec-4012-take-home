import "./styles.scss";

import { useState } from "react";

import Input from "../Input";

export default function WoopsBuilder({
  maxLength = "150",
}) {
  const [ woopText, setWoopText ] = useState("");

  const onWoopChange = (e) => {
    setWoopText(e.target.value);
  }

  const submitWoop = (e) => {
    e.preventDefault();
    console.log({
      text: woopText,
    })
  }

  return (
    <form className="woops-builder" onSubmit={submitWoop}>
      <textarea
        onChange={onWoopChange}
        placeholder="Mistakes were made!"
        value={woopText}
        maxLength={maxLength}
      ></textarea>
      <div className="build-footer">
        <p className="text-count">{woopText.length + "/" + maxLength}</p>
        <Input className="submit-btn" type="submit" value="Woops!"/>
      </div>
    </form>
  );
}