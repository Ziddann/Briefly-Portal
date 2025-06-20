<!-- resources/views/user/edit.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User</title>
</head>
<body>
    <h1>Edit User</h1>

    <form action="{{ url('/user/' . $user->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="name">Nama:</label>
        <input type="text" name="name" id="name" value="{{ $user->name }}" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" value="{{ $user->email }}" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="Kosongkan jika tidak ingin diubah">
        <br>
        <button type="submit">Simpan</button>
    </form>

    <a href="{{ url('/user') }}">Kembali ke Daftar User</a>
</body>
</html>
