/*const fs = require("fs");
const file = process.argv[2];
const text = fs.readFileSync(file).toString();

const render = (text, data) => {
  let start = false;
  let end = false;
  let innerTag = "";
  //var to stocked the type of char
  let charType = "";
  let output = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    //condition to check what type of char is used, {} or [[]], i use text[i+1] to verify if the second  [ is write .
    if (char === '{' || (char === '[' && text[i + 1] === '[')) {
      start = true;
      charType = char;
      innerTag = "";
    }
    //same at the start but with closing char
    if (char === '}' || (char === ']' && text[i + 1] === ']')) {
      end = true;
    }

    if (start === true) {
      innerTag += char;
    }

    if (!start && !end) {
      output += char;
    }

    if (start && end) {
      start = false;
      end = false;
      //i use a condition and not a || because [] are double so i have to start subdtring at 2 instead of 1
      if (charType === "{") {
		let value = data[innerTag.substring(1, innerTag.length - 1)];
        
          output += value;
        
      } else if (charType === "[") {
        let value = data[innerTag.substring(2, innerTag.length - 1)];
          output += value;
      }
      innerTag = ""; 
	  i++
    }
  }

  return output;
}

const data = {
  name: "John",
}

const output = render(text, data);
console.log('Output is : ');
console.log(output);
fs.writeFileSync("output.txt", output); */