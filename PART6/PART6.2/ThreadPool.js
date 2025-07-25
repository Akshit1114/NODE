
const crypto = require('crypto')

// extending the default thread pool size
// run this command in terminal $env:UV_THREADPOOL_SIZE=5; node ThreadPool.js  [$env:UV_THREADPOOL_SIZE= WRITE_THE_NUMBER_AS_U_WISH; node YOUR_FILENAME.js]



crypto.pbkdf2("password", "salt", 5000000, 50, 'sha512', (err,key) => {
    console.log("1 - crypto key done")
} )
crypto.pbkdf2("password", "salt", 5000000, 50, 'sha512', (err,key) => {
    console.log("2 - crypto key done")
} )
crypto.pbkdf2("password", "salt", 5000000, 50, 'sha512', (err,key) => {
    console.log("3 - crypto key done")
} )
crypto.pbkdf2("password", "salt", 5000000, 50, 'sha512', (err,key) => {
    console.log("4 - crypto key done")
} )

//------------
crypto.pbkdf2("password", "salt", 5000000, 50, 'sha512', (err,key) => {
    console.log("5 - crypto key done")
} )

