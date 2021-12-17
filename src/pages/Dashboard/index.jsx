import "./styles.scss";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import WoopsContext from "../../context/woopsContext";

import WoopsFeed from "../../components/WoopsFeed";

export default function Dashboard() {
  const navigate = useNavigate();
  const [ feed, setFeed ] = useState([]);
  const woopsData = useContext(WoopsContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (newUser) => {
      if (!newUser) {
        navigate("/login");
      } else {
        if (woopsData.woops.length > 0) {
          setFeed(woopsData.woops);
        } else {
          getWoopData();
        }
      }
    });
  }, []);

  useEffect(() => {
    setFeed(woopsData.woops);
  }, [woopsData.woops])

  const getWoopData = async () => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/woops-store/databases/(default)/documents/woops/');
      const data = await response.json();
      const fData = data.documents.map(({
        fields: {
          text: { stringValue: textVal },
          email: { stringValue: emailVal },
        },
        updateTime,
      }) => ({ email: emailVal, text: textVal, updateTime }));
      const sortedWoops = woopsData.sortWoops(fData);
      setFeed(sortedWoops);
      woopsData.initializeWoops(sortedWoops);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="dashboard-wrapper">
      <h1>Feeling embarrassed? So are we!</h1>
      <WoopsFeed woopsList={feed} />
    </div>
  );
}