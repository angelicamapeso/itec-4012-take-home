import "./styles.scss";

import { useContext } from "react";

import WoopsContext from "../../context/woopsContext";

import WoopsBuilder from "../../components/WoopsBuilder";
import WoopsFeed from "../../components/WoopsFeed";

export default function Dashboard() {
  const woopsData = useContext(WoopsContext);

  return (
    <div className="dashboard-wrapper">
      <WoopsBuilder />
      <WoopsFeed woopsList={woopsData.woops} />
    </div>
  );
}