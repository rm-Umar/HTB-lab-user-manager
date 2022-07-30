const fs = require('fs')
const os = require('os')
const axios = require('axios');

const tokenPath = `${os.homedir}/.htb_token`

const addUsers = async (labUrl, usersList) => {
    const labId = labUrl.split("/admin/")[1]
    try{
        const token = await fs.readFileSync(tokenPath)
        const users = await fs.readFileSync(usersList).toString().trim().split('\n')
        users.forEach((user)=> {
            addUser(user,labId,token)
        })
    } catch (err) {
        console.log("Something went wrong!",err)
    }

}

const addUser = async (username,labId,token) => {
    const url = `https://www.hackthebox.com/api/labs/admin/give/access/${username}/${labId}/?api_token=${token}`
    try{
        await axios.post(url)
        console.log(`User ${username} added successfully`)
    }catch (err) {
        console.log(`Error adding the user ${username}`)
    }
}

const help = () => {
    console.log("Enter the url of lab and path to usersfile\n--add https://www.hackthebox.com/home/labs/admin/260 ~/users.txt")
}

module.exports = {
    addUsers,
    help
} 

