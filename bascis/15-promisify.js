const { readFile, writeFile } = require("fs");
const util = require('util');

const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);


(async function () {
    try {
        const file1 = await readFilePromise("./content/first.txt", 'utf8');
        const file2 = await readFilePromise("./content/second.txt", 'utf8');

        writeFilePromise('./content/result.txt', `${file1}\n${file2}`)

        console.log(file1, file2)

    } catch (error) {
        console.log(error);
        // throw new error;
    }
})();
