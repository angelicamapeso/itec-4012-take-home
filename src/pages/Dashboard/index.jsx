import "./styles.scss";

import WoopsBuilder from "../../components/WoopsBuilder";
import WoopsFeed from "../../components/WoopsFeed";

export default function Dashboard() {
  const woopsList = [
    { email: 'johndoe@email.com', text: 'A sample mistake!' },
    { email: 'jane@email.com', text: 'Another sample mistake!' },
    { email: 'angie@email.com', text: 'Woah I did this!' },
  ];

  return (
    <div className="dashboard-wrapper">
      <WoopsBuilder />
      <WoopsFeed woopsList={woopsList} />
    </div>
  );
}