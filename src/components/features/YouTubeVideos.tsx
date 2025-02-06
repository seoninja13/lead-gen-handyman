'use client';

import React from 'react';

const YouTubeVideos = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-16">
      <h2 className="text-2xl font-semibold mb-8">Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Replace with actual YouTube video embeds */}
        <div className="h-48 bg-gray-200 rounded-lg">Video 1</div>
        <div className="h-48 bg-gray-200 rounded-lg">Video 2</div>
        <div className="h-48 bg-gray-200 rounded-lg">Video 3</div>
      </div>
    </section>
  );
};

export default YouTubeVideos;
