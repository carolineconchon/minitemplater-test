const fs = require("fs");
const file = process.argv[2];
const text = fs.readFileSync(file).toString();

const render = (text, data, delimiters) => {
  let output = "";
  let i = 0;

  //run the text
  while (i < text.length) {
    let found = false;

    for (const delimiterSet of delimiters) {
      //set the start and ending of each delimiters 
      const startDelimiter = delimiterSet[0];
      const endDelimiter = delimiterSet[1];

      if (text.startsWith(startDelimiter + '#', i)) {
        // Début d'une liste
        const key = text.substring(i + startDelimiter.length + 1, text.indexOf(endDelimiter, i));
        const listData = data[key] || [];
        
        // Crée la liste en ajoutant chaque élément avec un saut de ligne
        listData.forEach(item => {
          output += `- ${item.name}\n`;
        });

        i = text.indexOf(endDelimiter, i) + endDelimiter.length;
        found = true;
        break;
      } else if (text.startsWith(startDelimiter, i)) {
        const startIndex = i + startDelimiter.length;
        const endIndex = text.indexOf(endDelimiter, startIndex);

        if (endIndex !== -1) {
          // we stock the text beetween
          const key = text.substring(startIndex, endIndex);
          output += data[key] || "";
          //update i position to skip the last delimiter 
          i = endIndex + endDelimiter.length;
          //a delimiter is found
          found = true;
          //stop the loop
          break;
        }
      }
    }

    if (!found) {
      // so add the original text, the error isn't corrected
      output += text[i];
      //increment 
      i++;
    }
  }

  return output;
};

const data = {
  users: [
    { name: "John" },
    { name: "Patricia" },
    { name: "Sacha" }
  ]
};

const delimiters = [['{', '}'], ['[[', ']]'], ['%', '%']];

const output = render(text, data, delimiters);
console.log('Output is : ');
console.log(output);
fs.writeFileSync("output.txt", output);
