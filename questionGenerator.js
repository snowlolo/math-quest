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
    getPatternQuestion,
    getDataQuestion,
  ];
  return topics[Math.floor(Math.random() * topics.length)]();
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }


// ── Fractions ────────────────────────────────────────────────────────────────

function getFractionQuestion() {
  var type = rand(1, 4);

  if (type === 1) {
    var a = rand(2, 10), b = rand(2, 10);
    while (b === a) b = rand(2, 10);
    var bigger = a < b ? a : b;
    var smaller = a < b ? b : a;
    var pool = [2,3,4,5,6,7,8,9,10].filter(function(n) { return n !== a && n !== b; });
    return {
      question: "Which is bigger: 1/" + a + " or 1/" + b + "?",
      answer: "1/" + bigger,
      distractors: ["1/" + smaller, "1/" + pool[0], "1/" + pool[1]],
      hint: "Think about cutting a pizza into " + a + " slices vs " + b + " slices. Which slice is larger?",
      topic: "fractions",
    };
  }

  if (type === 2) {
    var whole = rand(3, 20) * 2;
    var ans2 = whole / 2;
    return {
      question: "What is 1/2 of " + whole + "?",
      answer: ans2,
      distractors: [String(whole), String(ans2 - 2), String(ans2 + 2)],
      hint: "Split " + whole + " into 2 equal groups. How many are in each group?",
      topic: "fractions",
    };
  }

  if (type === 3) {
    var total = rand(3, 8), shaded = rand(1, total - 1);
    var ans3 = shaded + "/" + total;
    var cands = [
      (total - shaded) + "/" + total,
      (shaded + 1 < total ? shaded + 1 : shaded - 1) + "/" + total,
      shaded + "/" + (total + 1),
      (shaded > 1 ? shaded - 1 : shaded + 2) + "/" + total,
    ];
    var ds3 = cands.filter(function(d, i, arr) {
      return d !== ans3 && arr.indexOf(d) === i;
    }).slice(0, 3);
    return {
      question: "A shape is split into " + total + " equal parts and " + shaded + " parts are shaded. What fraction is shaded?",
      answer: ans3,
      distractors: ds3,
      hint: "The bottom number is how many parts in total. The top number is how many are shaded.",
      topic: "fractions",
    };
  }

  var denom = pick([2, 3, 4]), groups = rand(2, 6), total2 = denom * groups;
  return {
    question: "What is 1/" + denom + " of " + total2 + "?",
    answer: groups,
    distractors: [String(total2), String(denom), String(groups + 1)],
    hint: "Split " + total2 + " into " + denom + " equal groups. How many are in each group?",
    topic: "fractions",
  };
}


// ── Multiplication ───────────────────────────────────────────────────────────

function getMultiplicationQuestion() {
  var a = rand(2, 10), b = rand(2, 10);
  return {
    question: "What is " + a + " x " + b + "?",
    answer: a * b,
    hint: "Try skip counting by " + a + ", " + b + " times.",
    topic: "multiplication",
  };
}


// ── Division ─────────────────────────────────────────────────────────────────

function getDivisionQuestion() {
  var b = rand(2, 10), answer = rand(2, 10);
  return {
    question: "What is " + (b * answer) + " / " + b + "?",
    answer: answer,
    hint: "Think: how many groups of " + b + " fit into " + (b * answer) + "?",
    topic: "division",
  };
}


// ── Place Value ──────────────────────────────────────────────────────────────

