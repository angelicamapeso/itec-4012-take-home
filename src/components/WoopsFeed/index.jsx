import "./styles.scss";

import { IoPersonCircleSharp } from "react-icons/io5";

export default function WoopsFeed({
  woopsList = [],
}) {
  return (
    <section className="woops-feed">
      { woopsList.map(({email, text}) => (
          <div className="woop">
            <p className="email"><IoPersonCircleSharp className="icon"/>{email.match(/^.+(?=@)/)[0]}</p>
            <p className="text">{text}</p>
          </div>
        ))}
    </section>
  );
}