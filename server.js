
const express = require('express')
const path = require('path')
const fs = require('fs')
const notes = require(path.join(__dirname, 'Develop/db/db.json'))
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
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json')))
    const newNote = req.body
    newNote.id = notes.length.toString()
    notes.push(newNote)
    fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(notes))
    res.json(notes)
});

//delete
app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json')))
    const deleteNote = req.params.id
    notes.splice(deleteNote, 1)
    fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(notes))
    res.json(notes)
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