function getPlaceValueQuestion() {
  var type = rand(1, 4);

  if (type === 1) {
    var hundreds = rand(1, 9), tens = rand(0, 9), ones = rand(0, 9);
    var number = hundreds * 100 + tens * 10 + ones;
    var places = [{ digit: hundreds, place: "hundreds", value: hundreds * 100 }];
    if (tens > 0) places.push({ digit: tens, place: "tens", value: tens * 10 });
    if (ones > 0) places.push({ digit: ones, place: "ones", value: ones });
    var chosen = pick(places);
    var ds1 = [1, 10, 100, 1000]
      .map(function(p) { return chosen.digit * p; })
      .filter(function(v) { return v !== chosen.value; })
      .slice(0, 3)
      .map(String);
    return {
      question: "What is the value of the digit " + chosen.digit + " in " + number + "?",
      answer: chosen.value,
      distractors: ds1,
      hint: "Find the digit " + chosen.digit + " in " + number + ". Is it in the ones, tens, or hundreds place?",
      topic: "place value",
    };
  }

  if (type === 2) {
    var h = rand(1, 9), t = rand(0, 9), o = rand(0, 9);
    var ans2 = h * 100 + t * 10 + o;
    return {
      question: "What number has " + h + " hundreds, " + t + " tens, and " + o + " ones?",
      answer: ans2,
      distractors: [
        String(h * 100 + o * 10 + t),
        String(t * 100 + h * 10 + o),
        String(ans2 + 10),
      ],
      hint: "Hundreds come first, then tens, then ones. Put them together.",
      topic: "place value",
    };
  }

  if (type === 3) {
    var h2 = rand(1, 9), t2 = rand(1, 9), o2 = rand(1, 9);
    return {
      question: "What is " + (h2 * 100) + " + " + (t2 * 10) + " + " + o2 + "?",
      answer: h2 * 100 + t2 * 10 + o2,
      hint: "Each part tells you a place value. Put the hundreds, tens, and ones together.",
      topic: "place value",
    };
  }

  var n = rand(11, 99), rounded = Math.round(n / 10) * 10;
  var roundDown = n - (n % 10);
  var roundUp = roundDown + 10;
  var wrongWay = (rounded === roundDown) ? roundUp : roundDown;
  var further = (rounded === roundDown)
    ? (roundDown > 10 ? roundDown - 10 : roundUp + 10)
    : roundUp + 10;
  return {
    question: "Round " + n + " to the nearest ten.",
    answer: rounded,
    distractors: [String(n), String(wrongWay), String(further)],
    hint: "Look at the ones digit of " + n + ". If it is 5 or more, round up. If less than 5, round down.",
    topic: "place value",
  };
}


// ── Telling Time ─────────────────────────────────────────────────────────────

function getTimeQuestion() {
  var type = rand(1, 3);

  if (type === 1) {
    var hour = rand(1, 12);
    var minutes = pick([0, 15, 30, 45]);
    var minuteStr = minutes < 10 ? "0" + minutes : "" + minutes;
    var longHand = { 0: "12", 15: "3", 30: "6", 45: "9" }[minutes];
    var quarters = [0, 15, 30, 45];
    var qIdx = quarters.indexOf(minutes);
    var nextMin = quarters[(qIdx + 1) % 4];
    var nextMinStr = nextMin < 10 ? "0" + nextMin : "" + nextMin;
    var nextHour = (hour === 12 ? 1 : hour + 1);
    return {
      question: "The short hand points to " + hour + " and the long hand points to " + longHand + ". What time is it?",
      answer: hour + ":" + minuteStr,
      distractors: [
        hour + ":" + nextMinStr,
        nextHour + ":" + minuteStr,
        nextHour + ":" + nextMinStr,
      ],
      hint: "Count by 5s from 12 to where the long hand points to find the minutes.",
      topic: "telling time",
    };
  }

  if (type === 2) {
    var startHour = rand(1, 11), addMinutes = pick([15, 30, 45]);
    var endTotal = startHour * 60 + addMinutes;
    var endHour = Math.floor(endTotal / 60), endMin = endTotal % 60;
    var endMinStr = endMin < 10 ? "0" + endMin : "" + endMin;
    var wrongMins = (addMinutes === 15) ? 30 : 15;
    var wrongMinStr = wrongMins < 10 ? "0" + wrongMins : "" + wrongMins;
    var nextStartHour = (startHour === 12 ? 1 : startHour + 1);
    return {
      question: "It is " + startHour + ":00. What time will it be in " + addMinutes + " minutes?",
      answer: endHour + ":" + endMinStr,
      distractors: [
        startHour + ":00",
        nextStartHour + ":00",
        endHour + ":" + wrongMinStr,
      ],
      hint: "Start at " + startHour + ":00 and count forward by 5s until you have counted " + addMinutes + " minutes.",
      topic: "telling time",
    };
  }

  var fromHour = rand(1, 6), duration = rand(1, 5);
  return {
    question: "An event starts at " + fromHour + ":00 and ends at " + (fromHour + duration) + ":00. How many hours long is it?",
    answer: duration,
    distractors: [
      String(duration + 1),
      String(duration - 1 > 0 ? duration - 1 : duration + 2),
      String(fromHour + duration),
    ],
    hint: "Count forward from " + fromHour + " to " + (fromHour + duration) + ". How many hours did you count?",
    topic: "telling time",
  };
}


