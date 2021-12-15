import "./styles.scss";

import { useContext } from "react";

import WoopsContext from "../../context/woopsContext";

import WoopsFeed from "../../components/WoopsFeed";

export default function Profile() {
  const woopsData = useContext(WoopsContext);

  return (
    <div className="profile-wrapper">
      <div className="profile-info">
        <h1>How are you doing, {"username"}?</h1>
        <div className="profile-msg">
          <p>So far, you've <span className="bold">wooped</span> {0} times! That's a lot of learning you've done!</p>
          <p>Let's look back on it and laugh (or try to!). Don't worry. You'll get em' next time!</p>
        </div>
      </div>
      <WoopsFeed woopsList={woopsData.woops} />
    </div>
  );
}