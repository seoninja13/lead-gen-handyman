import React from 'react';
import { render, screen } from '@testing-library/react';
import Blogs from '../../../components/common/Blogs';

// Mock the blog data
jest.mock('../../../data/blogs', () => [
  {
    id: 1,
    img: '/assets/images/blog/blog-1.jpg',
    date: '07 March, 2025',
    title: 'How to Fix a Leaky Faucet',
    description: 'Learn the step-by-step process to fix a leaky faucet in your home.',
    author: {
      name: 'Ali Tufan',
      img: '/assets/images/testimonials/1.jpg',
    },
  },
  {
    id: 2,
    img: '/assets/images/blog/blog-2.jpg',
    date: '12 March, 2025',
    title: 'Essential Tools Every Homeowner Should Have',
    description: 'Discover the must-have tools that will help you handle common household repairs.',
    author: {
      name: 'Jane Smith',
      img: '/assets/images/testimonials/2.jpg',
    },
  },
]);

describe('Blogs Component', () => {
  beforeEach(() => {
    // Reset any runtime handlers
    jest.clearAllMocks();
  });

  it('renders the blogs section with correct title', () => {
    render(<Blogs />);
    
    // Check if the section title is rendered
    expect(screen.getByText('Articles & Tips')).toBeInTheDocument();
    expect(screen.getByText('Handyman Advice from the Experts')).toBeInTheDocument();
  });

  it('renders the correct number of blog cards', () => {
    render(<Blogs />);
    
    // Check if both blog cards are rendered
    const blogCards = screen.getAllByRole('article');
    expect(blogCards).toHaveLength(2);
  });

  it('displays the correct blog titles', () => {
    render(<Blogs />);
    
    // Check if the blog titles are rendered correctly
    expect(screen.getByText('How to Fix a Leaky Faucet')).toBeInTheDocument();
    expect(screen.getByText('Essential Tools Every Homeowner Should Have')).toBeInTheDocument();
  });

  it('displays the correct blog dates', () => {
    render(<Blogs />);
    
    // Check if the blog dates are rendered correctly
    expect(screen.getByText('07 March, 2025')).toBeInTheDocument();
    expect(screen.getByText('12 March, 2025')).toBeInTheDocument();
  });

  it('displays the correct author names', () => {
    render(<Blogs />);
    
    // Check if the author names are rendered correctly
    expect(screen.getByText('Ali Tufan')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders all blog images with correct attributes', () => {
    render(<Blogs />);
    
    // Check if the blog images are rendered with correct src attributes
    const blogImages = screen.getAllByAltText(/blog/i);
    expect(blogImages[0]).toHaveAttribute('src', '/assets/images/blog/blog-1.jpg');
    expect(blogImages[1]).toHaveAttribute('src', '/assets/images/blog/blog-2.jpg');
  });

  it('renders all author images with correct attributes', () => {
    render(<Blogs />);
    
    // Check if the author images are rendered with correct src attributes
    const authorImages = screen.getAllByAltText(/author/i);
    expect(authorImages[0]).toHaveAttribute('src', '/assets/images/testimonials/1.jpg');
    expect(authorImages[1]).toHaveAttribute('src', '/assets/images/testimonials/2.jpg');
  });
});
