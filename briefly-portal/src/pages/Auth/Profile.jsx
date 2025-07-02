import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';  // Mengimpor Navbar
import Sidebar from '../../components/Sidebar';  // Mengimpor Sidebar
import Footer from '../../components/Footer';  // Mengimpor Footer
import '../../styles/Profile.css';  // Styling Profile

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    about: '',
    profileImage: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState('');

  useEffect(() => {
    // Ambil data pengguna dari backend berdasarkan ID pengguna yang login
    const userId = localStorage.getItem('userId');
    axios
      .get(`http://localhost:5000/api/user/profile/${userId}`)
      .then(response => {
        setUserData(response.data);
        setProfileImagePreview(response.data.profileImage); // Menampilkan preview gambar profil
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data", error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prevData) => ({ ...prevData, profileImage: file }));
      setProfileImagePreview(URL.createObjectURL(file)); // Menampilkan preview foto yang di-upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData untuk mengirim file gambar
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('about', userData.about);
    formData.append('profileImage', userData.profileImage); // Menambahkan file gambar profil

    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.put(`http://localhost:5000/api/user/profile:id`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setIsUpdated(true);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar /> {/* Menambahkan Navbar */}
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-header">
              {/* Menampilkan foto profil */}
              <img
                src={profileImagePreview}
                alt="Profile"
                className="profile-avatar"
              />
            </div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="profileImage">Profile Picture</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {profileImagePreview && (
                  <img
                    src={profileImagePreview}
                    alt="Profile Preview"
                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }}
                  />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  value={userData.about}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="profile-submit-button">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer /> {/* Menambahkan Footer */}
    </>
  );
}

export default Profile;
