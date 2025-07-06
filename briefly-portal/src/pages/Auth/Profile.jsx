import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/Profile.css';

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    about: '',
    profileImage: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [profileImagePreview, setProfileImagePreview] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("User ID tidak ditemukan, login ulang!");
      return;
    }

    axios.get(`http://localhost:5000/api/users/${userId}`)
      .then(response => {
        setUserData({
          name: response.data.name,
          email: response.data.email,
          about: response.data.about,
          profileImage: response.data.profileImage
        });

        const fullImagePath = response.data.profileImage 
          ? `http://localhost:5000${response.data.profileImage}`
          : '/default-avatar.png';

        setProfileImagePreview(fullImagePath);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data", error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData(prevData => ({ ...prevData, profileImage: file }));
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('about', userData.about);

    if (userData.profileImage instanceof File) {
      formData.append('profileImage', userData.profileImage);
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("User ID tidak ditemukan, login ulang!");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/user/profile/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Profile updated successfully');

      const imagePath = response.data.user.profileImage
        ? `http://localhost:5000${response.data.user.profileImage}`
        : '/default-avatar.png';

      setUserData({
        name: response.data.user.name,
        email: response.data.user.email,
        about: response.data.user.about,
        profileImage: response.data.user.profileImage
      });

      setProfileImagePreview(imagePath);

      localStorage.setItem('userName', response.data.user.name);
      if (response.data.user.profileImage) {
        localStorage.setItem('profileImage', response.data.user.profileImage);
      }

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-header">
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
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

              <button type="submit" className="profile-submit-button">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
