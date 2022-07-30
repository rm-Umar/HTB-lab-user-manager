const puppeteer = require('puppeteer')
const fs = require('fs')
const os = require('os')

const url = "https://www.hackthebox.eu/login"
const tokenPath = `${os.homedir}/.htb_token`
var apiTokens = ""

const login = async (username,password) => {
    // checking if apiToken already exists in home dir.
    if (fs.existsSync(tokenPath)){
        console.log(`Token Already exists at ${tokenPath}\nno need to login`)
        return
    }

    // logging in with puppeteer and saving the token in home dir
    try {
        console.log("logging in please wait")
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url, {waitUntil: 'networkidle0'})
        await page.type('#email', username)
        await page.type('#password', password)
        await page.keyboard.press('Enter')
        await page.waitForNavigation()
        apiTokens = await page.evaluate(() => JSON.stringify(window.Laravel))
        await browser.close()
    } catch (err) {
        console.log(err,"Failed to login, check username or password")
        return
    }
    if (apiTokens){
        apiTokens = JSON.parse(apiTokens)
        apiTokens = apiTokens.apiToken
        await fs.writeFileSync(os.homedir+"/.htb_token",apiTokens)
        console.log(`Login successful.\nToken is saved in ${tokenPath}`)
    } else {
        console.log("Failed to login, check username or password")
        return    
    }
}

const help = () => {
    console.log("Enter username and password\n--login <username> <password>")
}

module.exports = {
    login,
    help
}
