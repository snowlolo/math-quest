// Kahoot-style scoring system.
// Points per question: 1000 (under 1 second) down to 500 minimum.
// Scores are stored per player name in localStorage.

var TIME_LIMIT = 30;
var MAX_POINTS = 1000;
var MIN_POINTS = 500;

var questionStartTime = null;

function startTimer() {
  questionStartTime = Date.now();
}

function submitAnswer(playerAnswer, correctAnswer) {
  var timeTaken = (Date.now() - questionStartTime) / 1000;
  var correct = String(playerAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();
  var pointsEarned = 0;

  if (correct) {
    pointsEarned = calculatePoints(timeTaken);
    addToScore(pointsEarned);
  }

  return {
    correct: correct,
    pointsEarned: pointsEarned,
    timeTaken: Math.round(timeTaken * 10) / 10,
    totalScore: getTotalScore(),
  };
}

function calculatePoints(timeTaken) {
  if (timeTaken <= 1) return MAX_POINTS;
  var slowest = TIME_LIMIT - 1;
  var elapsed = Math.min(timeTaken - 1, slowest);
  var ratio = elapsed / slowest;
  return Math.round(MAX_POINTS - ratio * (MAX_POINTS - MIN_POINTS));
}

// ── Per-player localStorage helpers ──────────────────────────────────────────

function getCurrentPlayer() {
  return localStorage.getItem("mathGameCurrentPlayer") || "Player";
}

function getAllScores() {
  var saved = localStorage.getItem("mathGameAllScores");
  return saved ? JSON.parse(saved) : {};
}

function getTotalScore() {
  var scores = getAllScores();
  return scores[getCurrentPlayer()] || 0;
}

function addToScore(points) {
  var scores = getAllScores();
  var player = getCurrentPlayer();
  scores[player] = (scores[player] || 0) + points;
  localStorage.setItem("mathGameAllScores", JSON.stringify(scores));
}

function deductFromScore(points) {
  var scores = getAllScores();
  var player = getCurrentPlayer();
  scores[player] = Math.max(0, (scores[player] || 0) - points);
  localStorage.setItem("mathGameAllScores", JSON.stringify(scores));
}

function resetScore() {
  var scores = getAllScores();
  scores[getCurrentPlayer()] = 0;
  localStorage.setItem("mathGameAllScores", JSON.stringify(scores));
}
