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

// 🔥 __dirname nikalne ke liye
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

// 1. GET all reviews
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

// 2. POST a new review
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

// 3. POST an enquiry
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
// 🔥 STATIC FILES SERVE (ORDER MATTERS!)
// ==========================================

// 1. Serve images/assets from the public folder
//    This makes /assets/birth1.jpg resolve to public/assets/birth1.jpg
app.use(express.static(path.join(__dirname, 'public')));

// 2. Serve the built frontend (index.html, JS, CSS)
app.use(express.static(path.join(__dirname, 'dist')));

// 3. SPA fallback — MUST be last
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Serving public from: ${path.join(__dirname, 'public')}`);
    console.log(`📁 Serving dist from:   ${path.join(__dirname, 'dist')}`);
});
