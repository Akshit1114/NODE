const adminAuth = (req, res, next) => {
    // logic of checking whether the request is from / or not (writing simple logic or hardcoded)
    const token = "xyz"
    const isAdmin = token === "xyz"
    if (!isAdmin) {
        res.status(401).send("unauthorized")
    }
    else{
        // so for every /admin request above code executes and then move on
        next()
    }
} 

const userAuth = (req, res, next) => {
    // logic of checking whether the request is from  loggedin user  or not (writing simple logic or hardcoded) 
    const token = "xyz"
    const isUser = token === "xyz"
    if (!isUser) {
        res.status(401).send("unauthorized")
    }
    else{
        // so for every /user request above code executes and then move on
        next()
    }
} 

module.exports = {adminAuth, userAuth}