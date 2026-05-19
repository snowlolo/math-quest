// Returns a random math question for Grade 3/4 students.
// Each question has: { question, answer, hint, topic }
// Hints never give the final answer.

function getQuestion() {
  var topics = [
    getFractionQuestion,
    getMultiplicationQuestion,
    getDivisionQuestion,
    getPlaceValueQuestion,
    getTimeQuestion,
    getMeasurementQuestion,
    getWordProblemQuestion,
    getEqualsSignQuestion,
  ];

  var randomTopic = topics[Math.floor(Math.random() * topics.length)];
  return randomTopic();
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ── Fractions ────────────────────────────────────────────────────────────────

function getFractionQuestion() {
  var type = rand(1, 4);

  if (type === 1) {
    // Compare two unit fractions: which is bigger?
    var a = rand(2, 10);
    var b = rand(2, 10);
    while (b === a) b = rand(2, 10);
    var bigger = a < b ? a : b; // smaller denominator = bigger fraction
    return {
      question: "Which is bigger: 1/" + a + " or 1/" + b + "?",
      answer: "1/" + bigger,
      hint: "Think about cutting a pizza into " + a + " slices vs " + b + " slices. Which slice is larger?",
      topic: "fractions",
    };
  }

  if (type === 2) {
    // Half of a number
    var whole = rand(2, 20) * 2; // always even
    return {
      question: "What is 1/2 of " + whole + "?",
      answer: whole / 2,
      hint: "Split " + whole + " into 2 equal groups. How many are in each group?",
      topic: "fractions",
    };
  }

  if (type === 3) {
    // What fraction is shaded?
    var total = rand(2, 8);
    var shaded = rand(1, total - 1);
    return {
      question: "A shape is split into " + total + " equal parts and " + shaded + " parts are shaded. What fraction is shaded?",
      answer: shaded + "/" + total,
      hint: "The bottom number is how many parts in total. The top number is how many are shaded.",
      topic: "fractions",
    };
  }

  // type === 4: fraction of a group
  var denom = pick([2, 3, 4]);
  var groups = rand(2, 6);
  var total2 = denom * groups;
  return {
    question: "What is 1/" + denom + " of " + total2 + "?",
    answer: groups,
    hint: "Split " + total2 + " into " + denom + " equal groups. How many are in each group?",
    topic: "fractions",
  };
}


// ── Multiplication ───────────────────────────────────────────────────────────

function getMultiplicationQuestion() {
  var a = rand(2, 10);
  var b = rand(2, 10);
  return {
    question: "What is " + a + " × " + b + "?",
    answer: a * b,
    hint: "Try skip counting by " + a + ", " + b + " times.",
    topic: "multiplication",
  };
}


// ── Division ─────────────────────────────────────────────────────────────────

function getDivisionQuestion() {
  var b = rand(2, 10);
  var answer = rand(2, 10);
  var a = b * answer;
  return {
    question: "What is " + a + " ÷ " + b + "?",
    answer: answer,
    hint: "Think: how many groups of " + b + " fit into " + a + "?",
    topic: "division",
  };
}


// ── Place Value ──────────────────────────────────────────────────────────────

function getPlaceValueQuestion() {
  var type = rand(1, 4);

  if (type === 1) {
    // Value of a digit
    var hundreds = rand(1, 9);
    var tens = rand(0, 9);
    var ones = rand(0, 9);
    var number = hundreds * 100 + tens * 10 + ones;
    var places = [];
    places.push({ digit: hundreds, place: "hundreds", value: hundreds * 100 });
    if (tens > 0) places.push({ digit: tens, place: "tens", value: tens * 10 });
    if (ones > 0) places.push({ digit: ones, place: "ones", value: ones });
    var chosen = pick(places);
    return {
      question: "What is the value of the digit " + chosen.digit + " in " + number + "?",
      answer: chosen.value,
      hint: "Find the digit " + chosen.digit + " in " + number + ". Is it in the ones, tens, or hundreds place?",
      topic: "place value",
    };
  }

  if (type === 2) {
    // Build the number from parts
    var h = rand(1, 9);
    var t = rand(0, 9);
    var o = rand(0, 9);
    return {
      question: "What number has " + h + " hundreds, " + t + " tens, and " + o + " ones?",
      answer: h * 100 + t * 10 + o,
      hint: "Hundreds come first, then tens, then ones. Put them together.",
      topic: "place value",
    };
  }

  if (type === 3) {
    // Expanded form addition
    var h2 = rand(1, 9);
    var t2 = rand(1, 9);
    var o2 = rand(1, 9);
    return {
      question: "What is " + (h2 * 100) + " + " + (t2 * 10) + " + " + o2 + "?",
      answer: h2 * 100 + t2 * 10 + o2,
      hint: "Each part tells you a place value. Put the hundreds, tens, and ones together.",
      topic: "place value",
    };
  }

  // type === 4: round to nearest ten
  var n = rand(11, 99);
  var rounded = Math.round(n / 10) * 10;
  return {
    question: "Round " + n + " to the nearest ten.",
    answer: rounded,
    hint: "Look at the ones digit of " + n + ". If it is 5 or more, round up. If it is less than 5, round down.",
    topic: "place value",
  };
}


// ── Telling Time ─────────────────────────────────────────────────────────────

function getTimeQuestion() {
  var type = rand(1, 3);

  if (type === 1) {
    // Read a clock time
    var hour = rand(1, 12);
    var minuteChoices = [0, 15, 30, 45];
    var minutes = pick(minuteChoices);
    var minuteStr = minutes < 10 ? "0" + minutes : "" + minutes;
    var longHandDescriptions = { 0: "12", 15: "3", 30: "6", 45: "9" };
    var longHand = longHandDescriptions[minutes];
    return {
      question: "The short hand points to " + hour + " and the long hand points to " + longHand + ". What time is it?",
      answer: hour + ":" + minuteStr,
      hint: "Count by 5s from 12 to where the long hand points to find the minutes.",
      topic: "telling time",
    };
  }

  if (type === 2) {
    // Add minutes to a time
    var startHour = rand(1, 11);
    var addMinutes = pick([15, 30, 45]);
    var startTotal = startHour * 60;
    var endTotal = startTotal + addMinutes;
    var endHour = Math.floor(endTotal / 60);
    var endMin = endTotal % 60;
    var endMinStr = endMin < 10 ? "0" + endMin : "" + endMin;
    return {
      question: "It is " + startHour + ":00. What time will it be in " + addMinutes + " minutes?",
      answer: endHour + ":" + endMinStr,
      hint: "Start at " + startHour + ":00 and count forward by 5s until you have counted " + addMinutes + " minutes.",
      topic: "telling time",
    };
  }

  // type === 3: elapsed hours
  var fromHour = rand(1, 6);
  var duration = rand(1, 5);
  var toHour = fromHour + duration;
  return {
    question: "An event starts at " + fromHour + ":00 and ends at " + toHour + ":00. How many hours long is it?",
    answer: duration,
    hint: "Count forward from " + fromHour + " to " + toHour + ". How many hours did you count?",
    topic: "telling time",
  };
}


// ── Measurement ──────────────────────────────────────────────────────────────

function getMeasurementQuestion() {
  var type = rand(1, 4);

  if (type === 1) {
    // Perimeter of rectangle
    var l = rand(2, 12);
    var w = rand(2, 12);
    return {
      question: "A rectangle is " + l + " cm long and " + w + " cm wide. What is its perimeter?",
      answer: 2 * (l + w),
      hint: "Perimeter means all the way around. Add all 4 sides: " + l + " + " + w + " + " + l + " + " + w + ".",
      topic: "measurement",
    };
  }

  if (type === 2) {
    // Area of rectangle
    var l2 = rand(2, 12);
    var w2 = rand(2, 12);
    return {
      question: "A rectangle is " + l2 + " cm long and " + w2 + " cm wide. What is its area?",
      answer: l2 * w2,
      hint: "Area is the space inside. Multiply the length by the width.",
      topic: "measurement",
    };
  }

  if (type === 3) {
    // Perimeter of square
    var side = rand(2, 15);
    return {
      question: "A square has sides of " + side + " cm. What is its perimeter?",
      answer: side * 4,
      hint: "A square has 4 equal sides. Add " + side + " four times, or multiply by 4.",
      topic: "measurement",
    };
  }

  // type === 4: ruler reading (always start at 0)
  var length = rand(3, 20);
  return {
    question: "You place a pencil starting at 0 cm on a ruler. The other end reaches " + length + " cm. How long is the pencil?",
    answer: length + " cm",
    hint: "When you start at 0, the number at the other end is the length. Make sure you started at 0, not 1.",
    topic: "measurement",
  };
}


// ── Word Problems ────────────────────────────────────────────────────────────

function getWordProblemQuestion() {
  var type = rand(1, 4);

  if (type === 1) {
    // Equal sharing (division)
    var divisor = pick([2, 3, 4, 5, 6]);
    var answer = rand(2, 10);
    var total = divisor * answer;
    var things = pick(["students", "apples", "stickers", "books", "crayons"]);
    var containers = pick(["tables", "bags", "boxes", "groups", "friends"]);
    return {
      question: "There are " + total + " " + things + " shared equally between " + divisor + " " + containers + ". How many " + things + " does each " + containers.slice(0, -1) + " get?",
      answer: answer,
      hint: "Shared equally means split into groups. Which operation do you use to split into equal groups?",
      topic: "word problems",
    };
  }

  if (type === 2) {
    // Equal groups (multiplication)
    var groups = rand(2, 9);
    var perGroup = rand(2, 9);
    var items = pick(["apples", "stickers", "pencils", "books", "cookies"]);
    var containers2 = pick(["bags", "boxes", "baskets", "shelves", "plates"]);
    return {
      question: "There are " + groups + " " + containers2 + " with " + perGroup + " " + items + " in each. How many " + items + " are there in total?",
      answer: groups * perGroup,
      hint: "You have equal groups. That is a clue — which operation do you use for equal groups?",
      topic: "word problems",
    };
  }

  if (type === 3) {
    // Subtraction story
    var start = rand(20, 80);
    var given = rand(5, start - 5);
    var names = pick(["Maya", "Jake", "Priya", "Leo", "Sofia"]);
    var items2 = pick(["stickers", "marbles", "cards", "coins", "beads"]);
    return {
      question: names + " had " + start + " " + items2 + " and gave " + given + " to a friend. How many does " + names + " have left?",
      answer: start - given,
      hint: "She is giving some away, so the total gets smaller. What operation makes a number smaller?",
      topic: "word problems",
    };
  }

  // type === 4: addition story
  var day1 = rand(10, 50);
  var day2 = rand(10, 50);
  var names2 = pick(["Maya", "Jake", "Priya", "Leo", "Sofia"]);
  var activity = pick(["pages read", "stickers collected", "points scored", "steps walked"]);
  return {
    question: names2 + " got " + day1 + " " + activity + " on Monday and " + day2 + " on Tuesday. How many " + activity + " in total?",
    answer: day1 + day2,
    hint: "You are joining two amounts together. What operation joins numbers?",
    topic: "word problems",
  };
}


// ── Equals Sign (Balance) ────────────────────────────────────────────────────

function getEqualsSignQuestion() {
  var type = rand(1, 2);

  if (type === 1) {
    // a + b = ___ + c  →  find blank
    var a = rand(1, 10);
    var b = rand(1, 10);
    var c = rand(1, a + b - 1); // ensure blank is positive
    var blank = a + b - c;
    return {
      question: a + " + " + b + " = ___ + " + c + ". What number goes in the blank?",
      answer: blank,
      hint: "Both sides of the = sign must equal the same amount. What does " + a + " + " + b + " equal?",
      topic: "equals sign",
    };
  }

  // type === 2: ___ + a = b + c  →  find blank
  var b2 = rand(1, 10);
  var c2 = rand(1, 10);
  var total2 = b2 + c2;
  var a2 = rand(1, total2 - 1);
  var blank2 = total2 - a2;
  return {
    question: "___ + " + a2 + " = " + b2 + " + " + c2 + ". What number goes in the blank?",
    answer: blank2,
    hint: "Work out " + b2 + " + " + c2 + " first. Then ask: what plus " + a2 + " gives that same total?",
    topic: "equals sign",
  };
}
