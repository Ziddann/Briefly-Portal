import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">Selamat datang di Portal Berita</h2>
        <p className="mt-2 text-gray-600">Berita terbaru dan terpopuler untuk Anda.</p>
      </main>
    </div>
  );
}

export default App;
EOL
