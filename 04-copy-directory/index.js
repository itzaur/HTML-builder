const fsPromises = require('fs').promises;
const path = require('path');

const copyDirectory = async () => {
  try {
    const files = await fsPromises.readdir(path.join(__dirname, 'files'));

    await fsPromises.rm(path.join(__dirname, 'files-copy'), {
      recursive: true,
      force: true,
    });

    await fsPromises.mkdir(path.join(__dirname, 'files-copy'), {
      recursive: true,
    });

    for (const file of files) {
      await fsPromises.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file)
      );
    }
  } catch (err) {
    console.error(err);
  }
};

copyDirectory();
