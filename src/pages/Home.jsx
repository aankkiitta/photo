import React from 'react';
import Hero from '../components/Hero';
import StorySection from '../components/StorySection';
import HomeStories from '../components/HomeStories';
import HomePhotobooks from '../components/HomePhotobooks';
import HomeImages from '../components/HomeImages';
import HomePreWedding from '../components/HomePreWedding'; 
import HomeCommercials from '../components/HomeCommercials'; // 🔥 Add kiya
import WhatWeDo from '../components/WhatWeDo';
import WhatWeDoAbout from '../components/WhatWeDoAbout';
import Reviews from '../components/Reviews'; // 🔥 'Review' nahi, 'Reviews'

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <StorySection />
      <HomeStories />
      <HomePhotobooks />
      <HomeImages />
      <HomePreWedding />
      <HomeCommercials />
      <Reviews />
      <WhatWeDo />
      <WhatWeDoAbout />
    </div>
  );
};

export default Home;