// ── Measurement (length, area, perimeter, mass, capacity) ────────────────────

function getMeasurementQuestion() {
  var type = rand(1, 8);

  // Perimeter of rectangle
  if (type === 1) {
    var l = rand(2, 12), w = rand(2, 12);
    var perim = 2 * (l + w);
    return {
      question: "A rectangle is " + l + " cm long and " + w + " cm wide. What is its perimeter?",
      answer: perim + " cm",
      distractors: [(l * w) + " cm", (l + w) + " cm", (perim + 4) + " cm"],
      hint: "Perimeter means all the way around. Add all 4 sides: " + l + " + " + w + " + " + l + " + " + w + ".",
      topic: "measurement",
    };
  }

  // Area of rectangle
  if (type === 2) {
    var l2 = rand(2, 12), w2 = rand(2, 12);
    var area = l2 * w2;
    return {
      question: "A rectangle is " + l2 + " cm long and " + w2 + " cm wide. What is its area?",
      answer: area + " cm²",
      distractors: [(2 * (l2 + w2)) + " cm²", (l2 + w2) + " cm²", (area + l2) + " cm²"],
      hint: "Area is the space inside. Multiply the length by the width.",
      topic: "measurement",
    };
  }

  // Perimeter of square
  if (type === 3) {
    var side = rand(2, 15);
    var sqPerim = side * 4;
    return {
      question: "A square has sides of " + side + " cm. What is its perimeter?",
      answer: sqPerim + " cm",
      distractors: [(side * 2) + " cm", (side * side) + " cm", (sqPerim + 4) + " cm"],
      hint: "A square has 4 equal sides. Add " + side + " four times, or multiply by 4.",
      topic: "measurement",
    };
  }

  // Ruler reading
  if (type === 4) {
    var length = rand(3, 20);
    return {
      question: "You place a pencil starting at 0 cm on a ruler. The other end reaches " + length + " cm. How long is the pencil?",
      answer: length + " cm",
      distractors: [(length - 1) + " cm", (length + 1) + " cm", (length + 2) + " cm"],
      hint: "When you start at 0, the number at the other end is the length.",
      topic: "measurement",
    };
  }

  // Metres to centimetres
  if (type === 5) {
    var m = rand(1, 10);
    return {
      question: "How many centimetres are in " + m + " m?",
      answer: (m * 100) + " cm",
      distractors: [(m * 10) + " cm", (m * 1000) + " cm", (m * 100 + 10) + " cm"],
      hint: "1 m = 100 cm. Multiply " + m + " by 100.",
      topic: "measurement",
    };
  }

  // Kilograms to grams
  if (type === 6) {
    var kg = rand(1, 10);
    return {
      question: "How many grams are in " + kg + " kg?",
      answer: (kg * 1000) + " g",
      distractors: [(kg * 100) + " g", (kg * 10) + " g", (kg * 1000 + 100) + " g"],
      hint: "1 kg = 1000 g. Multiply " + kg + " by 1000.",
      topic: "measurement",
    };
  }

  // Litres to millilitres
  if (type === 7) {
    var litres = rand(1, 5);
    return {
      question: "How many millilitres are in " + litres + " L?",
      answer: (litres * 1000) + " mL",
      distractors: [(litres * 100) + " mL", (litres * 10) + " mL", (litres * 1000 + 100) + " mL"],
      hint: "1 L = 1000 mL. Multiply " + litres + " by 1000.",
      topic: "measurement",
    };
  }

  // Capacity word problem
  var total = pick([500, 750, 1000]), poured = pick([100, 200, 250, 500]).valueOf();
  while (poured >= total) poured = pick([100, 200, 250]);
  return {
    question: "A jug holds " + total + " mL. You pour out " + poured + " mL. How much is left?",
    answer: (total - poured) + " mL",
    distractors: [(total + poured) + " mL", (total - poured + 100) + " mL", (total - poured - 100 > 0 ? total - poured - 100 : total - poured + 200) + " mL"],
    hint: "Subtract the amount poured out from the total.",
    topic: "measurement",
  };
}


