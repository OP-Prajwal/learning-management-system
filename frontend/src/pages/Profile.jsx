import { useEffect, useState } from 'react';
import api from '../api/axios.config';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/user/profile');
        setProfile(data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="space-y-4">
        <div>
          <strong>Name:</strong> {profile.name}
        </div>
        <div>
          <strong>Email:</strong> {profile.email}
        </div>
        <div>
          <strong>Role:</strong> {profile.role}
        </div>
        {profile.enrolledCourses?.courses?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mt-6 mb-4">Enrolled Courses</h3>
            <div className="grid grid-cols-1 gap-4">
              {profile.enrolledCourses.courses.map((course) => (
                <div key={course._id} className="border p-4 rounded">
                  <h4 className="font-bold">{course.title}</h4>
                  <p className="text-gray-600">{course.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
