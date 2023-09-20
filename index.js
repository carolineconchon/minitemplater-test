const fs = require("fs");
const file = process.argv[2];
const text = fs.readFileSync(file).toString();

const render = (text, data) => {
  let start = false;
  let end = false;
  let innerTag = "";
  let charType = "";
  let output = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '{' || (char === '[' && text[i + 1] === '[')) {
      start = true;
      charType = char;
      innerTag = "";
    }

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
fs.writeFileSync("output.txt", output);



// const render = (text, data) => {
// 	return text.replace(/(\[\[name\]\])|(\{name\})/g, data.name)
// }


