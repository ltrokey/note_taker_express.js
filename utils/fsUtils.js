const fs = require("fs");
const util = require("util");

const read_File = util.promisify(fs.readFile);

const write_File = (content, destination) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (error) => {
      error
        ? (console.error(`Error writing note to file.`), reject(error))
        : (console.info(`\nData written to ${destination}`), resolve());
    });
  });
};

const read_Append = (content, file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (error, data) => {
      error
        ? (console.error(`Error appending note to file`), reject(error))
        : ((parsedData = JSON.parse(data)),
          parsedData.push(content),
          write_File(parsedData, file)
            .then(() => resolve())
            .catch((err) => reject(err)));
    });
  });
};

module.exports = { read_File, write_File, read_Append };
