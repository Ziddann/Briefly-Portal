import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/NewsDetail.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaThumbsUp, FaRegCommentDots, FaBookmark } from 'react-icons/fa';

function NewsDetail() {
  const { id } = useParams();
  const newsData = {
    1: {
      title: 'Breaking News: Major Technology Breakthrough',
      author: 'John Smith',
      date: 'May 7, 2025',
      category: 'Technology',
      content: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse...'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    2: {
      title: 'Economic Growth Hits Record High',
      author: 'Jane Doe',
      date: 'May 8, 2025',
      category: 'Business',
      content: [
        'The economy has shown a significant surge over the last quarter...',
        'Experts believe the trend may continue into the next fiscal year...'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    101: {
      title: 'AI Revolutionizes Healthcare',
      author: 'Eliza Turing',
      date: '18 Juni 2025',
      category: 'Teknologi',
      content: [
        'Kecerdasan buatan kini digunakan dalam rumah sakit untuk mempercepat diagnosis penyakit.',
        'Ini merupakan langkah besar dalam penerapan teknologi di dunia medis.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    102: {
      title: 'Startup Indonesia Ciptakan Mobil Terbang',
      author: 'Dimas Jaya',
      date: '15 Juni 2025',
      category: 'Teknologi',
      content: [
        'Sebuah startup Indonesia menciptakan prototipe mobil terbang pertama.',
        'Uji coba dijadwalkan di Jakarta minggu depan.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    103: {
      title: 'Teknologi 6G Mulai Diuji di Korea',
      author: 'Soo-Min Park',
      date: '10 Juni 2025',
      category: 'Teknologi',
      content: [
        'Korea Selatan menjadi negara pertama yang menguji jaringan 6G.',
        'Teknologi ini diklaim 100x lebih cepat dari 5G.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    201: {
      title: 'Pemilu 2025: Debat Capres Memanas',
      author: 'Rina Kurnia',
      date: '17 Juni 2025',
      category: 'Politik',
      content: [
        'Debat capres membahas isu pendidikan dan ekonomi nasional.',
        'Antusiasme masyarakat tinggi menjelang pemilu.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    202: {
      title: 'RUU Perlindungan Data Disahkan',
      author: 'Agus Salim',
      date: '14 Juni 2025',
      category: 'Politik',
      content: [
        'RUU ini memberi hak lebih besar pada pengguna internet untuk mengontrol data mereka.',
        'Perusahaan wajib transparan dalam penggunaan data.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    203: {
      title: 'Diplomasi Indonesia ke ASEAN Meningkat',
      author: 'Bunga Mahesa',
      date: '11 Juni 2025',
      category: 'Politik',
      content: [
        'Indonesia aktif membangun hubungan kerja sama regional ASEAN.',
        'Pertemuan digelar untuk memperkuat stabilitas kawasan.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    301: {
      title: 'Indonesia Juara SEA Games 2025',
      author: 'Rendy Akbar',
      date: '16 Juni 2025',
      category: 'Olahraga',
      content: [
        'Timnas meraih medali emas setelah mengalahkan Vietnam.',
        'Kemenangan dramatis terjadi di menit terakhir pertandingan.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    302: {
      title: 'Piala Dunia: Brasil Tumbang di Semifinal',
      author: 'Carlos Henrique',
      date: '13 Juni 2025',
      category: 'Olahraga',
      content: [
        'Pertandingan berlangsung sengit hingga adu penalti.',
        'Prancis berhasil unggul dan melaju ke final.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    303: {
      title: 'Pebulu Tangkis Muda Raih Gelar Dunia',
      author: 'Rina Santoso',
      date: '9 Juni 2025',
      category: 'Olahraga',
      content: [
        'Pemain muda Indonesia menjuarai All England 2025.',
        'Prestasi ini membanggakan dunia bulu tangkis tanah air.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    401: {
      title: 'Film Lokal Tembus Box Office Asia',
      author: 'Indra Putra',
      date: '12 Juni 2025',
      category: 'Hiburan',
      content: [
        'Film bergenre drama keluarga mencetak rekor penonton.',
        'Diterima baik di berbagai negara Asia.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    402: {
      title: 'Konser BTS di Jakarta Pecahkan Rekor',
      author: 'Yuni Rizka',
      date: '10 Juni 2025',
      category: 'Hiburan',
      content: [
        'Konser BTS menarik lebih dari 70 ribu penonton di GBK.',
        'Menjadi konser terbesar di Indonesia tahun ini.'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    403: {
      title: 'Festival Musik Bali Sukses Digelar',
      author: 'Made Antara',
      date: '8 Juni 2025',
      category: 'Hiburan',
      content: [
        'Festival menghadirkan musisi dari berbagai genre.',
        'Dihadiri lebih dari 20 ribu penonton.'
      ],
      image: 'https://via.placeholder.com/600x300'
    }
  };

  const news = newsData[id] || {
    title: 'News Not Found',
    author: 'System',
    date: '',
    category: '',
    content: ['Berita tidak ditemukan.'],
    image: ''
  };

  return (
    <>
      <Navbar />
      <div className="news-detail-page">
        <main className="news-content">
          <Link to="/" className="close-button" title="Back to Home">×</Link>

          <input className="search-bar" placeholder="Search news..." />

          <div className="news-article">
            {news.image && (
              <img className="news-image" src={news.image} alt="News Visual" />
            )}
            <h2 className="news-title">{news.title}</h2>
            <p className="news-meta">
              By {news.author} • {news.date} • <span className="news-category">{news.category}</span>
            </p>

            {news.content.map((para, index) => (
              <p className="news-body" key={index}>{para}</p>
            ))}

            {/* Stylish Icons */}
            <div className="news-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="icon-button" style={{ background: '#f0f0f0', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <FaThumbsUp style={{ color: '#007bff' }} /> Like
              </button>
              <button className="icon-button" style={{ background: '#f0f0f0', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <FaRegCommentDots style={{ color: '#28a745' }} /> Comment
              </button>
              <button className="icon-button" style={{ background: '#f0f0f0', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <FaBookmark style={{ color: '#ffc107' }} /> Bookmark
              </button>
            </div>

            <section className="comments-section">
              <h3>Comments</h3>
              <div className="comment-form">
                 <img className="avatar" src="/avatar.png" alt="User" />
                 <input className="comment-input" placeholder="Add a comment..." />
                 <button className="comment-button">Post Comment</button>
              </div>
              <div className="comment">
                <img className="avatar" src="/avatar.png" alt="Jane" />
                <div className="comment-content">
                  <p className="comment-author">Jane Doe <span className="comment-time">7 hours ago</span></p>
                  <p className="comment-text">Great article! I think it's really informative and well-written.</p>
                  <div className="comment-actions">👍 24    💬 Reply</div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default NewsDetail;