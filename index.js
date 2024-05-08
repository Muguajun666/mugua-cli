const clone = require('git-clone');

const shell = require('shelljs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');

const projectMap = require('./lib/config');
const version = require('./package.json').version;

const run = async () => {
  print();
  const answers = await askQuestions();
  create(answers);
};

const print = () =>
  console.log(
    chalk.green(
      figlet.textSync('MUGUA-CLI', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );

const askQuestions = () => {
  const prompt = inquirer.createPromptModule();
  const questions = [
    {
      name: 'project',
      type: 'input',
      message: 'your project name',
    },
    {
      type: 'list',
      name: 'template',
      message: 'choose your project template',
      choices: Object.keys(projectMap),
    },
  ];
  return prompt(questions);
};

const create = ({ project, template }) => {
  const spinner = ora('downloading template');
  spinner.start();

  const pwd = shell.pwd();
  const dest = `${pwd}/${project}`;
  const { url, description } = projectMap[template];
  console.log(chalk.yellow(` ${description}`));
  clone(url, dest, null, function () {
    spinner.stop();
    shell.rm('-rf', dest + '/.git');
    console.log(chalk.white.bgGreen.bold(`Done! project created at ${dest}`));
  });
};

try {
  run();
} catch (error) {
  console.log(chalk.red(error));
}
