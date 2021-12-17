import "./styles.scss";

import { IoPersonCircleSharp } from "react-icons/io5";

export default function WoopCard({
  email = "",
  text = "",
}) {
  return (
    <div className="woop-card">
      <p className="email"><IoPersonCircleSharp className="icon"/>{email ? email.match(/^.+(?=@)/)[0] : ""}</p>
      <p className="text">{text}</p>
    </div>
  )
}