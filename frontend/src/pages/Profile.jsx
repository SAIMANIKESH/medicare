import { user } from '../lib/constants';

export default function Profile() {
  const { name, email, joined, profileImage } = user;

  return (
    <div className="profile-card">
      <h2>My Profile</h2>

      <div className='card'>
        <img src={profileImage} alt='profile pic' />

        <div className='flex-1 space-y-4'>
          <div>
            <h3>Name</h3>
            <p>{name}</p>
          </div>

          <div>
            <h3>Email</h3>
            <p>{email}</p>
          </div>

          <div>
            <h3>Joined On</h3>
            <p>{new Date(joined).toDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};