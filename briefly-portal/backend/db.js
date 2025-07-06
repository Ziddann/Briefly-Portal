const mysql = require('mysql2');

// Membuat koneksi pool ke MySQL
const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12788577',  // Ganti dengan username MySQL Anda
  password: '9WZlaBifeA',  // Ganti dengan password MySQL Anda
  database: 'sql12788577', // Ganti dengan nama database Anda
  waitForConnections: true, // Menunggu koneksi yang tersedia jika jumlah koneksi melebihi limit
  connectionLimit: 10, // Maksimal jumlah koneksi yang dibuka
  queueLimit: 0 // Tidak membatasi antrean koneksi
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting connection from pool:', err);
  } else {
    console.log('Connection successful');
    connection.release(); // Jangan lupa untuk melepaskan koneksi jika sudah selesai digunakan
  }
});


// Menjalankan query menggunakan pool
module.exports = pool.promise(); // Menggunakan promise untuk query asynchronous
