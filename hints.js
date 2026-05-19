// Hint system — costs 300 points per hint, one hint per question.
// Requires scoring.js to be loaded first.

var HINT_COST = 300;
var hintUsed = false;

function resetHint() {
  hintUsed = false;
}

function useHint(hintText) {
  if (hintUsed) {
    return { hint: hintText, cost: 0, totalScore: getTotalScore(), alreadyUsed: true };
  }
  hintUsed = true;
  deductFromScore(HINT_COST);
  return { hint: hintText, cost: HINT_COST, totalScore: getTotalScore(), alreadyUsed: false };
}
