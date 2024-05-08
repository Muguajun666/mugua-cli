const clone = require('git-clone');

const shell = require('shelljs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');

const config = require('./lib/config');

const run = async (options) => {
  print();
  const answer = await askQuestions(options);
  console.log(answer);
  create(answer);
};

const print = () => {
  console.log(
    chalk.green(
      figlet.textSync('MUGUA-CLI', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );
  console.log(
    chalk.green(
      'you can see more templates at: https://github.com/lq782655835/ts-templates'
    )
  );
};

const askQuestions = async ({ name, url }) => {
  const prompt = inquirer.createPromptModule();

  if (!name) {
    const { newName } = await prompt([
      {
        name: 'newName',
        type: 'input',
        message: 'your project name',
      },
    ]);

    name = newName;
  }

  if (!url) {
    const getChoices = (config) => {
      const maxCharLength = Math.max(
        ...Object.keys(config).map((key) => key.length)
      );
      const strPadEndLength = maxCharLength + 5;
      const choices = Object.keys(config).map((key) => {
        const url = config[key].url;
        const desc = `${chalk.yellow('★')}  ${chalk.blue(
          key.padEnd(strPadEndLength)
        )} - ${config[key].description}`;
        return { name: desc, value: url };
      });
      return choices;
    };

    const { newUrl } = await prompt([
      {
        type: 'list',
        name: 'newUrl',
        message: 'choose your project template',
        choices: getChoices(config)
      }
    ])

    url = newUrl
  }

  return { name, url }
};

const create = ({ name, url }) => {
  const dest = `${shell.pwd()}/${name}`;
  if (shell.test('-e', dest)) {
    console.log(chalk.red('目标文件夹已存在'));
    process.exit(1);
  }

  const spinner = ora('downloading template');
  spinner.start();

  clone(url, dest, null, function () {
    spinner.stop();
    shell.rm('-rf', dest + '/.git');
    console.log(chalk.white.bgGreen.bold(`Done! project created at ${dest}`));
  });
};


module.exports = run