// DEPENDENCIES
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const express = require('express')
const db = require(path.join(__dirname, '/db/db.json'))

const PORT = process.env.PORT || 3001
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.static('public'))

// HTTP ROUTING
// The user is directed to the landing page.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
// The user is directed to the hiNote app
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// API ROUTING
// All notes in the database are returned to the client
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
})
// The request body is assigned an ID and pushed to the database
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = crypto.randomUUID();
    db.push(newNote);
    writeToDB(path.join(__dirname, '/db/db.json'))
    res.send(`POST successful!`);
})
// The requested ID is matched in database and removed
app.delete('/api/notes/:id', (req, res) => {
    for (i = 0; i < db.length; i++) {
        if (db[i].id === req.params.id) {
            db.splice(i, 1)
        }
    }
    writeToDB(path.join(__dirname, '/db/db.json'))
    res.send("DELETED")
})

app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}`)
)

// UTILITY
// The database is formatted, converted to string, and written to file
function writeToDB(path) {
    const dbString = JSON.stringify(db, null, 2)
    fs.writeFile(path, dbString, () => console.log('File write!'))
}