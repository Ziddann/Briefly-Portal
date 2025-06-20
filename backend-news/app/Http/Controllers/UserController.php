<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController 
{
    // Menampilkan semua user
    public function index()
    {
        $users = User::all();  // Mengambil semua user dari database
        return view('user.index', compact('users'));
    }

    // Menampilkan form untuk menambah user
    public function create()
    {
        return view('user.create');
    }

    // Menyimpan user baru ke database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return redirect('/user')->with('success', 'User berhasil ditambahkan!');
    }

    // Menampilkan form untuk mengedit user
    public function edit($id)
    {
        $user = User::find($id);
        return view('user.edit', compact('user'));
    }

    // Mengupdate data user berdasarkan ID
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'nullable|string|min:6',  // Kosongkan jika tidak ingin mengganti password
        ]);

        $user = User::find($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);

        return redirect('/user')->with('success', 'User berhasil diperbarui!');
    }

    // Menghapus user berdasarkan ID
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return redirect('/user')->with('success', 'User berhasil dihapus!');
    }
}
