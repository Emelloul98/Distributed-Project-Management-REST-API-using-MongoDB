
/**
 * This is the main server file for the application.
 * It sets up an Express server, connects to the database, and defines the routes.
 */
const express = require('express')
require('./db/mongoose')
const projectRouts = require('./routes/projectRouts')
const memberRouts = require('./routes/memberRouts')

const app = express()
const port = 3001

app.use(express.json())
app.use(projectRouts)
app.use(memberRouts)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
