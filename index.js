const clone = require('git-clone');

const shell = require('shelljs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

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
  const pwd = shell.pwd();
  const { url, description } = projectMap[template]
  console.log(chalk.yellow(description))
  clone(url, pwd + `/${project}`, null, function () {
    shell.rm('-rf', pwd + `/${project}/.git`);
    console.log(chalk.green('project is finished'))
  });
};

try {
  run()
} catch (error) {
  console.log(chalk.red(error))
}