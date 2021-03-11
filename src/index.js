const {Command, flags} = require('@oclif/command')
const Git = require('nodegit')
const path = require('path')

class MyCommand extends Command {
  static description = 'description of this example command'
  static usage = 'mycommand --myflag'
  static flags = {
    create: flags.string()
  }
  async run() {
    const {flags} = this.parse(MyCommand)
    if (!flags.create) this.error('缺少--create命令')
    Git.Clone("https://github.com/xiaofeng1310/xespublic.git", path.resolve('./'+ flags.create))
      .then((repo) => {
        this.log(repo.getHeadCommit())
        return repo.getBranchCommit('main')
      })
  }
}


module.exports = MyCommand
