import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import axios from 'axios';

interface ProfileFormData {
  name: string;
  email: string;
  dob: string;
  presentAddress: string;
  permanentAddress: string;
  postalCode: string;
  city: string;
  country: string;
  about: string;
  username: string;
}

const EditProfile = () => {
  const email = localStorage.getItem('userEmail') || ''; 
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    dob: '',
    presentAddress: '',
    permanentAddress: '',
    postalCode: '',
    city: '',
    country: '',
    about: '',
    username: ''
  });

  // 🔁 Fetch user profile by email
  useEffect(() => {
    if (!email) return;

    axios.get(`http://localhost:5000/api/profile/by-email/${email}`)
      .then((res) => {
        const profile = res.data;
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
          presentAddress: profile.presentAddress || '',
          permanentAddress: profile.permanentAddress || '',
          postalCode: profile.postalCode || '',
          city: profile.city || '',
          country: profile.country || '',
          about: profile.about || '',
          username: profile.username || ''
        });
      })
      .catch((err) => {
        console.error('❌ Failed to fetch profile', err);
      })
      .finally(() => setLoading(false));
  }, [email]);

  // ✅ Update profile by email
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/profile/by-email/${email}`, formData)
      .then(() => {
        setMessage('✅ Profile updated successfully!');
      })
      .catch((err) => {
        console.error('❌ Update failed', err);
        setMessage('❌ Failed to update profile.');
      });
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {message && <div className="mb-4 text-blue-600">{message}</div>}

      <div className="flex items-center space-x-4 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Your Name', name: 'name' },
          { label: 'User Name', name: 'userName' },
          { label: 'Email', name: 'email', type: 'email', disabled: true },
          { label: 'Date of Birth', name: 'dob', type: 'date' },
          { label: 'Present Address', name: 'presentAddress' },
          { label: 'Permanent Address', name: 'permanentAddress' },
          { label: 'City', name: 'city' },
          { label: 'Postal Code', name: 'postalCode' },
          { label: 'Country', name: 'country' },
        ].map(({ label, name, type = 'text', disabled = false }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={(formData as any)[name]}
              onChange={(e) => setFormData((prev) => ({ ...prev, [name]: e.target.value }))}
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
