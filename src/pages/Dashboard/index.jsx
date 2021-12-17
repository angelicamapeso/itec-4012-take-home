import "./styles.scss";

import { useEffect, useState, useContext } from "react";

import WoopsContext from "../../context/woopsContext";

import WoopsBuilder from "../../components/WoopsBuilder";
import WoopsFeed from "../../components/WoopsFeed";

export default function Dashboard() {
  const [ feed, setFeed ] = useState([]);
  const woopsData = useContext(WoopsContext);

  useEffect(() => {
    if (woopsData.woops.length > 0) {
      setFeed(woopsData.woops);
    } else {
      getWoopData();
    }
  }, []);

  const getWoopData = async () => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/woops-store/databases/(default)/documents/woops/');
      const data = await response.json();
      const fData = data.documents.map(({
        fields: {
          text: { stringValue: textVal },
          email: { stringValue: emailVal },
        }
      }) => ({ email: emailVal, text: textVal }));
      setFeed(fData);
      woopsData.initializeWoops(fData);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="dashboard-wrapper">
      <WoopsBuilder />
      <WoopsFeed woopsList={feed} />
    </div>
  );
}