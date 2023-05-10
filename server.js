const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let uploadedFilename = null;

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    uploadedFilename = req.file.filename;

    res.send({ success: true, filename: uploadedFilename });
});

app.get('/image', (req, res) => {
    if (!uploadedFilename) {
        return res.status(404).send('No image uploaded.');
    }

    res.sendFile(path.join(__dirname, 'public', 'images', uploadedFilename));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
