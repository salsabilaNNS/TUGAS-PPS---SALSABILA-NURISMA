const express = require('express');
const router = express.Router();
const db = require('./db'); // Mengimpor konfigurasi koneksi

let loginAttempts = {};

// Endpoint registrasi
router.post('/register', (req, res) => {
    const { nama, nohp, alamat, email, username, password, konfirmasiPassword  } = req.body;

     // Validasi apakah semua field telah diisi
     if (!nama || !nohp || !alamat || !email || !username || !password || !konfirmasiPassword) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Query untuk memeriksa apakah email atau username sudah ada
    const checkQuery = 'SELECT * FROM customer WHERE email = ? OR username = ?';
    db.query(checkQuery, [email, username], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email atau username sudah terdaftar' });
        }

        // Validasi panjang password sebelum menyimpan ke database
            if (password.length < 8) {
            return res.status(400).json({ message: 'Password harus minimal 8 karakter' });
        }

        // Validasi apakah password dan konfirmasi password cocok
          if (password !== konfirmasiPassword) {
          return res.status(400).json({ message: 'Konfirmasi password tidak cocok' });
        }

            // Query untuk menambahkan customer baru
        const insertQuery = 'INSERT INTO customer (nama, nohp, alamat, email, username, password) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [nama, nohp, alamat, email, username, password], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ 
                message: 'Akun customer berhasil terdaftar, sekarang Anda bisa login', 
                });
            });
        });
    });

// Endpoint login menggunakan metode GET dengan username dan password di path parameter
router.get('/login/:username/:password', (req, res) => {
    const { username, password } = req.params; // Mengambil username dan password dari path parameter

// Query untuk mengambil data customer berdasarkan username
    const query = 'SELECT * FROM customer WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        // Cek apakah pengguna ditemukan dan password cocok
        if (results.length > 0 && results[0].password === password) {
            loginAttempts[username] = 0; // Reset percobaan login
            return res.json({ message: "Login berhasil", access: "dashboard" });
        } else {
            // Jika login gagal
            return res.status(401).json({ message: "Username atau password salah" });
        }
    });
});

// Endpoint logout customer
router.get('/logout/:username', (req, res) => {
    const { username } = req.params;

    // Cek apakah pengguna sudah login sebelumnya
    if (loginAttempts[username] !== undefined) {
        delete loginAttempts[username]; // Menghapus data login pengguna
        return res.json({ message: 'Logout berhasil' });
    } else {
        return res.status(400).json({ message: 'Pengguna belum login' });
    }
});

module.exports =router;