import React, { useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'; 
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false); 
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setLoading(true);
    setError('');
    setShowToast(false); 

    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
      }, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.data));
      setShowToast(true); 

      setTimeout(() => {
        setShowToast(false);
      }, 3000); 
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex justify-center my-10'>
        <div className='flex justify-center mx-10'>
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              {error && <p className="text-red-500">{error}</p>}
              {showToast && ( 
                <div className="toast my-16">
                  <div className="alert alert-success">
                    <span>Profile saved successfully</span>
                  </div>
                </div>
              )}
              <div>
                {[
                  { label: 'First Name', value: firstName, setter: setFirstName },
                  { label: 'Last Name', value: lastName, setter: setLastName },
                  { label: 'Age', value: age, setter: setAge },
                  { label: 'About', value: about, setter: setAbout },
                  { label: 'Photo Url', value: photoUrl, setter: setPhotoUrl },
                ].map(({ label, value, setter }) => (
                  <label className="form-control w-full max-w-xs my-2" key={label}>
                    <div className="label">
                      <span className="label-text">{label}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                ))}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="card-actions justify-center">
                <button
                  className={`btn btn-primary ${loading ? 'loading' : ''}`}
                  onClick={saveProfile}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>
    </>
  );
};

export default EditProfile;
