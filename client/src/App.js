import React, { useEffect, useState } from "react";
import Donate from "./components/Donate";

function App() {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    // Fetch the list of charities from the server
    fetch("http://localhost:4000/api/charities")
      .then((res) => res.json())
      .then((data) => {
        setCharities(data.charities);
      })
      .catch((err) => console.error(err));
  }, []);

  const updateScores = () => {
    fetch("http://localhost:4000/api/update-scores", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setCharities(data.charities);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>chAIrity</h1>
      <button onClick={updateScores}>Update Need Scores (AI Stub)</button>
      <ul>
        {charities.map((charity) => (
          <li key={charity.id}>
            {charity.name} - Score: {charity.needScore}
          </li>
        ))}
      </ul>

      <Donate />
    </div>
  );
}

export default App;
