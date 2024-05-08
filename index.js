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

// program
//   .version(version)
//   .description('mugua-cli: my cli program')
// program
//   .command('* <tpl> <project>')
//   .action(function(template, project) {
//     log.info('follow is format command for mugua-cli')
//     log.info('mugua-cli vue/vue-ts/koa-ts/tool-ts/website/electron/mini-app my-project')

//     if (!projectMap[template]) {
//       log.error('such template is not exist')
//       return
//     }

//     if (!project) {
//       log.warn('please input your project name')
//     }

//     const { url, description } = projectMap[template]
//     log.info(`url: ${url}`)
//     log.info(`description: ${description}`)

//     let pwd = shell.pwd()

//     log.info(`download template project code, full path: ${pwd}/${project}/ ...`)
//     clone(url, pwd + `/${project}`, null, function() {
//         shell.rm('-rf', pwd + `/${project}/.git`)
//         log.info('project is finished')
//     })
//   })
// program
//   .parse(process.argv)


try {
  run()
} catch (error) {
  console.log(chalk.red(error))
}