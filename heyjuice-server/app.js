// Import module
const express = require("express");
const cors = require("cors"); // Pastikan ini dideklarasikan sebelum digunakan
const bodyParser = require("body-parser");

// Inisialisasi aplikasi
const app = express();

// Middleware
app.use(cors()); // Middleware untuk CORS
app.use(bodyParser.json()); // Middleware untuk parsing JSON
app.use(bodyParser.urlencoded({ extended: true })); // Middleware untuk parsing URL-encoded data

// Mengimpor controller
const authAdmin = require("./authAdmin");
const authCustomer = require("./authCustomer");

// Menggunakan rute
app.use("/authAdmin", authAdmin); // Rute untuk authAdmin
app.use("/authCustomer", authCustomer); // Rute untuk authCustomer

// Menjalankan server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
