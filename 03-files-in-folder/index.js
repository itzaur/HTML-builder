const fsPromises = require('fs').promises;
const path = require('path');

const checkFilesInFolder = async () => {
  try {
    const files = await fsPromises.readdir(
      path.join(__dirname, 'secret-folder'),
      { withFileTypes: true }
    );

    for (const file of files) {
      if (!file.isDirectory()) {
        const fileStats = await fsPromises.stat(
          path.join(__dirname, 'secret-folder', file.name)
        );

        const fileName = file.name.match(/[^.]*/);
        const fileExtension = path.extname(file.name).slice(1);
        const fileSize = fileStats.size;

        console.log(`${fileName} - ${fileExtension} - ${fileSize} bytes`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

checkFilesInFolder();
