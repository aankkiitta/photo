import React from 'react';
import { storiesData } from '../data/stories-data'; 
import StoryCard from '../components/StoryCard'; 
import './Stories.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const Stories = () => {
  return (
    <div className="stories-page">
      
      {/* Header Section */}
      <div className="stories-header">
        <img src={pattern} alt="pattern" className="header-pattern" />
        <h1 className="stories-title">STORIES</h1>
        <p className="stories-subtitle">Delve deeper into our world of story-telling!</p>
      </div>

      {/* Grid Section */}
      <div className="stories-grid">
        {storiesData.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>

    </div>
  );
};

export default Stories;