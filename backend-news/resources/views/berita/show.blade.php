<!-- resources/views/berita/show.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $berita->judul }}</title>
</head>
<body>
    <h1>{{ $berita->judul }}</h1>
    <p>{{ $berita->konten }}</p>

    <a href="{{ url('/berita') }}">Kembali ke Daftar Berita</a>
    
    <h2>Update Berita</h2>
    <form action="{{ url('/berita/' . $berita->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="judul">Judul:</label>
        <input type="text" name="judul" id="judul" value="{{ $berita->judul }}" required>
        <br>
        <label for="konten">Konten:</label>
        <textarea name="konten" id="konten" required>{{ $berita->konten }}</textarea>
        <br>
        <button type="submit">Update Berita</button>
    </form>

    <form action="{{ url('/berita/' . $berita->id) }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit">Hapus Berita</button>
    </form>
</body>
</html>
