import "./styles.scss";

import { useEffect, useState, useContext } from "react";
import WoopsContext from "../../context/woopsContext";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import Input from "../Input";

export default function WoopsBuilder({
  maxLength = "150",
}) {
  const [ woopText, setWoopText ] = useState("");
  const [ user, setUser ] = useState(null);
  const woopContext = useContext(WoopsContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
    });
  }, [])

  const onWoopChange = (e) => {
    setWoopText(e.target.value);
  }

  const submitWoop = async (e) => {
    e.preventDefault();

    const formattedData = {
      fields: {
        email: {
          stringValue: user.email,
        },
        text: {
          stringValue: woopText,
        },
      }
    };

    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/woops-store/databases/(default)/documents/woops/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formattedData)
      });
      woopContext.addWoop({ email: user.email, text: woopText });
      setWoopText("");
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <form className="woops-builder" onSubmit={submitWoop}>
      <textarea
        onChange={onWoopChange}
        placeholder="Mistakes were made!"
        value={woopText}
        maxLength={maxLength}
      ></textarea>
      <div className="build-footer">
        <p className="text-count">{woopText.length + "/" + maxLength}</p>
        <Input className="submit-btn" type="submit" value="Woops!"/>
      </div>
    </form>
  );
}