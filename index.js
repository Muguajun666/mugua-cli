const clone = require('git-clone');

const shell = require('shelljs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');

const config = require('./lib/config');
const version = require('./package.json').version;

const run = async () => {
  print();
  const answer = await askQuestions();
  create(getTemplateKey(answer));
};

const getTemplateKey = (answer) => {
  return {
    ...answer,
    template: answer.template.split(' ')[0]
  }
}

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

const askQuestions = () => {
  const maxCharLength = Math.max(
    ...Object.keys(config).map((key) => key.length)
  );
  const strPadEndLength = maxCharLength + 10;
  const choices = Object.keys(config).map(
    (key) => `${key.padEnd(strPadEndLength)} ${config[key].description}`
  );

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
      choices,
    },
  ];
  return prompt(questions);
};

const create = ({ project, template }) => {
  const dest = `${shell.pwd()}/${project}`;
  if (shell.test('-e', dest)) {
    console.log(chalk.red('目标文件夹已存在'));
    process.exit(1);
  }

  const spinner = ora('downloading template');
  spinner.start();

  const { url } = config[template];
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
