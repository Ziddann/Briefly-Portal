<!-- resources/views/user/index.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar User</title>
</head>
<body>
    <h1>Daftar User</h1>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @elseif(session('error'))
        <p style="color: red;">{{ session('error') }}</p>
    @endif

    <ul>
        @foreach($users as $user)
            <li>
                {{ $user->name }} - {{ $user->email }}
                <a href="{{ url('/user/' . $user->id) }}">Detail</a>
                <a href="{{ url('/user/' . $user->id . '/edit') }}">Edit</a>
                <form action="{{ url('/user/' . $user->id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Hapus</button>
                </form>
            </li>
        @endforeach
    </ul>

    <a href="{{ url('/user/create') }}">Tambah User Baru</a>
</body>
</html>
