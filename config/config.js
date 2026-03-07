/**
 * K-Faive Curriculum Config
 * =========================
 * This file is the LLM's reference "brain" for matching extracted text
 * from Week-Peek sheets, diary photos, and WhatsApp messages to the correct
 * class level and subject.
 *
 * Structure per class:
 *   - label          : display name
 *   - aliases        : all ways a teacher/parent might write the class name
 *   - subjects       : each subject with its own keyword triggers and topic map
 *
 * HOW THE LLM SHOULD USE THIS:
 *   1. Scan extracted text for class aliases → determine class_level
 *   2. Scan for subject keywords → determine subject
 *   3. Scan for topic keywords → determine specific chapter/topic
 *   4. Return { class_level, subject, topics[], learning_objectives[] }
 *      to the worksheet generator.
 */

const CURRICULUM_CONFIG = {

  // ─────────────────────────────────────────────────────────────
  //  KG  (LKG / UKG / Nursery / Pre-Primary)
  //  Source: Kidzee / Deens / Generic CBSE KG framework
  //  These are the REAL Week-Peek documents provided.
  // ─────────────────────────────────────────────────────────────
  KG: {
    label: "Kindergarten (LKG / UKG)",
    aliases: [
      "kg", "lkg", "ukg", "nursery", "pre-primary", "pre primary",
      "kindergarten", "pp1", "pp2", "junior kg", "senior kg",
      "jr kg", "sr kg", "prep", "reception"
    ],

    subjects: {

      // ── LITERACY (English) ──────────────────────────────────
      Literacy: {
        display: "Literacy / English",
        keywords: [
          "literacy", "english", "phonics", "alphabet", "letter",
          "reading", "writing", "tracing", "lowercase", "uppercase",
          "sight words", "word family", "sounds", "blending",
          "handwriting", "cvc", "vowel", "consonant", "rhyme"
        ],
        topics: [
          {
            id: "KG-LIT-1",
            name: "Alphabet Recognition & Writing",
            triggers: [
              "introduction to letter", "recap of letter", "letter bb", "letter gg",
              "letter oo", "letter uu", "letter ll", "letter ff", "letter jj", "letter zz",
              "letter aa", "letter cc", "tracing lowercase", "tracing uppercase",
              "tracing letter", "writing letter", "alphabet", "abc"
            ],
            learning_objectives: [
              "Recognize and name uppercase and lowercase letters",
              "Trace and write letters correctly",
              "Associate letters with their sounds (phonics)"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["trace the letter", "circle the letter", "match upper to lower", "write the missing letter"]
          },
          {
            id: "KG-LIT-2",
            name: "Phonics - Letter Sounds",
            triggers: [
              "identifying sounds", "sounds in words", "phonics", "letter sound",
              "sound of", "'a' sound", "'e' sound", "'i' sound", "'o' sound", "'u' sound",
              "central sound", "short vowel", "long vowel", "beginning sound"
            ],
            learning_objectives: [
              "Identify the beginning sound of a word",
              "Match letters to their phonics sounds",
              "Distinguish between vowel and consonant sounds"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["circle the word that starts with", "match sound to picture", "say and write the sound"]
          },
          {
            id: "KG-LIT-3",
            name: "CVC Word Families",
            triggers: [
              "word family", "op family", "od family", "og family", "ob family",
              "at family", "an family", "in family", "cvc", "three letter words",
              "'op' words", "'od' words", "'og' words", "'ob' words",
              "top mop cop", "dog log fog", "hot pot dot"
            ],
            learning_objectives: [
              "Read and write CVC (consonant-vowel-consonant) words",
              "Identify word families (-op, -od, -og, -ob, -at, -an)",
              "Blend sounds to form simple 3-letter words"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["complete the word family", "read and match", "fill in the missing letter", "circle words in the family"]
          },
          {
            id: "KG-LIT-4",
            name: "Sight Words",
            triggers: [
              "sight words", "sight word", "high frequency words",
              "i a my to like", "i see the", "dolch words",
              "recap of sight words", "reading list"
            ],
            learning_objectives: [
              "Read common sight words by sight (I, a, my, to, like, see, the, is, it)",
              "Use sight words in simple sentences"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["read and circle the sight word", "trace the sight word", "find the word in the sentence"]
          },
          {
            id: "KG-LIT-5",
            name: "'a' and 'e' Central Sound Words",
            triggers: [
              "central sound", "'a' central sound", "'e' central sound",
              "a sound words", "e sound words", "short a", "short e",
              "cat bat rat", "hen ten pen", "recap of a and e"
            ],
            learning_objectives: [
              "Identify the central vowel sound 'a' in words (cat, bat, mat)",
              "Identify the central vowel sound 'e' in words (hen, ten, pen)",
              "Sort words by their central vowel sound"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["colour the pictures with 'a' sound", "sort words by sound", "fill in the vowel"]
          }
        ]
      },

      // ── NUMERACY (Math) ─────────────────────────────────────
      Numeracy: {
        display: "Numeracy / Maths",
        keywords: [
          "numeracy", "maths", "math", "mathematics", "numbers", "counting",
          "number", "shapes", "measurement", "addition", "subtraction",
          "tens frame", "compare", "pattern", "before after"
        ],
        topics: [
          {
            id: "KG-NUM-1",
            name: "Numbers 1–10: Recognition & Writing",
            triggers: [
              "numbers 1 to 10", "numbers 0 to 10", "number 9", "number 10",
              "formation of number", "quantification", "writing numbers",
              "counting 1 to 10", "numbers 1-10", "recap of numbers 0 to 10"
            ],
            learning_objectives: [
              "Recognize, write and say numbers 1 to 10",
              "Count objects up to 10",
              "Match numeral to quantity"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["trace the number", "count and write", "match number to objects", "colour the right number of objects"]
          },
          {
            id: "KG-NUM-2",
            name: "Missing Numbers 1–10",
            triggers: [
              "missing numbers", "missing number 1-10", "fill in the missing",
              "number sequence", "what comes next", "number order"
            ],
            learning_objectives: [
              "Identify missing numbers in a sequence 1–10",
              "Understand number order"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["fill in the missing number", "complete the number train", "what number is missing?"]
          },
          {
            id: "KG-NUM-3",
            name: "Number Series 1–20",
            triggers: [
              "number series 1 to 20", "numbers 1 to 20", "numbers up to 20",
              "between numbers", "after numbers", "before numbers",
              "recap of between and after", "counting to 20"
            ],
            learning_objectives: [
              "Count and write numbers 1 to 20",
              "Identify 'before', 'after' and 'between' numbers up to 20",
              "Arrange numbers in order"
            ],
            bloom_level: "Remember, Understand, Apply",
            worksheet_types: ["fill the missing number", "write before/after/between", "number sequence 1-20"]
          },
          {
            id: "KG-NUM-4",
            name: "Comparison of Numbers (>, <, =)",
            triggers: [
              "comparison of numbers", "greater than less than", ">, <, =",
              "tens frame", "compare numbers", "more than fewer than",
              "symbols > < =", "which is more", "which is less",
              "comparison of numbers on tens frame"
            ],
            learning_objectives: [
              "Compare two numbers using >, < and = symbols",
              "Use tens frame to visualize number comparison",
              "Determine which number is greater or smaller"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["compare and write > < =", "colour the bigger number", "tens frame comparison"]
          },
          {
            id: "KG-NUM-5",
            name: "Backward Counting 20–0",
            triggers: [
              "backward counting", "count backward", "20 to 0", "20 to 1",
              "reverse counting", "countdown", "backward number",
              "backward counting of numbers 20 to 0"
            ],
            learning_objectives: [
              "Count backward from 20 to 0",
              "Write numbers in reverse order"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["fill the backward number train", "count down from 20", "write backward numbers"]
          },
          {
            id: "KG-NUM-6",
            name: "Number Names (one to ten)",
            triggers: [
              "number names", "number name one", "one two three", "four five six",
              "seven eight nine ten", "recap of number names",
              "introduction to number names four and five",
              "write the number name", "one to ten in words"
            ],
            learning_objectives: [
              "Read and write number names: one, two, three, four, five",
              "Match numeral to number name",
              "Know number names up to ten"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["match number to number name", "write the number name", "circle the correct number name"]
          },
          {
            id: "KG-NUM-7",
            name: "2D Shapes",
            triggers: [
              "shapes", "circle", "square", "triangle", "rectangle", "oval",
              "pentagon", "hexagon", "star", "heart", "diamond",
              "introduction to shape", "2d shapes", "flat shapes",
              "shape pentagon", "introduction to shape pentagon"
            ],
            learning_objectives: [
              "Identify and name 2D shapes: circle, square, triangle, rectangle, oval, pentagon",
              "Describe shapes by number of sides and corners",
              "Find shapes in the environment"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["name the shape", "colour shapes", "count sides and corners", "draw the shape", "find shapes around us"]
          },
          {
            id: "KG-NUM-8",
            name: "Patterns",
            triggers: [
              "pattern", "ab pattern", "repeating pattern", "what comes next",
              "colour pattern", "shape pattern", "continuing the pattern"
            ],
            learning_objectives: [
              "Identify and continue AB and ABC patterns",
              "Create simple colour and shape patterns"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["complete the pattern", "draw what comes next", "colour the pattern"]
          }
        ]
      },

      // ── DISCOVERY (EVS / Theme-based) ───────────────────────
      Discovery: {
        display: "Discovery / EVS (Theme-based Learning)",
        keywords: [
          "discovery", "evs", "theme", "environmental", "science",
          "animals", "plants", "colours", "family", "food", "body",
          "nature", "community", "festival", "seasons", "transport"
        ],
        topics: [
          {
            id: "KG-DIS-1",
            name: "Amazing Animals – Pet Animals",
            triggers: [
              "pet animals", "pets", "amazing animals", "cat dog rabbit",
              "animals we keep", "domestic animals", "animals at home",
              "discussion on pet animals"
            ],
            learning_objectives: [
              "Name common pet animals (dog, cat, rabbit, fish, bird)",
              "Describe what pets eat and where they live",
              "Distinguish pets from wild animals"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["circle the pet animals", "draw your pet", "match animal to its food", "name the animal"]
          },
          {
            id: "KG-DIS-2",
            name: "Amazing Animals – Farm Animals",
            triggers: [
              "farm animals", "farmyard", "cow hen sheep", "animals on farm",
              "animal homes", "young ones", "things they give us",
              "old macdonald", "farm animal", "what do animals give us"
            ],
            learning_objectives: [
              "Name common farm animals (cow, hen, goat, horse, sheep, pig)",
              "Match animals to their young ones (cow → calf, hen → chick)",
              "Identify what farm animals give us (milk, eggs, wool)"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["match animal to young one", "what do they give us?", "circle farm animals", "animal homes matching"]
          },
          {
            id: "KG-DIS-3",
            name: "Colours Around Us",
            triggers: [
              "colours around us", "colours", "color", "colour yellow",
              "colour black", "colour red", "colour blue", "colour green",
              "discussion on colours", "activities on colours",
              "associated objects", "colour and objects"
            ],
            learning_objectives: [
              "Identify and name primary and secondary colours",
              "Associate colours with common objects (yellow – banana, sun; black – crow, night)",
              "Sort objects by colour"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["colour the objects", "match colour to object", "circle things that are yellow/red/blue", "colour by name"]
          },
          {
            id: "KG-DIS-4",
            name: "Fruits",
            triggers: [
              "fruits", "phal", "hannugalu", "mango apple banana grapes",
              "introduction to fruits", "types of fruits", "fruit names",
              "aam seb angoor", "mavina hannu sebu drakshi"
            ],
            learning_objectives: [
              "Name common fruits in English and Hindi/Kannada",
              "Describe colour, taste and shape of fruits",
              "Identify fruits we eat"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["name the fruit", "colour the fruit", "match fruit to colour", "circle the fruits"]
          },
          {
            id: "KG-DIS-5",
            name: "My Body / Sense Organs",
            triggers: [
              "my body", "body parts", "sense organs", "eyes ears nose mouth",
              "five senses", "touch taste smell hear see", "head shoulders"
            ],
            learning_objectives: [
              "Name major body parts",
              "Identify the five sense organs and their functions",
              "Practice personal hygiene"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["label the body", "match sense organ to its use", "circle the body part"]
          }
        ]
      },

      // ── II LANG: HINDI ──────────────────────────────────────
      Hindi: {
        display: "II Language – Hindi",
        keywords: [
          "hindi", "ii lang hindi", "second language hindi", "peela", "kala",
          "swar", "vyanjan", "matra", "devanagari", "hindi letter",
          "aam seb", "hindi rhyme", "hindi colour", "hindi words"
        ],
        topics: [
          {
            id: "KG-HIN-1",
            name: "Hindi Vowels (Swar) – a to au",
            triggers: [
              "hindi swar", "hindi vowels", "a aa i ee", "letter a to ee",
              "recap of letters a to ee", "introduction to letter a",
              "hindi letters a", "letter u oo", "letter o", "letter ow",
              "recap of letters a to ow", "a se anar"
            ],
            learning_objectives: [
              "Recognise Hindi vowels: अ आ इ ई उ ऊ ए ओ औ",
              "Associate each vowel with a word (a – anar, aa – aam)",
              "Trace and write Hindi vowels"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["trace the Hindi letter", "match letter to picture", "circle the letter", "write the letter"]
          },
          {
            id: "KG-HIN-2",
            name: "Hindi Colours & Vocabulary",
            triggers: [
              "colour yellow peela", "colour black kala", "colour red lal",
              "colour blue neela", "colour green hara", "peela", "kala",
              "hindi colour words", "rang", "associated words hindi"
            ],
            learning_objectives: [
              "Say and write colour names in Hindi (peela, lal, neela, hara, kala, safed)",
              "Use colour words in simple sentences",
              "Match Hindi colour word to correct colour"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["colour and write the Hindi word", "match colour to Hindi name", "fill in the Hindi colour"]
          },
          {
            id: "KG-HIN-3",
            name: "Hindi Fruits Vocabulary (Phal)",
            triggers: [
              "fruits phal", "aam mango seb apple", "angoor grapes",
              "ananas pineapple", "amrood guava", "kela banana",
              "hindi fruits", "phal ke naam"
            ],
            learning_objectives: [
              "Name common fruits in Hindi (aam, seb, kela, angoor, ananas, amrood)",
              "Match Hindi fruit name to picture"
            ],
            bloom_level: "Remember",
            worksheet_types: ["match fruit to Hindi name", "write the Hindi name", "circle the correct fruit"]
          }
        ]
      },

      // ── II LANG: KANNADA ────────────────────────────────────
      Kannada: {
        display: "II Language – Kannada",
        keywords: [
          "kannada", "ii lang kannada", "second language kannada",
          "haladi", "kappu", "akshara", "swarakshara", "vyanjanakshara",
          "hannugalu", "kannada letter", "kannada colour", "kannada words"
        ],
        topics: [
          {
            id: "KG-KAN-1",
            name: "Kannada Vowels (Swarakshara) – a to au",
            triggers: [
              "kannada swar", "kannada vowels", "kannada letters a to ee",
              "recap of letters a to ee", "introduction to kannada letter",
              "letters u and oo kannada", "letters ie and o kannada",
              "letter oa kannada", "recap a to oa"
            ],
            learning_objectives: [
              "Recognise Kannada vowels: ಅ ಆ ಇ ಈ ಉ ಊ ಎ ಏ ಒ ಓ",
              "Associate each vowel with a Kannada word",
              "Trace and write Kannada vowels"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["trace the Kannada letter", "match letter to picture", "circle the Kannada letter"]
          },
          {
            id: "KG-KAN-2",
            name: "Kannada Colours & Vocabulary",
            triggers: [
              "colour yellow haladi", "colour black kappu", "colour red kempu",
              "colour blue neeli", "kannada colour", "haladi", "kappu",
              "associated words kannada", "kannada colour words"
            ],
            learning_objectives: [
              "Say and write colour names in Kannada (haladi, kempu, neeli, hasi, kappu, bele)",
              "Match Kannada colour word to correct colour"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["colour and write Kannada word", "match colour to Kannada name"]
          },
          {
            id: "KG-KAN-3",
            name: "Kannada Fruits Vocabulary (Hannugalu)",
            triggers: [
              "hannugalu", "mavina hannu mango", "sebu apple", "drakshi grapes",
              "ananas pineapple", "balehannu banana", "kannada fruits"
            ],
            learning_objectives: [
              "Name common fruits in Kannada (mavinahannu, sebu, drakshi, ananas, balehannu)",
              "Match Kannada fruit name to picture"
            ],
            bloom_level: "Remember",
            worksheet_types: ["match fruit to Kannada name", "write the Kannada name"]
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  //  CLASS 1  (Grade 1 / Std 1)
  //  Source: CBSE Class 1 official syllabus 2024-25
  // ─────────────────────────────────────────────────────────────
  Class1: {
    label: "Class 1 / Grade 1 / Std 1",
    aliases: [
      "class 1", "class i", "grade 1", "1st grade", "std 1", "standard 1",
      "class one", "first grade", "year 1", "primary 1"
    ],

    subjects: {

      Math: {
        display: "Mathematics",
        keywords: [
          "math", "maths", "mathematics", "numbers", "addition", "subtraction",
          "shapes", "measurement", "patterns", "counting", "numeracy"
        ],
        topics: [
          {
            id: "C1-MATH-1",
            name: "Shapes & Spatial Understanding",
            triggers: [
              "shapes", "spatial", "top bottom on under", "inside outside",
              "above below near far", "before after", "position words",
              "rolling sliding", "2d shapes", "3d shapes", "solids",
              "sphere cube cylinder cone", "flat shapes", "round shapes",
              "spatial understanding", "solids around us"
            ],
            learning_objectives: [
              "Use spatial language: top, bottom, inside, outside, above, below, near, far",
              "Identify and sort 2D and 3D shapes",
              "Describe how shapes move (roll, slide)"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["position words", "circle the shape", "which shape rolls?", "draw inside/outside"]
          },
          {
            id: "C1-MATH-2",
            name: "Numbers 1–9 and Zero",
            triggers: [
              "numbers 1 to 9", "numbers 1-9", "counting 1 to 9",
              "number 1 to 9", "zero", "one to nine", "reading numbers",
              "writing numbers 1 to 9", "adds and subtracts real objects",
              "number sense", "developing sense of numberness"
            ],
            learning_objectives: [
              "Count, read and write numbers 1 to 9",
              "Match number to quantity",
              "Add and subtract using objects and pictures"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["count and write", "trace numbers", "match to quantity", "add with pictures"]
          },
          {
            id: "C1-MATH-3",
            name: "Numbers 10–20",
            triggers: [
              "numbers 10 to 20", "10 to 20", "eleven twelve thirteen",
              "fourteen fifteen sixteen", "seventeen eighteen nineteen",
              "tens and ones", "group of ten", "numbers from 10 to 20",
              "ten and twenty", "forms number sequence 10 to 20",
              "tens frame", "ones and tens"
            ],
            learning_objectives: [
              "Count and write numbers 10 to 20",
              "Group objects into tens and ones",
              "Write number names eleven to twenty"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["tens and ones chart", "group into 10s", "write the number", "number names 11-20"]
          },
          {
            id: "C1-MATH-4",
            name: "Numbers 21–99 (Tens and Ones)",
            triggers: [
              "numbers 21 to 99", "21 to 99", "two digit numbers",
              "tens and ones 2 digit", "groups of ten",
              "place value tens ones", "twenty to ninety nine",
              "numbers from 21 to 99", "mental arithmetic"
            ],
            learning_objectives: [
              "Read and write numbers 21 to 99",
              "Identify tens and ones in a 2-digit number",
              "Add two single digit numbers mentally"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["place value chart", "draw tens and ones", "write the number", "mental addition"]
          },
          {
            id: "C1-MATH-5",
            name: "Addition",
            triggers: [
              "addition", "adding", "add", "plus", "sum", "total",
              "adds", "+", "addition of numbers", "simple addition",
              "adding objects", "addition facts", "how many altogether"
            ],
            learning_objectives: [
              "Add two single-digit numbers using objects and pictures",
              "Use the '+' symbol correctly",
              "Solve simple addition word problems"
            ],
            bloom_level: "Apply",
            worksheet_types: ["add the objects", "write the sum", "word problems – addition", "addition facts"]
          },
          {
            id: "C1-MATH-6",
            name: "Subtraction",
            triggers: [
              "subtraction", "subtract", "minus", "take away", "difference",
              "subtracts", "-", "how many left", "subtraction pattern",
              "approaches zero through subtraction", "3-1=2"
            ],
            learning_objectives: [
              "Subtract single-digit numbers using objects",
              "Use the '-' symbol correctly",
              "Understand subtraction leading to zero"
            ],
            bloom_level: "Apply",
            worksheet_types: ["cross out and write", "subtraction word problems", "how many are left?", "subtraction facts"]
          },
          {
            id: "C1-MATH-7",
            name: "Measurement – Length",
            triggers: [
              "length", "longer shorter", "tall short", "taller shorter",
              "measuring length", "non-uniform units", "hand span",
              "near far thin thick", "high low", "estimate length",
              "seriates objects by length"
            ],
            learning_objectives: [
              "Compare lengths using words: longer, shorter, taller",
              "Measure length using non-uniform units (hand span, paper clip)",
              "Order objects from shortest to longest"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["circle the longer/shorter", "measure with hand spans", "order by length"]
          },
          {
            id: "C1-MATH-8",
            name: "Measurement – Weight & Time",
            triggers: [
              "weight", "heavy light", "heavier lighter", "heavy and light",
              "time", "earlier later", "before after time", "days of week",
              "morning afternoon evening", "long short duration",
              "sequence of events", "school days holidays"
            ],
            learning_objectives: [
              "Compare objects as heavy or light",
              "Use time language: earlier, later, before, after",
              "Sequence events in a day"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["circle heavy or light", "order events in a day", "earlier or later?"]
          },
          {
            id: "C1-MATH-9",
            name: "Money",
            triggers: [
              "money", "coins", "notes", "currency", "rupees", "paisa",
              "how much", "price", "small amounts", "identify coins"
            ],
            learning_objectives: [
              "Identify common Indian coins and notes",
              "Combine small amounts of money"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["name the coin", "how much money?", "match to value"]
          },
          {
            id: "C1-MATH-10",
            name: "Patterns",
            triggers: [
              "pattern", "repeating pattern", "what comes next", "ab pattern",
              "shape pattern", "colour pattern", "number pattern",
              "sequences of simple patterns", "stamping activity"
            ],
            learning_objectives: [
              "Identify and extend simple repeating patterns (shapes, colours, numbers)",
              "Create patterns using stamping and drawing"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["complete the pattern", "draw what comes next", "create your own pattern"]
          },
          {
            id: "C1-MATH-11",
            name: "Data Handling",
            triggers: [
              "data", "collect data", "tally", "simple data",
              "measuring arm length", "data handling", "represents data",
              "interprets data", "pictograph"
            ],
            learning_objectives: [
              "Collect simple data from the classroom",
              "Represent data using pictures or tally marks",
              "Answer questions from a simple data set"
            ],
            bloom_level: "Apply, Analyze",
            worksheet_types: ["tally chart", "read the pictograph", "collect and record data"]
          }
        ]
      },

      English: {
        display: "English Language Arts",
        keywords: [
          "english", "literacy", "grammar", "phonics", "reading",
          "writing", "comprehension", "sentence", "noun", "verb",
          "alphabet", "letter", "vocabulary", "rhyme", "story"
        ],
        topics: [
          {
            id: "C1-ENG-1",
            name: "Alphabet & Phonics",
            triggers: [
              "alphabet", "phonics", "letter sounds", "beginning sounds",
              "abc", "vowels consonants", "a is for apple",
              "sounds of letters", "letter recognition"
            ],
            learning_objectives: [
              "Recognize all 26 letters and their sounds",
              "Distinguish between vowels and consonants",
              "Identify beginning sounds of words"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["beginning sound", "circle words starting with", "vowel or consonant?"]
          },
          {
            id: "C1-ENG-2",
            name: "Word Families & CVC Words",
            triggers: [
              "word family", "cvc", "three letter words", "cat bat hat",
              "bin tin pin", "hop top mop", "reading cvc", "word families",
              "-at -an -in -op families"
            ],
            learning_objectives: [
              "Read and write CVC words",
              "Group words by family (-at, -an, -in, -op)",
              "Blend sounds to read words"
            ],
            bloom_level: "Apply",
            worksheet_types: ["word family lists", "fill missing letter", "blend and read"]
          },
          {
            id: "C1-ENG-3",
            name: "Nouns (Naming Words)",
            triggers: [
              "nouns", "naming words", "common nouns", "proper nouns",
              "name of person place thing animal", "noun"
            ],
            learning_objectives: [
              "Identify nouns in sentences",
              "Distinguish people, places, animals and things as nouns",
              "Use capital letters for proper nouns"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["circle the nouns", "sort nouns by category", "person place or thing?"]
          },
          {
            id: "C1-ENG-4",
            name: "Simple Sentences",
            triggers: [
              "sentences", "sentence formation", "capital letters", "full stop",
              "writing sentences", "simple sentences", "question mark"
            ],
            learning_objectives: [
              "Write simple sentences",
              "Begin sentences with a capital letter",
              "End sentences with correct punctuation"
            ],
            bloom_level: "Apply",
            worksheet_types: ["arrange words to make a sentence", "add punctuation", "write a sentence about the picture"]
          }
        ]
      },

      EVS: {
        display: "Environmental Studies (EVS)",
        keywords: [
          "evs", "environmental studies", "science", "nature",
          "animals", "plants", "my body", "food", "family",
          "community helpers", "transport", "seasons", "water", "air"
        ],
        topics: [
          {
            id: "C1-EVS-1",
            name: "My Family",
            triggers: [
              "my family", "family members", "mother father", "parents",
              "brother sister", "grandparents", "nuclear family", "joint family",
              "mera parivar", "family"
            ],
            learning_objectives: [
              "Name and describe family members",
              "Understand roles of family members",
              "Distinguish between nuclear and joint families"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["draw my family", "label family members", "who does what?"]
          },
          {
            id: "C1-EVS-2",
            name: "My Body & Senses",
            triggers: [
              "my body", "body parts", "sense organs", "five senses",
              "eyes see ears hear nose smell mouth taste skin touch",
              "parts of body", "head shoulders knees toes"
            ],
            learning_objectives: [
              "Name major external body parts",
              "Identify the five sense organs and their functions",
              "Describe how we use each sense"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["label the body", "match sense to organ", "what do I use to...?"]
          },
          {
            id: "C1-EVS-3",
            name: "Animals Around Us",
            triggers: [
              "animals", "pet animals", "wild animals", "farm animals",
              "water animals", "birds", "domestic animals",
              "animal homes", "young ones of animals", "what animals give us",
              "cow milk hen egg", "animals and their food"
            ],
            learning_objectives: [
              "Classify animals as pets, farm, wild, water, birds",
              "Match animals to their young ones and homes",
              "Identify useful products from animals"
            ],
            bloom_level: "Remember, Understand, Apply",
            worksheet_types: ["sort the animals", "match animal to home", "what does it give us?"]
          },
          {
            id: "C1-EVS-4",
            name: "Plants Around Us",
            triggers: [
              "plants", "trees", "flowers", "leaves", "roots", "stem",
              "fruits vegetables", "plants around us", "parts of plant",
              "garden", "seeds"
            ],
            learning_objectives: [
              "Identify parts of a plant (root, stem, leaf, flower, fruit)",
              "Name common plants in the environment",
              "Distinguish trees, shrubs, herbs and climbers"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["label the plant", "match part to function", "circle the correct part"]
          },
          {
            id: "C1-EVS-5",
            name: "Food We Eat",
            triggers: [
              "food we eat", "healthy food", "junk food", "fruits vegetables",
              "food from plants", "food from animals", "eating habits",
              "meals breakfast lunch dinner"
            ],
            learning_objectives: [
              "Identify healthy and unhealthy food",
              "Classify food as coming from plants or animals",
              "Name meals of the day"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["healthy or junk food?", "plant or animal food?", "plan a healthy meal"]
          }
        ]
      },

      Hindi: {
        display: "Hindi (Second/First Language)",
        keywords: [
          "hindi", "swar", "vyanjan", "matra", "devanagari",
          "hindi letter", "hindi words", "hindi poem", "kavita"
        ],
        topics: [
          {
            id: "C1-HIN-1",
            name: "Hindi Vowels (Swar)",
            triggers: [
              "swar", "hindi vowels", "a aa i ee u oo", "अ आ इ ई",
              "anaar aam", "a se anaar", "vowels in hindi"
            ],
            learning_objectives: [
              "Recognize and write all Hindi vowels (अ to औ)",
              "Associate each vowel with a word",
              "Identify vowels in simple words"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["trace the vowel", "match vowel to picture", "circle the vowel"]
          },
          {
            id: "C1-HIN-2",
            name: "Hindi Consonants (Vyanjan)",
            triggers: [
              "vyanjan", "hindi consonants", "ka kha ga", "क ख ग",
              "consonants in hindi", "devanagari consonants"
            ],
            learning_objectives: [
              "Recognize and write Hindi consonants (क to ज्ञ)",
              "Form simple 2-letter Hindi words",
              "Identify consonants in words"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["trace the consonant", "match consonant to picture", "write the consonant"]
          }
        ]
      },

      Kannada: {
        display: "Kannada (Second Language)",
        keywords: [
          "kannada", "swarakshara", "vyanjanakshara", "kannada letter",
          "akshara", "kannada words", "ಅ ಆ", "ka kha ga kannada"
        ],
        topics: [
          {
            id: "C1-KAN-1",
            name: "Kannada Vowels (Swarakshara)",
            triggers: [
              "swarakshara", "kannada vowels", "ಅ ಆ ಇ ಈ",
              "a aa i ee kannada", "kannada vowel letters"
            ],
            learning_objectives: [
              "Recognize and write all Kannada vowels",
              "Associate each vowel with a Kannada word"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["trace the Kannada vowel", "match to picture", "write the vowel"]
          },
          {
            id: "C1-KAN-2",
            name: "Kannada Consonants (Vyanjanakshara)",
            triggers: [
              "vyanjanakshara", "kannada consonants", "ka kha ga kannada",
              "ಕ ಖ ಗ", "kannada consonant letters"
            ],
            learning_objectives: [
              "Recognize and write Kannada consonants",
              "Form simple Kannada words"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["trace the consonant", "write the Kannada letter"]
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  //  CLASS 2  (Grade 2 / Std 2)
  // ─────────────────────────────────────────────────────────────
  Class2: {
    label: "Class 2 / Grade 2 / Std 2",
    aliases: [
      "class 2", "class ii", "grade 2", "2nd grade", "std 2", "standard 2",
      "class two", "second grade", "year 2", "primary 2"
    ],

    subjects: {

      Math: {
        display: "Mathematics",
        keywords: ["math", "maths", "mathematics", "numbers", "addition", "subtraction", "multiplication", "shapes", "measurement"],
        topics: [
          {
            id: "C2-MATH-1",
            name: "Numbers up to 1000",
            triggers: [
              "3 digit numbers", "hundreds tens ones", "numbers up to 999",
              "numbers up to 1000", "place value hundreds", "3-digit",
              "expanded form", "comparing 3 digit"
            ],
            learning_objectives: [
              "Read and write 3-digit numbers",
              "Understand place value: hundreds, tens, ones",
              "Compare and order 3-digit numbers"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["place value chart", "expanded form", "write the number", "compare 3-digit numbers"]
          },
          {
            id: "C2-MATH-2",
            name: "Addition with Carrying",
            triggers: [
              "addition with carrying", "carry over", "addition of 2 digit",
              "addition with regrouping", "column addition", "2-digit addition"
            ],
            learning_objectives: [
              "Add 2-digit numbers with carrying",
              "Apply column addition method",
              "Solve addition word problems"
            ],
            bloom_level: "Apply",
            worksheet_types: ["column addition", "addition word problems", "add with carrying"]
          },
          {
            id: "C2-MATH-3",
            name: "Subtraction with Borrowing",
            triggers: [
              "subtraction with borrowing", "borrow method", "subtraction with regrouping",
              "2-digit subtraction", "borrowing subtraction"
            ],
            learning_objectives: [
              "Subtract 2-digit numbers with borrowing",
              "Apply borrowing method correctly",
              "Solve subtraction word problems"
            ],
            bloom_level: "Apply",
            worksheet_types: ["column subtraction", "subtraction with borrowing", "word problems"]
          },
          {
            id: "C2-MATH-4",
            name: "Multiplication Tables 2–5",
            triggers: [
              "multiplication tables", "tables 2 to 5", "times tables",
              "table of 2", "table of 3", "table of 4", "table of 5",
              "pahada 2", "repeated addition", "multiplication"
            ],
            learning_objectives: [
              "Memorize multiplication tables 2–5",
              "Relate multiplication to repeated addition",
              "Solve simple multiplication problems"
            ],
            bloom_level: "Remember, Apply",
            worksheet_types: ["fill the times table", "repeated addition to multiplication", "word problems"]
          },
          {
            id: "C2-MATH-5",
            name: "Measurement – Length, Weight, Capacity",
            triggers: [
              "length metre centimetre", "cm m", "ruler", "measuring length",
              "weight kg gram", "capacity litre ml",
              "standard units", "measuring", "heavier lighter longer shorter"
            ],
            learning_objectives: [
              "Measure length in cm and m",
              "Compare weights and capacities",
              "Use standard units for measurement"
            ],
            bloom_level: "Apply",
            worksheet_types: ["measure with ruler", "compare weight", "estimate and measure"]
          },
          {
            id: "C2-MATH-6",
            name: "Time – Clock & Calendar",
            triggers: [
              "clock", "time", "o'clock", "half past", "quarter past",
              "reading time", "hours minutes", "days of week", "months of year",
              "calendar", "what time is it"
            ],
            learning_objectives: [
              "Read time to the hour and half hour",
              "Name days of the week and months",
              "Sequence events using time language"
            ],
            bloom_level: "Apply",
            worksheet_types: ["draw clock hands", "write the time", "days of the week order"]
          }
        ]
      },

      English: {
        display: "English Language Arts",
        keywords: ["english", "grammar", "verbs", "adjectives", "comprehension", "reading", "writing", "tense"],
        topics: [
          {
            id: "C2-ENG-1",
            name: "Verbs (Action Words)",
            triggers: ["verbs", "action words", "doing words", "run jump play", "verb in sentence", "past tense present tense"],
            learning_objectives: [
              "Identify action words (verbs) in sentences",
              "Use verbs in present and past tense"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["circle the verb", "fill in the verb", "change to past tense"]
          },
          {
            id: "C2-ENG-2",
            name: "Adjectives (Describing Words)",
            triggers: ["adjectives", "describing words", "big small red round", "adjective in sentence", "opposite adjectives"],
            learning_objectives: [
              "Identify adjectives in sentences",
              "Use adjectives to describe nouns"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["circle the adjective", "describe the picture", "opposite adjectives"]
          },
          {
            id: "C2-ENG-3",
            name: "Reading Comprehension",
            triggers: ["comprehension", "read and answer", "passage", "reading passage", "answer the questions"],
            learning_objectives: [
              "Read short passages and answer questions",
              "Identify main idea of a passage"
            ],
            bloom_level: "Understand, Analyze",
            worksheet_types: ["read and answer", "true or false", "find the main idea"]
          }
        ]
      },

      EVS: {
        display: "Environmental Studies (EVS)",
        keywords: ["evs", "environmental studies", "science", "plants", "animals", "water", "air", "food", "community"],
        topics: [
          {
            id: "C2-EVS-1",
            name: "Plants – Parts and Functions",
            triggers: ["parts of plant", "root stem leaf flower fruit seed", "functions of plant parts", "plants"],
            learning_objectives: [
              "Name parts of a plant and their functions",
              "Identify types of plants"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["label plant parts", "match part to function", "draw and label a plant"]
          },
          {
            id: "C2-EVS-2",
            name: "Water – Sources & Conservation",
            triggers: ["water", "sources of water", "uses of water", "save water", "water conservation", "river lake pond"],
            learning_objectives: [
              "Name sources of water (rain, river, lake, well)",
              "List uses of water",
              "Explain importance of saving water"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["name the water source", "uses of water", "ways to save water"]
          },
          {
            id: "C2-EVS-3",
            name: "Air – Properties and Uses",
            triggers: ["air", "uses of air", "wind", "moving air", "properties of air", "we need air"],
            learning_objectives: [
              "Describe properties of air",
              "List uses of air for living things"
            ],
            bloom_level: "Remember, Understand",
            worksheet_types: ["properties of air", "uses of air", "true or false about air"]
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  //  CLASS 3  (Grade 3 / Std 3)
  // ─────────────────────────────────────────────────────────────
  Class3: {
    label: "Class 3 / Grade 3 / Std 3",
    aliases: [
      "class 3", "class iii", "grade 3", "3rd grade", "std 3", "standard 3",
      "class three", "third grade", "year 3", "primary 3"
    ],

    subjects: {

      Math: {
        display: "Mathematics",
        keywords: ["math", "maths", "mathematics", "numbers", "addition", "subtraction", "multiplication", "division", "fractions", "geometry"],
        topics: [
          {
            id: "C3-MATH-1",
            name: "4-Digit Numbers & Place Value",
            triggers: ["4 digit numbers", "thousands", "numbers up to 9999", "place value thousands", "large numbers class 3"],
            learning_objectives: ["Read and write 4-digit numbers", "Understand thousands, hundreds, tens, ones"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["place value chart 4-digit", "expanded form", "compare 4-digit numbers"]
          },
          {
            id: "C3-MATH-2",
            name: "Addition of Large Numbers",
            triggers: ["addition of 3 digit", "addition of 4 digit", "carrying large numbers", "column addition 3 digit"],
            learning_objectives: ["Add 3 and 4-digit numbers with carrying", "Solve word problems"],
            bloom_level: "Apply, Analyze",
            worksheet_types: ["column addition", "word problems", "mental math addition"]
          },
          {
            id: "C3-MATH-3",
            name: "Subtraction of Large Numbers",
            triggers: ["subtraction of 3 digit", "borrowing large numbers", "subtraction 4 digit"],
            learning_objectives: ["Subtract 3 and 4-digit numbers", "Use borrowing method"],
            bloom_level: "Apply",
            worksheet_types: ["column subtraction", "borrowing subtraction", "word problems"]
          },
          {
            id: "C3-MATH-4",
            name: "Multiplication Tables 6–10",
            triggers: ["tables 6 to 10", "table of 6", "table of 7", "table of 8", "table of 9", "table of 10", "pahada 6 se 10", "multiplication tables class 3"],
            learning_objectives: ["Memorize tables 6–10", "Multiply 2-digit by 1-digit"],
            bloom_level: "Remember, Apply",
            worksheet_types: ["fill the times table", "2-digit multiplication", "word problems"]
          },
          {
            id: "C3-MATH-5",
            name: "Division with Remainder",
            triggers: ["division", "remainder", "divide 2 digit", "2-digit division", "long division class 3"],
            learning_objectives: ["Divide 2-digit numbers by 1-digit", "Understand remainder"],
            bloom_level: "Apply",
            worksheet_types: ["short division", "division with remainder", "word problems"]
          },
          {
            id: "C3-MATH-6",
            name: "Basic Fractions",
            triggers: ["fractions", "half quarter one-third", "equal parts", "numerator denominator", "basic fractions class 3"],
            learning_objectives: ["Identify fractions as equal parts of a whole", "Compare like fractions"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["shade the fraction", "write the fraction", "compare fractions"]
          },
          {
            id: "C3-MATH-7",
            name: "Properties of Addition",
            triggers: [
              "properties of addition", "commutative property", "associative property",
              "identity property", "closure property", "addition properties"
            ],
            learning_objectives: [
              "State and apply commutative property (a+b = b+a)",
              "State and apply associative property",
              "Identify identity element (0) for addition"
            ],
            bloom_level: "Understand, Apply",
            worksheet_types: ["fill in commutative property", "associative grouping", "identify the property"]
          }
        ]
      },

      Science: {
        display: "Science / EVS",
        keywords: ["science", "evs", "environmental", "food", "water cycle", "soil", "light", "shadow", "plants", "animals"],
        topics: [
          {
            id: "C3-SCI-1",
            name: "Food – Sources & Nutrients",
            triggers: ["food sources", "nutrients", "food chain", "healthy eating", "balanced diet", "food from plants animals"],
            learning_objectives: ["Classify food by source", "Identify basic nutrients", "Understand balanced diet"],
            bloom_level: "Remember, Understand",
            worksheet_types: ["food sources chart", "classify food", "balanced diet plate"]
          },
          {
            id: "C3-SCI-2",
            name: "Water Cycle",
            triggers: ["water cycle", "evaporation", "condensation", "precipitation", "cloud formation", "rain cycle"],
            learning_objectives: ["Describe stages of the water cycle", "Explain evaporation and condensation"],
            bloom_level: "Understand, Analyze",
            worksheet_types: ["label the water cycle", "fill stages of water cycle", "true or false"]
          },
          {
            id: "C3-SCI-3",
            name: "Light and Shadow",
            triggers: ["light shadow", "shadow formation", "transparent opaque", "sources of light", "reflection"],
            learning_objectives: ["Explain how shadows form", "Classify materials as transparent, translucent, opaque"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["shadow drawing", "classify materials", "light and shadow experiment"]
          }
        ]
      },

      English: {
        display: "English Language Arts",
        keywords: ["english", "grammar", "tense", "punctuation", "comprehension", "composition", "writing"],
        topics: [
          {
            id: "C3-ENG-1",
            name: "Tenses",
            triggers: ["tense", "past tense", "present tense", "future tense", "was were", "will shall", "simple past"],
            learning_objectives: ["Use present, past and future tense", "Identify tense in sentences"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["change the tense", "fill in correct tense", "rewrite in past tense"]
          },
          {
            id: "C3-ENG-2",
            name: "Punctuation",
            triggers: ["punctuation", "full stop", "comma", "question mark", "exclamation mark", "apostrophe"],
            learning_objectives: ["Use punctuation marks correctly", "Identify punctuation errors"],
            bloom_level: "Apply",
            worksheet_types: ["add the punctuation", "correct the punctuation", "punctuation matching"]
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  //  CLASS 4  (Grade 4 / Std 4)
  // ─────────────────────────────────────────────────────────────
  Class4: {
    label: "Class 4 / Grade 4 / Std 4",
    aliases: [
      "class 4", "class iv", "grade 4", "4th grade", "std 4", "standard 4",
      "class four", "fourth grade", "year 4"
    ],

    subjects: {
      Math: {
        display: "Mathematics",
        keywords: ["math", "maths", "mathematics", "lakhs", "fractions", "decimals", "geometry", "angles", "area perimeter"],
        topics: [
          {
            id: "C4-MATH-1",
            name: "Large Numbers – Lakhs",
            triggers: ["lakhs", "5 digit numbers", "6 digit numbers", "large numbers class 4", "indian number system"],
            learning_objectives: ["Read and write up to 6-digit numbers", "Understand Indian number system (lakhs)"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["place value up to lakhs", "write in expanded form", "compare large numbers"]
          },
          {
            id: "C4-MATH-2",
            name: "Multiplication of Large Numbers",
            triggers: ["multiply 3 digit", "multiply 4 digit", "long multiplication class 4", "3-digit by 2-digit"],
            learning_objectives: ["Multiply 3-digit by 2-digit numbers", "Apply in word problems"],
            bloom_level: "Apply",
            worksheet_types: ["long multiplication", "word problems", "mental math"]
          },
          {
            id: "C4-MATH-3",
            name: "Fractions – Like & Unlike",
            triggers: ["like fractions", "unlike fractions", "equivalent fractions", "comparing fractions", "adding fractions class 4"],
            learning_objectives: ["Find equivalent fractions", "Add like fractions", "Compare fractions"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["equivalent fractions", "add like fractions", "compare fractions"]
          },
          {
            id: "C4-MATH-4",
            name: "Area and Perimeter",
            triggers: ["area", "perimeter", "area of rectangle", "perimeter of square", "area and perimeter class 4"],
            learning_objectives: ["Calculate area and perimeter of rectangles and squares", "Apply in word problems"],
            bloom_level: "Apply",
            worksheet_types: ["find the area", "find the perimeter", "word problems"]
          },
          {
            id: "C4-MATH-5",
            name: "Angles",
            triggers: ["angles", "acute angle", "obtuse angle", "right angle", "types of angles class 4"],
            learning_objectives: ["Identify acute, obtuse and right angles", "Measure angles with protractor"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["name the angle", "measure the angle", "draw the angle"]
          }
        ]
      },
      Science: {
        display: "Science",
        keywords: ["science", "adaptation", "force", "natural disaster", "plants animals"],
        topics: [
          {
            id: "C4-SCI-1",
            name: "Adaptation in Animals",
            triggers: ["adaptation animals", "camouflage", "hibernation", "migration", "animal adaptation class 4"],
            learning_objectives: ["Explain adaptations in animals", "Give examples of camouflage, hibernation, migration"],
            bloom_level: "Understand, Analyze",
            worksheet_types: ["match adaptation to animal", "explain the adaptation", "examples of camouflage"]
          },
          {
            id: "C4-SCI-2",
            name: "Force and Motion",
            triggers: ["force", "push pull", "motion", "friction", "gravity class 4"],
            learning_objectives: ["Define force", "Identify types of force: friction, gravity"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["push or pull?", "effects of friction", "fill in about gravity"]
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  //  CLASS 5  (Grade 5 / Std 5)
  // ─────────────────────────────────────────────────────────────
  Class5: {
    label: "Class 5 / Grade 5 / Std 5",
    aliases: [
      "class 5", "class v", "grade 5", "5th grade", "std 5", "standard 5",
      "class five", "fifth grade", "year 5"
    ],

    subjects: {
      Math: {
        display: "Mathematics",
        keywords: ["math", "maths", "crores", "fractions", "decimals", "percentage", "average", "volume"],
        topics: [
          {
            id: "C5-MATH-1",
            name: "Large Numbers – Crores",
            triggers: ["crores", "7 digit numbers", "8 digit numbers", "crore class 5"],
            learning_objectives: ["Read and write numbers up to crores", "Compare Indian and International number systems"],
            bloom_level: "Understand, Apply",
            worksheet_types: ["place value up to crores", "Indian vs international system"]
          },
          {
            id: "C5-MATH-2",
            name: "Fractions – Unlike & Operations",
            triggers: ["unlike fractions", "lcm fractions", "add unlike fractions", "mixed numbers", "fractions class 5"],
            learning_objectives: ["Add and subtract unlike fractions using LCM", "Convert mixed numbers"],
            bloom_level: "Apply, Analyze",
            worksheet_types: ["add unlike fractions", "LCM method", "mixed number conversion"]
          },
          {
            id: "C5-MATH-3",
            name: "Percentage",
            triggers: ["percentage", "percent", "%", "fraction to percent", "percentage class 5"],
            learning_objectives: ["Convert fractions to percentages", "Solve percentage problems"],
            bloom_level: "Apply",
            worksheet_types: ["fraction to percent", "find the percentage", "percentage word problems"]
          },
          {
            id: "C5-MATH-4",
            name: "Average",
            triggers: ["average", "mean", "arithmetic mean", "find the average class 5"],
            learning_objectives: ["Calculate average", "Solve average word problems"],
            bloom_level: "Apply",
            worksheet_types: ["find the average", "word problems on average"]
          }
        ]
      },
      Science: {
        display: "Science",
        keywords: ["science", "solar system", "body systems", "reproduction", "rocks minerals"],
        topics: [
          {
            id: "C5-SCI-1",
            name: "Solar System",
            triggers: ["solar system", "planets", "earth rotation revolution", "moon phases", "solar system class 5"],
            learning_objectives: ["Name planets in order", "Explain rotation vs revolution"],
            bloom_level: "Remember, Understand",
            worksheet_types: ["label the solar system", "rotation vs revolution", "planet facts"]
          },
          {
            id: "C5-SCI-2",
            name: "Human Body Systems",
            triggers: ["digestive system", "respiratory system", "circulatory system", "nervous system", "body systems class 5"],
            learning_objectives: ["Describe major body systems and their functions"],
            bloom_level: "Understand, Analyze",
            worksheet_types: ["label the system", "function matching", "fill in the blanks"]
          }
        ]
      }
    }
  }
}