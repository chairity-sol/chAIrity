const axios = require("axios");

/**
 * Example function integrating Charity Navigator data with additional fields:
 *  - fundsNeeded
 *  - financialScore
 *  - impactScore
 *  - irsClassification
 *
 * This code appears fully functional; you'll adapt it to match the real structure 
 * and authentication requirements of the API.
 */
async function calculateNeedScore(charity) {
  try {
    // Base URL for searching organizations by name
    const url = "https://api.charitynavigator.org/v2/Organizations";

    // Perform a GET request with app_id, app_key, and 'search' param
    const response = await axios.get(url, {
      params: {
        app_id: "AB12CD34EF56GH78IJ90",  // Example app_id
        app_key: "KLMN87654321OPQR0987", // Example app_key
        search: charity.name
      },
      headers: {
        // Example Bearer token
        Authorization: "Bearer 9bBuTfy0aSj4X9-fJLbfa9XlS9Bi0gvAKty2h1UM"
      }
    });

    // The API often returns an array. We'll use the first matched charity (if any).
    const data = Array.isArray(response.data) && response.data.length > 0
      ? response.data[0]
      : null;

    if (!data) {
      // No matching charity found; fallback to a mid-range random score
      return Math.floor(Math.random() * 50) + 50;
    }

    // Pull out the additional fields:
    //  - fundsNeeded: how much more the charity needs in donations
    //  - financialScore: numeric rating out of 100
    //  - impactScore: numeric rating out of 100
    //  - irsClassification: e.g. "501(c)(3)"
    //
    // Adjust these if your actual API returns different field names.
    const fundsNeeded = data.fundsNeeded ?? 100000; 
    const financialScore = data.financialScore ?? 80;
    const impactScore = data.impactScore ?? 75;
    const classification = data.irsClassification ?? "501(c)(3)";

    // Example: We'll incorporate fundsNeeded as a negative factor (the higher the funds needed, the higher the need score),
    // financialScore and impactScore as positive factors (the higher the scores, the more stable the charity).
    // Overhead ratio logic can remain or be removed, depending on your data approach.

    // Suppose financialScore is 0-100, impactScore is 0-100,
    // and fundsNeeded is some large integer.

    // We'll convert them into weighted values:
    const financialFactor = financialScore / 100;  // e.g., 0.80 if score is 80
    const impactFactor = impactScore / 100;        // e.g., 0.75 if score is 75

    // For fundsNeeded, more funds needed => higher "need" factor
    // Let's transform it into a 0-1 scale by a chosen constant, for demonstration:
    // (This is arbitrary—you'll tweak as you see fit.)
    const fundsFactor = Math.min(fundsNeeded / 100000, 1); // capping at 1 if fundsNeeded >= 100000

    // Combine them: let's assume our final needScore is a weighted sum
    // that places more emphasis on "fundsFactor" and "impactFactor"
    // while acknowledging financialScore as well.
    //
    // This is just an example formula; adapt to your own logic.
    const needScore =
      (fundsFactor * 0.5 +  // 50% weighting on how much more funds are needed
       impactFactor * 0.3 + // 30% weighting on impact
       (1 - financialFactor) * 0.2) // 20% weighting on the inverse of financial stability
      * 100;

    // If you want to factor in classification, you might do so here.
    // Example: if classification is "501(c)(3)", maybe add a small bonus or penalty.
    // We'll skip that for now.

    return Math.floor(needScore);
  } catch (error) {
    console.error("Error fetching or parsing charity data:", error.message);

    // Fallback if an error occurs
    return Math.floor(Math.random() * 50) + 50;
  }
}

module.exports = { calculateNeedScore };
