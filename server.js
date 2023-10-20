const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..', 'public');

const port = process.env.PORT || 3000;
const app = express();


app.use(express.static(publicPath));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/api', (req, res) => {
    res.send(path.join(publicPath, 'index.html'));
});

app.get('/api/notes', (req, res) => {
    res.send(path.join(publicPath, 'notes.html'));
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

app.post('/api/notes', (req, res) => {
    res.send('Hello World!');
});
