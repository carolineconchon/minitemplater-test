const fs = require("fs");
const file = process.argv[2];
const text = fs.readFileSync(file).toString();
//add a new params
const render = (text, data, delimiters) => {
  let output = "";
  let i = 0;

  //run the text
  while (i < text.length) {
    let found = false;
    //loop on the delimiters array
    for (const delimiterSet of delimiters) {
      //set the start and ending of each delimiters 
      const startDelimiter = delimiterSet[0];
      const endDelimiter = delimiterSet[1];
      //if a delimiter start 
      if (text.startsWith(startDelimiter, i)) {
        //delimit the beetween of delimiters
        const startIndex = i + startDelimiter.length;
        const endIndex = text.indexOf(endDelimiter, startIndex);
        // endIndex is not at the delimiter closer
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
      //if not found it means we don't have a delimiter 
    if (!found) {
      // so add the original text, the error isn't corrected
      output += text[i];
      //increment 
      i++;
    }
  }

  return output;
}

const data = {
  name: "John",
}
//personalised delemiters
const delimiters = [['{', '}'], ['[[', ']]'], ['%', '%']]; 

const output = render(text, data, delimiters);
console.log('Output is : ');
console.log(output);
fs.writeFileSync("output.txt", output);
