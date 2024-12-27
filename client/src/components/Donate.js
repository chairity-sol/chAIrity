import React from "react";

function Donate() {
  const handleDonate = () => {
    // Placeholder for connecting wallet + sending tokens
    alert("Donation flow coming soon!");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Donate</h2>
      <p>Select a currency (SOL, USDC, or $chAIrity) and enter amount.</p>
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
}

export default Donate;
