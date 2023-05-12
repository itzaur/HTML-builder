const fsPromises = require('fs').promises;
const path = require('path');

const mergeStyles = async () => {
  try {
    const files = await fsPromises.readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });

    const array = [];

    for (const file of files) {
      if (file.isFile() && path.extname(file.name).includes('.css')) {
        const readFile = await fsPromises.readFile(
          path.join(__dirname, 'styles', file.name)
        );

        array.push(readFile);

        await fsPromises.writeFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          array
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
};

mergeStyles();
