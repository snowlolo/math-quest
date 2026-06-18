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
  ];
  return topics[Math.floor(Math.random() * topics.length)]();
}

function pickH(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randH(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }


// ── Fractions ────────────────────────────────────────────────────────────────

function getHardFractionQuestion() {
  var type = randH(1, 4);

  if (type === 1) {
    // Add fractions with same denominator, simplify
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
    // Fraction of a quantity with larger numbers
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
    // Equivalent fraction: find missing numerator
    var num2 = randH(1, 5), den2 = randH(2, 6), m = randH(2, 5);
    return {
      question: num2 + "/" + den2 + " = ?/" + (den2 * m) + ". What is the missing numerator?",
      answer: num2 * m,
      hint: "The denominator was multiplied by " + m + ". Do the same to the numerator.",
      topic: "fractions",
    };
  }

  // Subtract fractions with same denominator
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
    // 2-digit × 2-digit
    var a = randH(11, 25), b = randH(11, 25);
    return {
      question: "What is " + a + " x " + b + "?",
      answer: a * b,
      hint: "Break it up: (" + Math.floor(a / 10) * 10 + " x " + b + ") + (" + (a % 10) + " x " + b + ").",
      topic: "multiplication",
    };
  }

  if (type === 2) {
    // 3-digit × 1-digit
    var a2 = randH(101, 500), b2 = randH(3, 9);
    return {
      question: "What is " + a2 + " x " + b2 + "?",
      answer: a2 * b2,
      hint: "Multiply each digit of " + a2 + " by " + b2 + " from right to left.",
      topic: "multiplication",
    };
  }

  // Missing factor
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
    // 3-digit ÷ 1-digit
    var divisor = randH(2, 9), quotient = randH(11, 99);
    return {
      question: "What is " + (divisor * quotient) + " / " + divisor + "?",
      answer: quotient,
      hint: "How many times does " + divisor + " go into " + (divisor * quotient) + "? Try estimating first.",
      topic: "division",
    };
  }

  // Division with remainder
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
    // Round to nearest hundred
    var n = randH(100, 9999), rounded = Math.round(n / 100) * 100;
    return {
      question: "Round " + n + " to the nearest hundred.",
      answer: rounded,
      hint: "Look at the tens digit. 5 or more rounds up; less than 5 rounds down.",
      topic: "place value",
    };
  }

  if (type === 2) {
    // Value of digit in a large number
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

  // Round to nearest thousand
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

  // Convert fraction to decimal
  var pairs = [[1,2,0.5],[1,4,0.25],[3,4,0.75],[1,5,0.2],[2,5,0.4],[3,5,0.6],[4,5,0.8],[1,10,0.1],[3,10,0.3]];
  var p = pickH(pairs);
  return {
    question: "What is " + p[0] + "/" + p[1] + " as a decimal?",
    answer: p[2],
    hint: "Divide " + p[0] + " by " + p[1] + ".",
    topic: "decimals",
  };
}


// ── Measurement ──────────────────────────────────────────────────────────────

function getHardMeasurementQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    // Area of triangle
    var base = randH(2, 16), height = randH(2, 12);
    while ((base * height) % 2 !== 0) height = randH(2, 12);
    return {
      question: "A triangle has a base of " + base + " cm and a height of " + height + " cm. What is its area?",
      answer: (base * height) / 2,
      hint: "Area of a triangle = (base x height) / 2.",
      topic: "measurement",
    };
  }

  if (type === 2) {
    // Volume of cuboid
    var l = randH(2, 10), w = randH(2, 10), h = randH(2, 10);
    return {
      question: "A box is " + l + " cm long, " + w + " cm wide, and " + h + " cm tall. What is its volume?",
      answer: l * w * h,
      hint: "Volume = length x width x height.",
      topic: "measurement",
    };
  }

  // km to m
  var km = randH(1, 20);
  return {
    question: "How many metres are in " + km + " km?",
    answer: km * 1000,
    hint: "1 km = 1000 m. Multiply by 1000.",
    topic: "measurement",
  };
}


// ── Word Problems ────────────────────────────────────────────────────────────

function getHardWordProblemQuestion() {
  var type = randH(1, 3);

  if (type === 1) {
    // Multi-step: buy items, find change
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
    // Rate x time = distance
    var speed = pickH([40, 50, 60, 80, 100]), time = randH(2, 5);
    return {
      question: "A car travels at " + speed + " km/h for " + time + " hours. How far does it travel?",
      answer: speed * time,
      hint: "Distance = speed x time.",
      topic: "word problems",
    };
  }

  // Two-step
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
    // a x b = ___ x c  →  find blank
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

  // Solve simple equation: x + a = b
  var av = randH(3, 20), bv = randH(av + 1, 40);
  return {
    question: "? + " + av + " = " + bv + ". What is the missing number?",
    answer: bv - av,
    hint: "The missing number plus " + av + " equals " + bv + ". Subtract " + av + " from " + bv + ".",
    topic: "equals sign",
  };
}
