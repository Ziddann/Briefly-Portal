<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BeritaController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    return 'This is a test route!';
});

// User Routes
Route::get('/user', [UserController::class, 'index']);  // Menampilkan daftar user
Route::get('/user/create', [UserController::class, 'create']);  // Menampilkan form tambah user
Route::post('/user', [UserController::class, 'store']);  // Menyimpan user baru
Route::get('/user/{id}/edit', [UserController::class, 'edit']);  // Menampilkan form edit user
Route::put('/user/{id}', [UserController::class, 'update']);  // Mengupdate user
Route::delete('/user/{id}', [UserController::class, 'destroy']);

// Berita Routes
Route::get('/berita', [BeritaController::class, 'index']); // Menampilkan semua berita
Route::get('/berita/{id}', [BeritaController::class, 'show']); // Menampilkan berita berdasarkan ID
Route::post('/berita', [BeritaController::class, 'store']); // Menambah berita baru
Route::put('/berita/{id}', [BeritaController::class, 'update']); // Mengupdate berita
Route::delete('/berita/{id}', [BeritaController::class, 'destroy']); // Menghapus berita
