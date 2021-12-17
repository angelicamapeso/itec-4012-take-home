import "./styles.scss";

import { IoPersonCircleSharp } from "react-icons/io5";

export default function WoopsFeed({
  woopsList = [],
}) {
  return (
    woopsList.length > 0 ?
    <section className="woops-feed">
      { woopsList.map(({email, text}, i) => (
          <div key={i} className="woop">
            <p className="email"><IoPersonCircleSharp className="icon"/>{email.match(/^.+(?=@)/)[0]}</p>
            <p className="text">{text}</p>
          </div>
        ))}
    </section> : null
  );
}