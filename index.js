const fs = require('fs');

const buffer = fs.readFileSync('test.txt');

const words = {
   a: [],
   b: [],
   c: [],
   d: [],
   e: [],
   f: [],
   g: [],
   h: [],
   i: [],
   j: [],
   k: [],
   l: [],
   m: [],
   n: [],
   o: [],
   p: [],
   q: [],
   r: [],
   s: [],
   t: [],
   u: [],
   v: [],
   w: [],
   x: [],
   y: [],
   z: [],
};

const goodWords = [];

const allWords = buffer.toString().split('\r\n');

allWords.forEach((word) => {
   const firstLetter = word[0];

   if (/^[a-zA-Z]+$/.test(word) && word.length > 1) {
      words[firstLetter].push(word);
      goodWords.push(word);
   }
});

const signals = [
   'papsfrutesutternet',
   //    'epalwrotavey',
   //    'licagamchitetraison',
   //    'rafietamidrey',
   //    'holioskinnecker',
   //    'whildorsawen',
   //    'lierfictengthert',
   //    'litbigonesareress',
   //    'gasmarmtechet',
];

const validWords = {
   papsfrutesutternet: new Map(),
   epalwrotavey: new Map(),
   licagamchitetraison: new Map(),
   rafietamidrey: new Map(),
   holioskinnecker: new Map(),
   whildorsawen: new Map(),
   lierfictengthert: new Map(),
   litbigonesareress: new Map(),
   gasmarmtechet: new Map(),
};

signals.forEach((signal) => {
   const firstLetter1 = signal[0];

   words[firstLetter1].forEach((firstWord) => {
      let lettersLeft1 = signal;
      let lettersLeft2 = signal;

      for (let letterNum = 0; letterNum < firstWord.length; letterNum++) {
         const letter = firstWord[letterNum];

         const index = lettersLeft1.indexOf(letter);

         if (index > -1) {
            lettersLeft1 = lettersLeft1.slice(index + 1);
            lettersLeft2 = lettersLeft2.replace(letter, '');
         } else {
            return;
         }
      }
   });
});
