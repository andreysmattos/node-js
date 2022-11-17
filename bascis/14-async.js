const { readFile } = require("fs");

const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data);
      }
    });
  });
};

getText("./content/first.txt")
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

getText("./content/second.txt")
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

(async function () {
    try {
        const file1 = await getText("./content/first.txt");
        const file2 = await getText("./content/second.txt");

        console.log(file1, file2)

    } catch (error) {
        throw new error;
    }
})();
