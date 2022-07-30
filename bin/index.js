#! /usr/bin/env node
const yargs = require('yargs')
const login = require('./login')
const addUsers = require('./addUsers')
const fs = require('fs')
const os = require('os')

const tokenPath = `${os.homedir}/.htb_token`

const main = async () => {
    const usage = "\nUsage: htb_addusers <option>";
    const options = yargs
        .usage(usage)  
        .option("l", {alias:"login", describe: "Login to HTB", type: "array", demandOption: false })
        .option("a", {alias:"add", describe: "Add list of users", type: "array", demandOption: false }) 
        .argv

    if (options.l) {
        if(yargs.argv.login.length == 2){
            const username = yargs.argv.login[0]
            const password = yargs.argv.login[1]
            await login.login(username,password)    
        } else {
            login.help()
            return;
        }
        
    } 
    else if (options.a) {
        if (fs.existsSync(tokenPath)) {
            if(yargs.argv.add.length == 2){
                const labUrl = yargs.argv.add[0]
                const usersList = yargs.argv.add[1]
                addUsers.addUsers(labUrl,usersList)
            } else {
                addUsers.help()
                return;
            }
        }else {
            console.log("You need to login first!\nUse --login to login")
            return
        }
    } 
    else {
        yargs.showHelp()
        return
    }
}

main()