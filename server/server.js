const express = require("express");
const cors = require("cors");
const { calculateNeedScore } = require("./ai/needScore");

const app = express();
app.use(cors());
app.use(express.json());

// Example array of charities in-memory
let charities = [
  { id: 1, name: "Global Health", category: "Health", needScore: 0 },
  { id: 2, name: "Green Earth", category: "Environment", needScore: 0 },
];

// Endpoint to get charities
app.get("/api/charities", (req, res) => {
  res.json({ charities });
});

// Endpoint to update scores using an AI function
app.post("/api/update-scores", async (req, res) => {
  for (let charity of charities) {
    charity.needScore = await calculateNeedScore(charity);
  }
  res.json({ message: "Scores updated", charities });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
