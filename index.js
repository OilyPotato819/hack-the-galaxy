const fs = require('fs');

const fileName = 'common';

const buffer = fs.readFileSync(`word-lists/${fileName}.txt`);

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

const allWords = buffer.toString().split('\n');

allWords.forEach((element) => {
	 let word = element.replace(/\s/g, '');
	
   const firstLetter = word[0];

   if (/^[a-zA-Z]+$/.test(word) && word.length > 1) {
      words[firstLetter].push(word);
      goodWords.push(word);
   }
});

const validWords = new Map();

const signals = [
   'wfpealaotwehmear',
   'papsfrutesutternet', 
   'epalwrotavey', 
   'licagamchitetraison', 
   'rafietamidrey', 
   'holioskinnecker', 
   'whildorsawen', 
   'lierfictengthert', 
   'litbigonesareress', 
   'gasmarmtechet'
];

let currentSignal = signals[0];

const firstWords = words[currentSignal[0]].concat(words[currentSignal[1]]);
let firstWordCounter = 0;

firstWords.forEach((firstWord) => {
   firstWordCounter++;
	 // console.log(`${firstWordCounter}/${firstWords.length}`)
	
   let lettersLeft1 = currentSignal;
   let lettersLeft2 = currentSignal;

   for (let letterNum = 0; letterNum < firstWord.length; letterNum++) {
      const letter = firstWord[letterNum];
      const index = lettersLeft1.indexOf(letter);

      if (index > -1) {
			 if (letterNum === 0) {
					var firstLetter1 = currentSignal.indexOf(letter);
				}
				
			 lettersLeft1 = lettersLeft1.slice(index + 1);
       lettersLeft2 = lettersLeft2.replace(letter, '');
      } else {
        return;
      }
   }

   validWords.set(firstWord, []);
	
   goodWords.forEach((secondWord) => {
      if (secondWord === firstWord) return;
      let lettersLeft3 = lettersLeft2;
		  let lettersLeftWord = lettersLeft2;
		 
      for (let letterNum = 0; letterNum < secondWord.length; letterNum++) {
        const letter = secondWord[letterNum];
        const index = lettersLeftWord.indexOf(letter);

        if (index > -1) {
          if (letterNum === 0) {
						var firstLetter2 = currentSignal.indexOf(letter);
					}
					
          lettersLeftWord = lettersLeftWord.replace(letter, '')
					lettersLeft3 = lettersLeft3.replace(letter, '');
		  	} else {
          return;
        }
			}
       
      goodWords.forEach((thirdWord) => {
        if (
					firstWord.length + secondWord.length + thirdWord.length !== currentSignal.length - 1 ||
					thirdWord === firstWord || thirdWord === secondWord
				) {
				  return;
        }
			   
				lettersLeftWord = lettersLeft3;

         for (let letterNum = 0; letterNum < thirdWord.length; letterNum++) {
            const letter = thirdWord[letterNum];
            const index = lettersLeftWord.indexOf(letter);

            if (index > -1) {
							if (letterNum === 0) {
					    	var firstLetter3 = currentSignal.indexOf(letter);
				    	}
							
              lettersLeftWord = lettersLeftWord.replace(letter, '');
            } else {
              return;
            }
         }
          if (firstLetter1 < firstLetter2 && firstLetter2 < firstLetter3) {
						validWords.get(firstWord).push([secondWord, thirdWord, lettersLeftWord]);
					}
      });
   });

	 if (!validWords.get(firstWord)[0]) {
		 validWords.delete(firstWord);
	 };
});

if (!validWords.size) {
	validWords.set('No results found', '')
}

function mapToObj(map) {
   const obj = {};
   for (let [k, v] of map) obj[k] = v;
   return obj;
}

const myJson = {};
myJson.validWords = mapToObj(validWords);
let json = JSON.stringify(myJson);

const replacements = [
  [/:/g, ':\n'],
  [/],/g, '],\n'],
	[/\n"/g, '\n\n"'],
	[/\[\[/g, '['],
	[/\]\]/g, ']'],
	[/{/g, ''],
	[/}/g, ''],
	[/"validWords":/g, '"validWords":\n'],
	[/:\n\n""/g, ''],
];

replacements.forEach(r => {
	json = json.replace(r[0], r[1])
})

const file = fs.createWriteStream('output.txt');

file.on('error', (err) => {
   console.log('got an error');
});

file.write(`${fileName}.txt\n\n${currentSignal}\n\n${json}`);

file.end();
