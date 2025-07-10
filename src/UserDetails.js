import React, { useEffect, useState, useRef } from 'react';
import { auth, realtimeDB } from './firebase';
import { ref, set, get, child } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import userimg from './img/sample-user.png';
import userimg2 from './img/sample-user2.png';
import styles from './UserDetails.module.css';

const sampleImages = [userimg, userimg2];

function getProfileImg(user, userData, form) {
  if (form && form.photoURL) return form.photoURL;
  if (userData && userData.photoURL) return userData.photoURL;
  if (user && user.photoURL) return user.photoURL;
  return sampleImages[Math.floor(Math.random() * sampleImages.length)];
}

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: '',
    age: '',
    dob: '',
    description: '',
    photoURL: ''
  });
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const dbRef = ref(realtimeDB);
        const snapshot = await get(child(dbRef, `users/${u.uid}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
          setForm({
            name: data.name || '',
            gender: data.gender || '',
            age: data.age || '',
            dob: data.dob || '',
            description: data.description || '',
            photoURL: data.photoURL || ''
          });
        } else {
          setUserData({});
          setForm({
            name: u.displayName || '',
            gender: '',
            age: '',
            dob: '',
            description: '',
            photoURL: u.photoURL || ''
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      name: userData.name || '',
      gender: userData.gender || '',
      age: userData.age || '',
      dob: userData.dob || '',
      description: userData.description || '',
      photoURL: userData.photoURL || ''
    });
    setImgFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDobChange = (e) => {
    const dob = e.target.value;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setForm((prevForm) => ({
      ...prevForm,
      dob,
      age: age >= 0 ? age : ''
    }));
  };

  const handleImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImgFile(file);
      setForm((prev) => ({ ...prev, photoURL: URL.createObjectURL(file) }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      let photoURL = form.photoURL;

      if (imgFile) {
        const { getStorage, ref: storageRef, uploadBytes, getDownloadURL } = await import('firebase/storage');
        const storage = getStorage();
        const fileRef = storageRef(storage, `profileImages/${user.uid}`);
        await uploadBytes(fileRef, imgFile);
        photoURL = await getDownloadURL(fileRef);
      }

      const updatedData = {
        name: form.name || '',
        gender: form.gender || '',
        age: form.age || '',
        dob: form.dob || '',
        description: form.description || '',
        photoURL: photoURL || '',
        email: user.email,
        uid: user.uid
      };

      await set(ref(realtimeDB, `users/${user.uid}`), updatedData);
      setUserData(updatedData);
      setEditMode(false);
      setImgFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className={styles.udLoginMessage}>Please login to view your details.</div>;
  }

  return (
    <div className={styles.udMainContainer}>
      <div className={styles.udContentWrapper}>
        <div className={styles.udCard}>
          <h2 className={styles.udTitle}>User Details</h2>

          <div className={styles.udImageContainer}>
            <label htmlFor="profile-img-upload" style={{ cursor: editMode ? 'pointer' : 'default' }}>
              <img
                src={getProfileImg(user, userData, form)}
                alt="Profile"
                className={styles.udProfileImage}
              />
              {editMode && (
                <input
                  id="profile-img-upload"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImgChange}
                  className={styles.udFileInput}
                />
              )}
            </label>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdate} className={styles.udForm}>
              <div className={styles.udFormGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className={styles.udInput}
                  required
                />
              </div>

              <div className={styles.udFormGroup}>
                <label className={styles.udLabel}>Gender:</label>
                <div className={styles.udRadioGroup}>
                  {['Male', 'Female', 'Transgender', 'Prefer not to say'].map((option) => (
                    <label key={option} className={styles.udRadioLabel}>
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={form.gender === option}
                        onChange={handleChange}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.udFormGroup}>
                <label className={styles.udLabel}>Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleDobChange}
                  className={styles.udInput}
                />
              </div>

              <div className={styles.udFormGroup}>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={form.age}
                  readOnly
                  className={styles.udInput}
                />
              </div>

              <div className={styles.udFormGroup}>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  className={styles.udTextarea}
                />
              </div>

              <div className={styles.udButtonGroup}>
                <button type="submit" className={styles.udButton} disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </button>
                <button type="button" onClick={handleCancel} className={styles.udCancelButton} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.udDetailsContainer}>
              <div className={styles.udDetailItem}>
                <span className={styles.udDetailLabel}>Name:</span>
                <span className={styles.udDetailValue}>{userData.name || '-'}</span>
              </div>
              <div className={styles.udDetailItem}>
                <span className={styles.udDetailLabel}>Email:</span>
                <span className={styles.udDetailValue}>{user.email}</span>
              </div>
              <div className={styles.udDetailItem}>
                <span className={styles.udDetailLabel}>Gender:</span>
                <span className={styles.udDetailValue}>{userData.gender || '-'}</span>
              </div>
              <div className={styles.udDetailItem}>
                <span className={styles.udDetailLabel}>Date of Birth:</span>
                <span className={styles.udDetailValue}>{userData.dob || '-'}</span>
              </div>
              <div className={styles.udDetailItem}>
                <span className={styles.udDetailLabel}>Age:</span>
                <span className={styles.udDetailValue}>{userData.age || '-'}</span>
              </div>
              <div className={styles.udDetailItem}>
                <span className={styles.udDetailLabel}>Description:</span>
                <span className={styles.udDetailValue}>{userData.description || '-'}</span>
              </div>
              <div className={styles.udEditButtonContainer}>
                <button onClick={handleEdit} className={styles.udEditButton}>
                  Edit Profile
                </button>
              </div>
              <div className={styles.udBackToHome}>
                <button onClick={() => navigate('/')} className={styles.udBackButton}>
                  ← Back to Home
                </button>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
