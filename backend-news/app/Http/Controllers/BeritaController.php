<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;

class BeritaController
{
    // Menampilkan semua berita
    public function index()
    {
        // Mengambil semua berita dari database
        $berita = Berita::all();

        // Mengirim data berita ke view 'berita.index'
        return view('berita.index', compact('berita'));
    }

    // Menampilkan berita berdasarkan ID
    public function show($id)
    {
        // Mengambil berita berdasarkan ID
        $berita = Berita::find($id);

        // Jika berita tidak ditemukan
        if (!$berita) {
            return redirect('/berita')->with('error', 'Berita tidak ditemukan!');
        }

        // Mengirim data berita ke view 'berita.show'
        return view('berita.show', compact('berita'));
    }

    // Menambah berita baru
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
        ]);

        // Membuat berita baru
        $berita = Berita::create([
            'judul' => $request->judul,
            'konten' => $request->konten,
        ]);

        // Redirect setelah berhasil menambah berita
        return redirect('/berita')->with('success', 'Berita berhasil ditambahkan!');
    }

    // Mengupdate berita berdasarkan ID
    public function update(Request $request, $id)
    {
        // Validasi input
        $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
        ]);

        // Mengambil berita berdasarkan ID
        $berita = Berita::find($id);

        // Jika berita tidak ditemukan
        if (!$berita) {
            return redirect('/berita')->with('error', 'Berita tidak ditemukan!');
        }

        // Mengupdate berita
        $berita->update([
            'judul' => $request->judul,
            'konten' => $request->konten,
        ]);

        // Redirect setelah berhasil mengupdate berita
        return redirect("/berita/{$id}")->with('success', 'Berita berhasil diperbarui!');
    }

    // Menghapus berita berdasarkan ID
    public function destroy($id)
    {
        // Mengambil berita berdasarkan ID
        $berita = Berita::find($id);

        // Jika berita tidak ditemukan
        if (!$berita) {
            return redirect('/berita')->with('error', 'Berita tidak ditemukan!');
        }

        // Menghapus berita
        $berita->delete();

        // Redirect setelah berhasil menghapus berita
        return redirect('/berita')->with('success', 'Berita berhasil dihapus!');
    }
}
