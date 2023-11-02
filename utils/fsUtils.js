const fs = require("fs");
const util = require("util");

const read_File = util.promisify(fs.readFile);
const write_File = util.promisify(fs.writeFile);

const read_Append = (content, file) => {
  return read_File(file, "utf8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      return write_File(file, JSON.stringify(parsedData, null, 4));
    })
    .catch((error) => {
      console.error("Error appending note to file", error);
      throw error;
    });
};

module.exports = { read_File, write_File, read_Append };
