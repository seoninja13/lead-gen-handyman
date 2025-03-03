'use client'

import { useState } from 'react'

interface ServiceImageProps {
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
  className?: string
}

export default function ServiceImage({ src, alt, title, width = 800, height = 600, className }: ServiceImageProps) {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  // Use the path as-is since it's relative to the public directory
  const imageUrl = src;

  // If it's an SVG, add specific styling
  const isSvg = imageUrl.endsWith('.svg')
  const imgClassName = `${className || 'w-24 h-24'} ${isSvg ? 'bg-gray-100 p-4' : 'object-cover rounded'}`

  // If there's an error loading the image, use a placeholder
  if (isError) {
    return (
      <div 
        className={`bg-gray-200 rounded flex items-center justify-center ${className || 'w-24 h-24'}`}
        title={title || alt}
      >
        <svg 
          className={`${className ? 'w-1/3 h-1/3' : 'w-12 h-12'} text-gray-400`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    )
  }

  console.log("imageUrl:", imageUrl);
  return (
    <img 
      src={imageUrl}
      alt={alt}
      title={title}
      width={width}
      height={height}
      className={imgClassName}
      onError={() => setIsError(true)}
      onLoad={() => setIsLoading(false)}
    />
  )
}
