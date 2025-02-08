'use client';

import React from 'react';

const YouTubeVideos = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-16">
      <h2 className="text-2xl font-semibold mb-8">Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Replace with actual YouTube video embeds */}
        <div className="h-48 rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="h-48 rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/7ghhRHRP6t4"
            title="YouTube video"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="h-48 rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/CD-E-LDc9RM"
            title="YouTube video"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideos;
