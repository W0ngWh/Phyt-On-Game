const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'Secret'; 

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'phytondb' 
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Login route with token generation
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) return res.status(500).json({ error: 'Server error' });

        if (results.length === 0 || results[0].password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Login successful', 
            token, 
            user: { id: user.id, username: user.username, email: user.email } 
        });
    });
});

// POST route for user registration
app.post('/register', (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const query = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
    db.query(query, [email, password, username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database insertion failed.' });
        }
        res.status(200).json({ message: 'Registration successful.' });
    });
});

// Route to fetch user data based on token
app.get('/api/user/data', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token is invalid' });
        }

        const userId = decoded.id;
        const query = 'SELECT username FROM users WHERE id = ?';

        db.query(query, [userId], (error, results) => {
            if (error) return res.status(500).json({ error: 'Server error' });
            if (results.length === 0) return res.status(404).json({ error: 'User not found' });

            res.status(200).json({ username: results[0].username });
        });
    });
});

// Route to fetch questions by difficulty
app.get('/api/questions', (req, res) => {
    const { difficulty } = req.query;
    console.log("Requested difficulty:", difficulty);

    if (!difficulty) {
        return res.status(400).json({ error: 'Difficulty level is required' });
    }

    const query = `
        SELECT q.id AS question_id, q.question_text, a.id AS answer_id, 
               a.answer_text, a.answer_bool
        FROM questions q
        JOIN answers a ON q.id = a.question_id
        WHERE q.difficulty = ?`;

    db.query(query, [difficulty], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No questions found for the specified difficulty' });
        }

        const questions = results.reduce((acc, row) => {
            const question = acc.find(q => q.id === row.question_id);
            if (question) {
                question.answers.push({ id: row.answer_id, text: row.answer_text, correct: row.answer_bool });
            } else {
                acc.push({
                    id: row.question_id,
                    text: row.question_text,
                    answers: [{ id: row.answer_id, text: row.answer_text, correct: row.answer_bool }]
                });
            }
            return acc;
        }, []);

        res.json(questions);
    });
});

app.post('/api/leaderboard', async (req, res) => {
    const { username, score, difficulty } = req.body; 

    try {
        const query = 'INSERT INTO leaderboard (username, score, difficulty) VALUES (?, ?, ?)';
        await db.query(query, [username, score, difficulty]);
        res.status(200).send({ message: 'Score saved successfully' });
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).send({ message: 'Failed to save score' });
    }
});

// Route to get leaderboard data (Top Scores)
app.get('/api/leaderboard', (req, res) => {
    const query = 'SELECT username, score, difficulty FROM leaderboard ORDER BY score DESC LIMIT 10';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching leaderboard:', error); 
            return res.status(500).json({ error: 'Failed to fetch leaderboard' });
        }

        if (results.length === 0) {
            console.log('No leaderboard data found.');
        } else {
            console.log('Leaderboard data fetched:', results); 
        }

        res.json(results);
    });
});

  

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
