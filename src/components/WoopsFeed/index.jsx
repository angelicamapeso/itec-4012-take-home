import "./styles.scss";

import WoopCard from "../WoopCard";

export default function WoopsFeed({
  woopsList = [],
}) {
  return (
    woopsList.length > 0 ?
    <section className="woops-feed">
      { woopsList.map(({email, text}, i) => (
          <WoopCard key={i} email={email} text={text} />
        ))}
    </section> : null
  );
}