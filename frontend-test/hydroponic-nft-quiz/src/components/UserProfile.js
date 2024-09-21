import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getUserProfile(userId);
      setProfile(userProfile);
    };
    fetchProfile();
  }, [userId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <img src={profile.imageUrl} alt={profile.name} className="profile-image" />
      <h2>{profile.name}</h2>
      <div className="user-info">
        <p><strong>Region:</strong> {profile.region}</p>
        <p><strong>Lesson Level:</strong> {profile.lessonLevel}</p>
      </div>
      <div className="nft-gallery">
        <h3>NFT Gallery</h3>
        {profile.nfts.map(nft => (
          <img key={nft.id} src={nft.imageUrl} alt={nft.name} className="nft-image" />
        ))}
      </div>
      <div className="digital-wallet">
        <h3>Digital Wallet</h3>
        <p>Balance: {profile.walletBalance} FLOW</p>
      </div>
      <div className="lessons-learned">
        <h3>Lessons Learned</h3>
        <ul>
          {profile.lessonsLearned.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
        </ul>
      </div>
      <div className="value-created">
        <h3>Value Created</h3>
        <p>{profile.valueCreated}</p>
      </div>
      <div className="systems-designed">
        <h3>Systems Designed</h3>
        <p>{profile.systemsDesigned}</p>
      </div>
    </div>
  );
};

export default UserProfile;