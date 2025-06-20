<!-- resources/views/user/create.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah User</title>
</head>
<body>
    <h1>Tambah User Baru</h1>

    <form action="{{ url('/user') }}" method="POST">
        @csrf
        <label for="name">Nama:</label>
        <input type="text" name="name" id="name" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>
        <br>
        <button type="submit">Simpan</button>
    </form>

    <a href="{{ url('/user') }}">Kembali ke Daftar User</a>
</body>
</html>
