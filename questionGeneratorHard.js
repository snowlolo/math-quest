// Grade 4-5 questions used exclusively in Hard Mode.

function getHardQuestion() {
  var topics = [
    getHardFractionQuestion,
    getHardMultiplicationQuestion,
    getHardDivisionQuestion,
    getHardPlaceValueQuestion,
    getHardDecimalQuestion,
    getHardMeasurementQuestion,
    getHardWordProblemQuestion,
    getHardEqualsQuestion,
    getHardPatternQuestion,
    getHardDataQuestion,
    getHardAngleQuestion,
  ];
  return topics[Math.floor(Math.random() * topics.length)]();
}

function pickH(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randH(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }


// ── Fractions ────────────────────────────────────────────────────────────────

function getHardFractionQuestion() {
  var type = randH(1, 4);

  if (type === 1) {
    var d = pickH([4, 6, 8, 10]);
    var a = randH(1, d - 2), b = randH(1, d - a - 1);
    var num = a + b;
    function gcd(x, y) { return y === 0 ? x : gcd(y, x % y); }
    var g = gcd(num, d);
    var ans = (num / g) + "/" + (d / g);
    if (d / g === 1) ans = String(num / g);
    return {
      question: a + "/" + d + " + " + b + "/" + d + " = ? (simplify)",
      answer: ans,
      hint: "Add the top numbers, keep the bottom, then divide both by their common factor.",
      topic: "fractions",
    };
  }

  if (type === 2) {
    var denom = pickH([3, 4, 5, 6, 8]);
    var mult = randH(2, 8);
    var total = denom * mult;
    var numPart = randH(2, denom - 1);
    return {
      question: "What is " + numPart + "/" + denom + " of " + total + "?",
      answer: numPart * mult,
      hint: "Divide " + total + " by " + denom + " to get one part, then multiply by " + numPart + ".",
      topic: "fractions",
    };
  }

  if (type === 3) {
    var num2 = randH(1, 5), den2 = randH(2, 6), m = randH(2, 5);
    return {
      question: num2 + "/" + den2 + " = ?/" + (den2 * m) + ". What is the missing numerator?",
      answer: num2 * m,
      hint: "The denominator was multiplied by " + m + ". Do the same to the numerator.",
      topic: "fractions",
    };
  }

  var d3 = pickH([4, 6, 8, 10]);
  var a3 = randH(2, d3 - 1), b3 = randH(1, a3 - 1);
  var numD = a3 - b3;
  function gcd2(x, y) { return y === 0 ? x : gcd2(y, x % y); }
  var g3 = gcd2(numD, d3);
  var ans3 = (numD / g3) + "/" + (d3 / g3);
  if (d3 / g3 === 1) ans3 = String(numD / g3);
  return {
    question: a3 + "/" + d3 + " - " + b3 + "/" + d3 + " = ? (simplify)",
    answer: ans3,
    hint: "Subtract the top numbers, keep the bottom, then simplify.",
    topic: "fractions",
  };
}


// ── Multiplication ───────────────────────────────────────────────────────────

function getHardMultiplicationQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    var a = randH(11, 25), b = randH(11, 25);
    return {
      question: "What is " + a + " x " + b + "?",
      answer: a * b,
      hint: "Break it up: (" + Math.floor(a / 10) * 10 + " x " + b + ") + (" + (a % 10) + " x " + b + ").",
      topic: "multiplication",
    };
  }

  if (type === 2) {
    var a2 = randH(101, 500), b2 = randH(3, 9);
    return {
      question: "What is " + a2 + " x " + b2 + "?",
      answer: a2 * b2,
      hint: "Multiply each digit of " + a2 + " by " + b2 + " from right to left.",
      topic: "multiplication",
    };
  }

  var factor = randH(6, 12), product = factor * randH(6, 12);
  return {
    question: factor + " x ? = " + product + ". What is the missing number?",
    answer: product / factor,
    hint: "Divide " + product + " by " + factor + ".",
    topic: "multiplication",
  };
}


// ── Division ─────────────────────────────────────────────────────────────────

function getHardDivisionQuestion() {
  var type = randH(1, 2);

  if (type === 1) {
    var divisor = randH(2, 9), quotient = randH(11, 99);
    return {
      question: "What is " + (divisor * quotient) + " / " + divisor + "?",
      answer: quotient,
      hint: "How many times does " + divisor + " go into " + (divisor * quotient) + "? Try estimating first.",
      topic: "division",
    };
  }

  var d2 = randH(3, 9), q2 = randH(5, 20), r = randH(1, d2 - 1);
  var dividend = d2 * q2 + r;
  return {
    question: "What is the remainder when " + dividend + " is divided by " + d2 + "?",
    answer: r,
    hint: "Find the largest multiple of " + d2 + " that fits inside " + dividend + ", then subtract.",
    topic: "division",
  };
}


