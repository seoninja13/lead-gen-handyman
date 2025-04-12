const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const directories = [
  'public/assets/images/handyman',
  'public/assets/images/service',
  'public/assets/images/cities',
  'public/assets/images/partners',
  'public/assets/images/testimonials'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create placeholder SVG for services
const services = [
  'electrical',
  'plumbing',
  'carpentry',
  'painting',
  'flooring',
  'drywall',
  'appliance',
  'hvac'
];

services.forEach((service, index) => {
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#16a085'];
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${colors[index % colors.length]}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">${service.charAt(0).toUpperCase() + service.slice(1)} Service</text>
  </svg>`;
  
  fs.writeFileSync(`public/assets/images/service/${service}.svg`, svg);
  console.log(`Created service placeholder: ${service}.svg`);
});

// Create placeholder SVG for cities
const cities = [
  'sacramento',
  'san-francisco',
  'los-angeles',
  'san-diego',
  'new-york',
  'chicago',
  'houston',
  'miami'
];

cities.forEach((city, index) => {
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#16a085'];
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${colors[index % colors.length]}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">${city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</text>
  </svg>`;
  
  fs.writeFileSync(`public/assets/images/cities/${city}.svg`, svg);
  console.log(`Created city placeholder: ${city}.svg`);
});

// Create placeholder SVG for businesses
for (let i = 1; i <= 6; i++) {
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${colors[(i-1) % colors.length]}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">Business ${i}</text>
  </svg>`;
  
  fs.writeFileSync(`public/assets/images/handyman/business${i}.svg`, svg);
  console.log(`Created business placeholder: business${i}.svg`);
  
  // Also create owner images
  const ownerSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="${colors[(i-1) % colors.length]}" stroke="white" stroke-width="2"/>
    <text x="50%" y="50%" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">Owner ${i}</text>
  </svg>`;
  
  fs.writeFileSync(`public/assets/images/handyman/owner${i}.svg`, ownerSvg);
  console.log(`Created owner placeholder: owner${i}.svg`);
}

// Create placeholder SVG for partners
for (let i = 1; i <= 5; i++) {
  const svg = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>
    <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#6c757d" text-anchor="middle">Partner ${i}</text>
  </svg>`;
  
  fs.writeFileSync(`public/assets/images/partners/partner${i}.svg`, svg);
  console.log(`Created partner placeholder: partner${i}.svg`);
}

// Create placeholder SVG for testimonials
for (let i = 1; i <= 5; i++) {
  const svg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#6c757d" stroke="white" stroke-width="2"/>
    <text x="50%" y="50%" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">User ${i}</text>
  </svg>`;
  
  fs.writeFileSync(`public/assets/images/testimonials/testimonial${i}.svg`, svg);
  console.log(`Created testimonial placeholder: testimonial${i}.svg`);
}

console.log('All placeholder images created successfully!');
