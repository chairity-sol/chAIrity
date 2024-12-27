const axios = require("axios");

/**
 * Example function to retrieve data from the Charity Navigator API
 * and calculate a need score based on programExpensesRatio and rating.
 */
async function calculateNeedScore(charity) {
  try {
    // Charity Navigator search endpoint for organization data
    const url = "https://api.data.charitynavigator.org/v2/Organizations";

    // Perform a GET request with app_id, app_key, and the 'search' param
    const response = await axios.get(url, {
      params: {
        app_id: "AB12CD34EF56GH78IJ90",   // Example app_id
        app_key: "KLMN87654321OPQR0987", // Example app_key
        search: charity.name            // Searching by the charity's name
      },
      headers: {
        // Example Bearer token in the Authorization header
        Authorization: "Bearer 9bBuTfy0aSj4X9-fJLbfa9XlS9Bi0gvAKty2h1UM"
      }
    });

    // The API often returns an array of results. We'll grab the first one.
    const data = Array.isArray(response.data) && response.data.length > 0
      ? response.data[0]
      : null;

    if (!data) {
      // If no matching charity data is found, default to an intermediate score
      return Math.floor(Math.random() * 50) + 50;
    }

    // Suppose these fields appear in the response:
    //   programExpensesRatio: e.g., 0.85 if 85% of expenses go directly to programs
    //   financialRating.score: numeric value on a 0-100 scale
    // Adjust the field names if your actual response is different.

    const programRatio = data.programExpensesRatio ?? 0.8;
    const overheadRatio = 1 - programRatio; 
    const overheadFactor = overheadRatio > 0 ? 1 / overheadRatio : 1;

    const rating = data.financialRating?.score ?? 90;
    const ratingFactor = rating / 100; // Convert 0-100 to 0-1

    // Combine overheadFactor and ratingFactor
    const needScore = (overheadFactor * 0.5 + ratingFactor * 0.5) * 100;

    return Math.floor(needScore);
  } catch (error) {
    console.error("Error fetching data from Charity Navigator:", error.message);
    // In case of any error, return a fallback score
    return Math.floor(Math.random() * 50) + 50;
  }
}

module.exports = { calculateNeedScore };
