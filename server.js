// DEPENDENCIES
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const express = require('express')
const db = require(path.join(__dirname, 'Develop/db/db.json'))

const PORT = process.env.PORT || 3001
const app = express()

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'))

// HTTP ROUTING
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/db/db.json'))
});

// Add route for notes.html
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = crypto.randomBytes(16).toString('hex')
    db.push(newNote)
    fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(db))
    res.json(newNote)
});

//delete
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const index = db.findIndex(note => note.id === id)
    db.splice(index, 1)
    fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(db))
    res.json(db)
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
