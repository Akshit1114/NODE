const crypto = require('crypto')

crypto.pbkdf2("password", "salt", 500000, 50, 'sha512', (err,key) => {
    console.log("1 - crypto key done")
} )
crypto.pbkdf2("password", "salt", 500000, 50, 'sha512', (err,key) => {
    console.log("2 - crypto key done")
} )
// both happened at some time -> as libuv assigned thread to each of them but we know at default place its 4 , so 4 operation like this can run at same, but at 5 u will see a clear time taken
crypto.pbkdf2("password", "salt", 500000, 50, 'sha512', (err,key) => {
    console.log("3 - crypto key done")
} )
crypto.pbkdf2("password", "salt", 500000, 50, 'sha512', (err,key) => {
    console.log("4 - crypto key done")
} )

//------------
crypto.pbkdf2("password", "salt", 500000, 50, 'sha512', (err,key) => {
    console.log("5 - crypto key done")
} )