// ── Place Value ──────────────────────────────────────────────────────────────

function getHardPlaceValueQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    var n = randH(100, 9999), rounded = Math.round(n / 100) * 100;
    return {
      question: "Round " + n + " to the nearest hundred.",
      answer: rounded,
      hint: "Look at the tens digit. 5 or more rounds up; less than 5 rounds down.",
      topic: "place value",
    };
  }

  if (type === 2) {
    var big = randH(10000, 999999);
    var str = String(big);
    var idx = randH(0, str.length - 1);
    var digit = parseInt(str[idx]);
    var placeVal = digit * Math.pow(10, str.length - 1 - idx);
    return {
      question: "What is the value of the digit " + digit + " in " + big + "?",
      answer: placeVal,
      hint: "Count from the right: ones, tens, hundreds, thousands... Where does that digit sit?",
      topic: "place value",
    };
  }

  var n3 = randH(1000, 99999), rounded3 = Math.round(n3 / 1000) * 1000;
  return {
    question: "Round " + n3 + " to the nearest thousand.",
    answer: rounded3,
    hint: "Look at the hundreds digit. 5 or more rounds up; less than 5 rounds down.",
    topic: "place value",
  };
}


// ── Decimals ─────────────────────────────────────────────────────────────────

function getHardDecimalQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    var a = randH(1, 99) / 10, b = randH(1, 99) / 10;
    var sum = Math.round((a + b) * 10) / 10;
    return {
      question: "What is " + a.toFixed(1) + " + " + b.toFixed(1) + "?",
      answer: sum,
      hint: "Line up the decimal points before adding.",
      topic: "decimals",
    };
  }

  if (type === 2) {
    var a2 = randH(20, 99) / 10, b2 = randH(1, Math.floor(a2 * 10) - 1) / 10;
    var diff = Math.round((a2 - b2) * 10) / 10;
    return {
      question: "What is " + a2.toFixed(1) + " - " + b2.toFixed(1) + "?",
      answer: diff,
      hint: "Line up the decimal points before subtracting.",
      topic: "decimals",
    };
  }

  var pairs = [[1,2,0.5],[1,4,0.25],[3,4,0.75],[1,5,0.2],[2,5,0.4],[3,5,0.6],[4,5,0.8],[1,10,0.1],[3,10,0.3]];
  var p = pickH(pairs);
  return {
    question: "What is " + p[0] + "/" + p[1] + " as a decimal?",
    answer: p[2],
    hint: "Divide " + p[0] + " by " + p[1] + ".",
    topic: "decimals",
  };
}


// ── Measurement (with units enforced) ────────────────────────────────────────

function getHardMeasurementQuestion() {
  var type = randH(1, 4);

  if (type === 1) {
    // Area of triangle
    var base = randH(2, 16), height = randH(2, 12);
    while ((base * height) % 2 !== 0) height = randH(2, 12);
    var triArea = (base * height) / 2;
    return {
      question: "A triangle has a base of " + base + " cm and a height of " + height + " cm. What is its area?",
      answer: triArea + " cm²",
      distractors: [(base * height) + " cm²", (base + height) + " cm²", (triArea + base) + " cm²"],
      hint: "Area of a triangle = (base × height) ÷ 2.",
      topic: "measurement",
    };
  }

  if (type === 2) {
    // Volume of cuboid
    var l = randH(2, 10), w = randH(2, 10), h = randH(2, 10);
    var vol = l * w * h;
    return {
      question: "A box is " + l + " cm long, " + w + " cm wide, and " + h + " cm tall. What is its volume?",
      answer: vol + " cm³",
      distractors: [(l * w + h) + " cm³", (2 * (l * w + l * h + w * h)) + " cm³", (vol + l) + " cm³"],
      hint: "Volume = length × width × height.",
      topic: "measurement",
    };
  }

  if (type === 3) {
    // km to m
    var km = randH(1, 20);
    return {
      question: "How many metres are in " + km + " km?",
      answer: (km * 1000) + " m",
      distractors: [(km * 100) + " m", (km * 10) + " m", (km * 1000 + 100) + " m"],
      hint: "1 km = 1000 m. Multiply by 1000.",
      topic: "measurement",
    };
  }

  // Perimeter of compound shape (L-shape described as two rectangles)
  var a = randH(2, 8), b = randH(2, 8), c = randH(2, 6), d = randH(2, 6);
  // An L-shape: outer rectangle a×b with a notch c×d removed from one corner
  // Perimeter = 2*(a+b) + 2*c (the notch adds 2 extra sides of length c and d,
  // but also removes 2 sides of c and d — net effect is perim = 2*(a+b))
  // Actually let's do simpler: perimeter of rectangle a×b = 2*(a+b)
  // and area of compound shape
  // Let me just do a straightforward perimeter of a shape whose sides are given
  var sides = [randH(3, 10), randH(3, 10), randH(3, 10), randH(3, 10), randH(3, 10), randH(3, 10)];
  var hexPerim = sides.reduce(function(s, n) { return s + n; }, 0);
  return {
    question: "A shape has 6 sides measuring: " + sides.join(" cm, ") + " cm. What is its perimeter?",
    answer: hexPerim + " cm",
    distractors: [(hexPerim + 5) + " cm", (hexPerim - 5) + " cm", (hexPerim * 2) + " cm"],
    hint: "Perimeter = add all the sides together.",
    topic: "measurement",
  };
}


