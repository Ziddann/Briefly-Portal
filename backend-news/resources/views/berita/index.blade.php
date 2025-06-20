<!-- resources/views/berita/index.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Berita</title>
</head>
<body>
    <h1>Daftar Berita</h1>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @elseif(session('error'))
        <p style="color: red;">{{ session('error') }}</p>
    @endif

    <ul>
        <!-- Menggunakan $beritas untuk menampilkan daftar berita -->
        @foreach($berita as $berita)
            <li>
                <a href="{{ url('/berita/' . $berita->id) }}">{{ $berita->judul }}</a> 
            </li>
        @endforeach
    </ul>
    
    <h2>Tambah Berita</h2>
    <form action="{{ url('/berita') }}" method="POST">
        @csrf
        <label for="judul">Judul:</label>
        <input type="text" name="judul" id="judul" required>
        <br>
        <label for="konten">Konten:</label>
        <textarea name="konten" id="konten" required></textarea>
        <br>
        <button type="submit">Tambah Berita</button>
    </form>
</body>
</html>
