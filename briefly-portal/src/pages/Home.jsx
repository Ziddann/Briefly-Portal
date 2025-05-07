import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";


function Home() {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', padding: '1rem' }}>
        <Sidebar />
        <div style={{ flex: 1, paddingLeft: '1rem' }}>
          <NewsCard
            title="Judul Berita 1"
            description="Ini adalah deskripsi singkat untuk berita pertama."
            imageUrl="https://via.placeholder.com/600x300"
          />
          <NewsCard
            title="Judul Berita 2"
            description="Ini adalah deskripsi singkat untuk berita kedua."
            imageUrl="https://via.placeholder.com/600x300"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
