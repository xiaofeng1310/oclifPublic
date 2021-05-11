const {Command, flags} = require('@oclif/command')
// const Git = require('nodegit')
const download = require('download-git-repo')
const path = require('path')
const fs = require('fs')
// 运行时所在的目录
const runPath = path.resolve('./') + '/src/template'
// 当前目录
const runDir = fs.readdirSync(runPath)
class MyCommand extends Command {
  static description = 'description of this example command'
  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    create: flags.string({char: 'c', description: 'name to print'})
  }
  async run () {
    const {flags} = this.parse(MyCommand)
    if (!flags.create) this.error('The lack of create command')
    const dirs = this.getDirs()
    // 当前目录没有该文件夹名称
    if (!this.isDirName(dirs, flags.create)) this.error('There is no such name')
    // 下载文件
    download('github:xiaofeng1310/xespublic', runPath +'/'+ flags.create, function (err) {
      console.log(err)
    })
  }
  /**
   * 获取目录文件
   *
   * @memberof MyCommand
   */
  getDirs () {
    return runDir.filter(item => {
      let stat = fs.lstatSync(runPath +'/'+ item)
      if (stat.isDirectory()) return item
    })
  }
  /**
   * 检查当前目录是否有该文件夹
   *
   * @memberof MyCommand
   */
  isDirName (dirs, name) {
    return dirs.some(item => item == name)
  }
}


module.exports = MyCommand
