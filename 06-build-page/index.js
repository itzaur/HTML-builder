const fsPromises = require('fs').promises;
const path = require('path');

class BuildHTMLPage {
  constructor() {
    this.createHTML();

    this.copyDirectory(
      path.join(__dirname, 'assets'),
      path.join(__dirname, 'project-dist', 'assets')
    );

    this.mergeStyles();
  }

  async createHTML() {
    try {
      const components = await fsPromises.readdir(
        path.join(__dirname, 'components'),
        { withFileTypes: true }
      );

      let template = await fsPromises.readFile(
        path.join(__dirname, 'template.html'),
        { encoding: 'utf8' }
      );

      const array = [];

      for (const file of components) {
        if (file.isFile() && path.extname(file.name).includes('html')) {
          const readFile = await fsPromises.readFile(
            path.join(__dirname, 'components', file.name),
            { encoding: 'utf8' }
          );

          const component = file.name.match(/[^.]*/);

          template = template.replace(`{{${component}}}`, readFile);

          array.push(readFile);

          await fsPromises.writeFile(
            path.join(__dirname, 'project-dist', 'temlate.html'),
            template
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async copyDirectory(src, destination) {
    const files = await fsPromises.readdir(src, {
      withFileTypes: true,
    });

    await fsPromises.rm(destination, {
      recursive: true,
      force: true,
    });

    await fsPromises.mkdir(destination, {
      recursive: true,
    });

    for (const file of files) {
      const srcPath = path.join(src, file.name);
      const destinationPath = path.join(destination, file.name);

      if (file.isDirectory()) {
        await this.copyDirectory(srcPath, destinationPath);
      } else {
        await fsPromises.copyFile(srcPath, destinationPath);
      }
    }
  }

  async mergeStyles() {
    try {
      const files = await fsPromises.readdir(path.join(__dirname, 'styles'), {
        withFileTypes: true,
      });

      const array = [];

      for (const file of files) {
        if (file.isFile() && path.extname(file.name).includes('css')) {
          const readFile = await fsPromises.readFile(
            path.join(__dirname, 'styles', file.name)
          );

          array.push(readFile);

          await fsPromises.writeFile(
            path.join(__dirname, 'project-dist', 'style.css'),
            array.join('\n')
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

new BuildHTMLPage();
