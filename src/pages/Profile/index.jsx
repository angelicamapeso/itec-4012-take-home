import "./styles.scss";

import { useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import WoopsBuilder from "../../components/WoopsBuilder";
import WoopsContext from "../../context/woopsContext";

import WoopsFeed from "../../components/WoopsFeed";

export default function Profile() {
  const navigate = useNavigate();
  const [ user, setUser ] = useState(null);
  const [ userWoops, setUserWoops ] = useState([]);
  const woopsData = useContext(WoopsContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser(newUser);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      if (woopsData.woops.length === 0) {
        getWoopData();
      } else {
        const userWoopData = woopsData.getUserWoops(user.email);
        setUserWoops(userWoopData);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const userWoopData = woopsData.getUserWoops(user.email);
      setUserWoops(userWoopData);
    }
  }, [user, woopsData.woops])

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
      woopsData.initializeWoops(sortedWoops);
      setUserWoops(sortedWoops.filter(woop => woop.email === user.email));
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-info">
        <h1>How are you doing, { user ? user.email.match(/^.+(?=@)/)[0] : "username" }?</h1>
        <div className="profile-msg">
          { userWoops.length === 0 ?
            <p>Don't be ashamed. Everyone makes mistakes! Everyone has those days!</p> :
            <>
              <p>So far, you've <span className="bold">wooped</span> {userWoops.length} time{userWoops.length > 1 ? "s" : ""}! That's a lot of learning you've done!</p>
              <p>Care to share more? Or maybe we'll just look back on it and laugh (or try to!)</p>
            </>
          }
        </div>
      </div>
      <WoopsBuilder />
      <WoopsFeed woopsList={userWoops} />
    </div>
  );
}