// ── Patterns ─────────────────────────────────────────────────────────────────

function getHardPatternQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    // Multiply pattern (×2 or ×3)
    var start = randH(1, 5), mult = pickH([2, 3]);
    var t = [start, start * mult, start * mult * mult, start * mult * mult * mult];
    var next = t[3] * mult;
    return {
      question: "What comes next: " + t.join(", ") + ", ___?",
      answer: next,
      distractors: [String(next + t[3]), String(next - t[2]), String(next + mult)],
      hint: "Each number is multiplied by the same value. What is each term divided by the one before it?",
      topic: "patterns",
    };
  }

  if (type === 2) {
    // Two-step pattern: +a, +b, +a, +b...
    var a = randH(2, 5), b = randH(2, 5);
    while (b === a) b = randH(2, 5);
    var s = randH(1, 10);
    var seq = [s, s + a, s + a + b, s + 2 * a + b, s + 2 * a + 2 * b];
    var nextP = seq[4] + a;
    return {
      question: "What comes next: " + seq.join(", ") + ", ___?",
      answer: nextP,
      distractors: [String(nextP + b), String(nextP - a), String(nextP + a)],
      hint: "Look at the differences: they alternate between two values. Which difference comes next?",
      topic: "patterns",
    };
  }

  // Find the rule and state it: given sequence, what is term 6?
  var start3 = randH(1, 5), step3 = randH(3, 8);
  var seq3 = [start3, start3 + step3, start3 + 2 * step3, start3 + 3 * step3, start3 + 4 * step3];
  var term6 = start3 + 5 * step3;
  return {
    question: "The pattern is: " + seq3.join(", ") + ", ... What is the 6th term?",
    answer: term6,
    distractors: [String(term6 + step3), String(term6 - step3), String(term6 + 1)],
    hint: "Find the difference between terms. Multiply that by 5 and add to the first term.",
    topic: "patterns",
  };
}


// ── Data (mean, median, mode) ─────────────────────────────────────────────────

function getHardDataQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    // Find the mean of 4-5 numbers
    var count = randH(4, 5);
    var nums = [];
    for (var i = 0; i < count; i++) nums.push(randH(1, 20));
    var sum = nums.reduce(function(s, n) { return s + n; }, 0);
    // Only use when mean is a whole number
    while (sum % count !== 0) {
      nums[randH(0, count - 1)] = randH(1, 20);
      sum = nums.reduce(function(s, n) { return s + n; }, 0);
    }
    var mean = sum / count;
    return {
      question: "Find the mean (average) of: " + nums.join(", "),
      answer: mean,
      distractors: [String(mean + 1), String(mean - 1), String(mean + 2)],
      hint: "Add all the numbers together, then divide by how many numbers there are (" + count + ").",
      topic: "data",
    };
  }

  if (type === 2) {
    // Find the median of 5 sorted numbers
    var a = randH(1, 5), gap = randH(1, 4);
    var set5 = [a, a + gap, a + 2 * gap, a + 3 * gap, a + 4 * gap];
    var median = set5[2];
    // Shuffle for display
    var displayed = set5.slice().sort(function() { return Math.random() - 0.5; });
    return {
      question: "Find the median of: " + displayed.join(", "),
      answer: median,
      distractors: [String(set5[1]), String(set5[3]), String(set5[0])],
      hint: "Put the numbers in order from smallest to largest. The median is the middle number.",
      topic: "data",
    };
  }

  // Find the mode of a list with a clear winner
  var modeV = randH(3, 9);
  var other1 = modeV > 3 ? modeV - 2 : modeV + 2;
  var other2 = modeV < 8 ? modeV + 2 : modeV - 3;
  var dataset = [modeV, other1, modeV, other2, other1, modeV];
  dataset.sort(function(a, b) { return a - b; });
  return {
    question: "Find the mode of: " + dataset.join(", "),
    answer: modeV,
    distractors: [String(other1), String(other2), String(modeV + 1)],
    hint: "The mode is the number that appears most often. Count each value.",
    topic: "data",
  };
}


