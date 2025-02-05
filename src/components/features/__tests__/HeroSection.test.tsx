import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

describe('HeroSection Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders correctly', () => {
    render(<HeroSection onSearch={mockOnSearch} />);

    // Check for main heading
    expect(screen.getByText('Find Trusted Handyman Services')).toBeInTheDocument();
    
    // Check for subheading
    expect(screen.getByText(/Professional handyman services/)).toBeInTheDocument();
    
    // Check for search input
    expect(screen.getByPlaceholderText('Search for services...')).toBeInTheDocument();
    
    // Check for search button
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    
    // Check for popular services
    expect(screen.getByText('Popular Services:')).toBeInTheDocument();
    ['Plumbing', 'Electrical', 'Carpentry', 'Painting'].forEach(service => {
      expect(screen.getByRole('button', { name: service })).toBeInTheDocument();
    });
  });

  it('handles search submission', () => {
    render(<HeroSection onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for services...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    // Type in search input
    fireEvent.change(input, { target: { value: 'plumbing repair' } });
    
    // Click search button
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('plumbing repair');
  });

  it('handles popular service clicks', () => {
    render(<HeroSection onSearch={mockOnSearch} />);
    
    // Click a popular service button
    const plumbingButton = screen.getByRole('button', { name: 'Plumbing' });
    fireEvent.click(plumbingButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Plumbing');
  });

  it('handles form submission with enter key', () => {
    render(<HeroSection onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for services...');
    
    // Type in search input and press enter
    fireEvent.change(input, { target: { value: 'electrical work' } });
    fireEvent.submit(input.closest('form')!);
    
    expect(mockOnSearch).toHaveBeenCalledWith('electrical work');
  });

  it('applies custom className', () => {
    const customClass = 'custom-hero-section';
    render(<HeroSection onSearch={mockOnSearch} className={customClass} />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass(customClass);
  });
});
