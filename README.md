# mugua-cli
init project for cli tool

## Insall

``` bash
npm install -g mugua-cli
```

## Usage

``` bash
mugua
```

``` bash
Usage: mugua <command> [options]

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  init [name]                  Initialize a kind of template
  list                         List templates
  help [command]               display help for command
```

### 1. mugua init

根据模板初始化项目

you can choice one of below templates:
* [vue-typescirpt](https://github.com/lq782655835/standard-vue-typescript-project)<sup>`new`</sup>
* [vue](https://github.com/lq782655835/standard-vue-project)<sup>`base on vue-cli3`</sup>
* [electron](https://github.com/lq782655835/electron-vue-template.git)<sup>`base on electron-vue`</sup>
* [official-website](https://github.com/lq782655835/official-website-project)<sup>`base on nuxt`</sup>
* [mini-app](https://github.com/lq782655835/mpvue-project)<sup>`base on mpvue`</sup>
* [node-tool](https://github.com/lq782655835/json2ts)

### 2. mugua list

列出所有项目模板