// ── Angles ───────────────────────────────────────────────────────────────────

function getHardAngleQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    // Classify an angle
    var angleTypes = [
      { deg: randH(1, 89),   name: "acute" },
      { deg: 90,              name: "right" },
      { deg: randH(91, 179), name: "obtuse" },
      { deg: 180,             name: "straight" },
    ];
    var chosen = pickH(angleTypes);
    return {
      question: "An angle measures " + chosen.deg + "°. What type of angle is it?",
      answer: chosen.name,
      distractors: ["acute", "right", "obtuse", "straight"].filter(function(t) { return t !== chosen.name; }).slice(0, 3),
      hint: "Right = 90°. Acute = less than 90°. Obtuse = between 90° and 180°. Straight = 180°.",
      topic: "geometry",
    };
  }

  if (type === 2) {
    // Missing angle in a triangle (angles sum to 180°)
    var ang1 = randH(30, 80), ang2 = randH(20, 180 - ang1 - 20);
    var missing = 180 - ang1 - ang2;
    return {
      question: "A triangle has angles of " + ang1 + "° and " + ang2 + "°. What is the third angle?",
      answer: missing + "°",
      distractors: [(missing + 10) + "°", (missing - 10) + "°", (missing + 20) + "°"],
      hint: "All three angles in a triangle always add up to 180°. Subtract the two known angles from 180.",
      topic: "geometry",
    };
  }

  // Missing angle on a straight line (sum to 180°)
  var known = randH(30, 150);
  var missingLine = 180 - known;
  return {
    question: "Two angles sit on a straight line. One angle is " + known + "°. What is the other angle?",
    answer: missingLine + "°",
    distractors: [(missingLine + 10) + "°", (missingLine - 10) + "°", (360 - known) + "°"],
    hint: "Angles on a straight line add up to 180°. Subtract " + known + " from 180.",
    topic: "geometry",
  };
}


// ── Word Problems ────────────────────────────────────────────────────────────

function getHardWordProblemQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    var p1 = randH(2, 15), p2 = randH(2, 15), total = p1 + p2;
    var paid = Math.ceil(total / 10) * 10 + pickH([0, 10, 20]);
    return {
      question: "You buy items for $" + p1 + " and $" + p2 + ". You pay $" + paid + ". How much change do you get?",
      answer: paid - total,
      hint: "First add the costs: " + p1 + " + " + p2 + " = " + total + ". Then subtract from " + paid + ".",
      topic: "word problems",
    };
  }

  if (type === 2) {
    var speed = pickH([40, 50, 60, 80, 100]), time = randH(2, 5);
    return {
      question: "A car travels at " + speed + " km/h for " + time + " hours. How far does it travel?",
      answer: speed * time,
      hint: "Distance = speed x time.",
      topic: "word problems",
    };
  }

  var groupSize = randH(3, 8), numGroups = randH(3, 8), extra = randH(1, 10);
  return {
    question: "There are " + numGroups + " groups of " + groupSize + " students, plus " + extra + " extra. How many students in total?",
    answer: groupSize * numGroups + extra,
    hint: "First multiply: " + numGroups + " x " + groupSize + " = " + (numGroups * groupSize) + ". Then add the " + extra + " extra.",
    topic: "word problems",
  };
}


// ── Equals Sign ──────────────────────────────────────────────────────────────

function getHardEqualsQuestion() {
  var type = randH(1, 2);

  if (type === 1) {
    var a = randH(2, 9), b = randH(2, 9);
    var divisors = [];
    for (var i = 2; i <= 9; i++) { if ((a * b) % i === 0 && i !== a) divisors.push(i); }
    if (divisors.length === 0) {
      var a2 = randH(1, 12), b2 = randH(1, 12), c2 = randH(1, a2 * b2 - 1);
      return {
        question: a2 + " x " + b2 + " = ___ + " + c2 + ". What goes in the blank?",
        answer: a2 * b2 - c2,
        hint: "Work out " + a2 + " x " + b2 + " = " + (a2 * b2) + ". Then subtract " + c2 + ".",
        topic: "equals sign",
      };
    }
    var c = pickH(divisors), blank = (a * b) / c;
    return {
      question: a + " x " + b + " = ___ x " + c + ". What goes in the blank?",
      answer: blank,
      hint: "Both sides must be equal. " + a + " x " + b + " = " + (a * b) + ". What times " + c + " gives " + (a * b) + "?",
      topic: "equals sign",
    };
  }

  var av = randH(3, 20), bv = randH(av + 1, 40);
  return {
    question: "? + " + av + " = " + bv + ". What is the missing number?",
    answer: bv - av,
    hint: "The missing number plus " + av + " equals " + bv + ". Subtract " + av + " from " + bv + ".",
    topic: "equals sign",
  };
}
