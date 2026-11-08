import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Paths setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// DATABASE CONNECTION
// ==========================================
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fusiondb',
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Database connected successfully!");
        connection.release();
    }
});

// ==========================================
// ROUTES (API Endpoints)
// ==========================================

app.get('/api/reviews', (req, res) => {
    const query = "SELECT * FROM reviews ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch reviews" });
        }
        res.json(results);
    });
});

app.post('/api/reviews', (req, res) => {
    const { name, reviewText, rating } = req.body;
    if (!name || !reviewText || !rating) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const query = "INSERT INTO reviews (name, review_text, rating) VALUES (?, ?, ?)";
    db.query(query, [name, reviewText, rating], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to submit review" });
        }
        res.status(201).json({ message: "Review submitted successfully!", id: result.insertId });
    });
});

app.post('/api/enquiry', (req, res) => {
    const { name, eventDetails, weddingDates, contactNumber, email } = req.body;
    if (!name || !eventDetails || !weddingDates || !contactNumber || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const query = "INSERT INTO enquiry (name, eventDetails, weddingDates, contactNumber, email) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, eventDetails, weddingDates, contactNumber, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to submit enquiry" });
        }
        res.status(201).json({ message: "Enquiry submitted successfully!" });
    });
});

// ==========================================
// 🔥 STATIC FILES SERVE
// ==========================================

// 1. Serve the public folder (Hostinger usually runs node from inside the build folder, 
// so we check both current dir and one level up just to be safe).
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// 2. Serve the built frontend
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '..', 'dist')));

// 3. SPA fallback — MUST BE LAST
app.use((req, res) => {
    if (req.url.match(/\.(jpg|jpeg|png|webp|avif|svg|css|js|ico)$/i)) {
        return res.status(404).send('File not found');
    }
    
    // Try to find index.html in current or parent directory
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    const fallbackIndexPath = path.join(__dirname, '..', 'dist', 'index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.sendFile(fallbackIndexPath);
        }
    });
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