// ── Patterns ─────────────────────────────────────────────────────────────────

function getPatternQuestion() {
  var type = rand(1, 3);

  if (type === 1) {
    // Counting-up pattern — find next term
    var start = rand(1, 10), step = pick([2, 3, 4, 5, 10]);
    var t = [start, start + step, start + 2 * step, start + 3 * step];
    var next = start + 4 * step;
    return {
      question: "What comes next: " + t.join(", ") + ", ___?",
      answer: next,
      distractors: [String(next + step), String(next - step), String(next + 1)],
      hint: "Find the difference between each number. Count on by that same amount.",
      topic: "patterns",
    };
  }

  if (type === 2) {
    // Counting-down pattern — find next term
    var start2 = rand(30, 60), step2 = pick([2, 3, 4, 5]);
    var t2 = [start2, start2 - step2, start2 - 2 * step2, start2 - 3 * step2];
    var next2 = start2 - 4 * step2;
    return {
      question: "What comes next: " + t2.join(", ") + ", ___?",
      answer: next2,
      distractors: [String(next2 + step2), String(next2 - step2), String(next2 + 1)],
      hint: "The numbers are going down. Find the difference between each pair and subtract that amount.",
      topic: "patterns",
    };
  }

  // Find the missing middle term
  var start3 = rand(1, 8), step3 = pick([2, 3, 4, 5]);
  var all = [start3, start3 + step3, start3 + 2 * step3, start3 + 3 * step3, start3 + 4 * step3];
  var pos = rand(1, 3);
  var missing = all[pos];
  var shown = all.slice();
  shown[pos] = "___";
  return {
    question: "Fill in the missing number: " + shown.join(", "),
    answer: missing,
    distractors: [String(missing + step3), String(missing - step3), String(missing + 1)],
    hint: "Count on or back by the same number each time.",
    topic: "patterns",
  };
}


// ── Data ─────────────────────────────────────────────────────────────────────

function getDataQuestion() {
  var type = rand(1, 2);

  if (type === 1) {
    // Find the mode (most frequent value)
    var modeVal = rand(2, 8);
    var pool = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(n) { return n !== modeVal; });
    var d1 = pool[rand(0, pool.length - 2)];
    var d2 = pool.filter(function(n) { return n !== d1; })[0];
    var data = [modeVal, d1, modeVal, d2, modeVal, d1].sort(function(a, b) { return a - b; });
    return {
      question: "Look at these numbers: " + data.join(", ") + ". Which number appears most often?",
      answer: modeVal,
      distractors: [String(d1), String(d2), String(modeVal + 1)],
      hint: "Count how many times each number appears. The one that appears the most is called the mode.",
      topic: "data",
    };
  }

  // Read a described bar graph — find the greatest
  var colours = ["Red", "Blue", "Green", "Yellow"];
  var counts = [rand(1, 10), rand(1, 10), rand(1, 10), rand(1, 10)];
  // Make sure there's a unique maximum
  var maxIdx = 0;
  for (var i = 1; i < counts.length; i++) { if (counts[i] > counts[maxIdx]) maxIdx = i; }
  // Avoid ties
  for (var j = 0; j < counts.length; j++) {
    if (j !== maxIdx && counts[j] >= counts[maxIdx]) counts[j] = counts[maxIdx] - 1;
  }
  var maxColour = colours[maxIdx];
  return {
    question: "In a bar graph: Red = " + counts[0] + ", Blue = " + counts[1] + ", Green = " + counts[2] + ", Yellow = " + counts[3] + ". Which colour has the most votes?",
    answer: maxColour,
    distractors: colours.filter(function(c) { return c !== maxColour; }),
    hint: "Find the largest number in the list. Which colour matches it?",
    topic: "data",
  };
}


// ── Word Problems ────────────────────────────────────────────────────────────

function getWordProblemQuestion() {
  var type = rand(1, 4);

  if (type === 1) {
    var divisor = pick([2, 3, 4, 5, 6]), answer = rand(2, 10), total = divisor * answer;
    var things = pick(["students", "apples", "stickers", "books", "crayons"]);
    var containers = pick(["tables", "bags", "boxes", "groups", "friends"]);
    return {
      question: "There are " + total + " " + things + " shared equally between " + divisor + " " + containers + ". How many " + things + " does each " + containers.slice(0, -1) + " get?",
      answer: answer,
      hint: "Shared equally means split into groups. Which operation splits into equal groups?",
      topic: "word problems",
    };
  }

  if (type === 2) {
    var groups = rand(2, 9), perGroup = rand(2, 9);
    var items = pick(["apples", "stickers", "pencils", "books", "cookies"]);
    var containers2 = pick(["bags", "boxes", "baskets", "shelves", "plates"]);
    return {
      question: "There are " + groups + " " + containers2 + " with " + perGroup + " " + items + " in each. How many " + items + " in total?",
      answer: groups * perGroup,
      hint: "You have equal groups. Which operation do you use for equal groups?",
      topic: "word problems",
    };
  }

  if (type === 3) {
    var start = rand(20, 80), given = rand(5, start - 5);
    var name = pick(["Maya", "Jake", "Priya", "Leo", "Sofia"]);
    var items2 = pick(["stickers", "marbles", "cards", "coins", "beads"]);
    return {
      question: name + " had " + start + " " + items2 + " and gave " + given + " to a friend. How many does " + name + " have left?",
      answer: start - given,
      hint: "She is giving some away, so the total gets smaller. What operation makes a number smaller?",
      topic: "word problems",
    };
  }

  var day1 = rand(10, 50), day2 = rand(10, 50);
  var name2 = pick(["Maya", "Jake", "Priya", "Leo", "Sofia"]);
  var activity = pick(["pages read", "stickers collected", "points scored", "steps walked"]);
  return {
    question: name2 + " got " + day1 + " " + activity + " on Monday and " + day2 + " on Tuesday. How many " + activity + " in total?",
    answer: day1 + day2,
    hint: "You are joining two amounts together. What operation joins numbers?",
    topic: "word problems",
  };
}


// ── Equals Sign ──────────────────────────────────────────────────────────────

function getEqualsSignQuestion() {
  var type = rand(1, 2);

  if (type === 1) {
    var a = rand(1, 10), b = rand(1, 10), c = rand(1, a + b - 1);
    var ans1 = a + b - c;
    var d2 = (c === ans1) ? c + 1 : c;
    return {
      question: a + " + " + b + " = ___ + " + c + ". What number goes in the blank?",
      answer: ans1,
      distractors: [String(a + b), String(d2), String(ans1 + 2)],
      hint: "Both sides of the = sign must be equal. What does " + a + " + " + b + " equal?",
      topic: "equals sign",
    };
  }

  var b2 = rand(1, 10), c2 = rand(1, 10), total = b2 + c2, a2 = rand(1, total - 1);
  var ans2 = total - a2;
  var d2_2 = (a2 === ans2) ? a2 + 1 : a2;
  return {
    question: "___ + " + a2 + " = " + b2 + " + " + c2 + ". What number goes in the blank?",
    answer: ans2,
    distractors: [String(total), String(d2_2), String(ans2 + 2)],
    hint: "Work out " + b2 + " + " + c2 + " first. Then ask: what plus " + a2 + " gives that same total?",
    topic: "equals sign",
  };
}
