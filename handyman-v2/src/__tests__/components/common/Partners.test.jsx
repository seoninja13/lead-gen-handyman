import React from 'react';
import { render, screen } from '@testing-library/react';
import Partners from '../../../components/common/Partners';

describe('Partners Component', () => {
  beforeEach(() => {
    // Reset any runtime handlers
    jest.clearAllMocks();
  });

  it('renders the partners section', () => {
    render(<Partners />);
    
    // Check if the section is rendered
    const partnersSection = screen.getByTestId('partners-section');
    expect(partnersSection).toBeInTheDocument();
  });

  it('renders the correct number of partner logos', () => {
    render(<Partners />);
    
    // Check if all partner logos are rendered
    const partnerLogos = screen.getAllByRole('img');
    expect(partnerLogos.length).toBeGreaterThanOrEqual(5); // We expect at least 5 partner logos
  });

  it('renders partner logos with correct attributes', () => {
    render(<Partners />);
    
    // Check if the partner logos have the correct alt text
    const partnerLogos = screen.getAllByAltText(/partner/i);
    expect(partnerLogos.length).toBeGreaterThanOrEqual(5);
    
    // Check if the first partner logo has the correct src attribute
    expect(partnerLogos[0]).toHaveAttribute('src');
    expect(partnerLogos[0].getAttribute('src')).toContain('partner');
  });

  it('has the correct CSS classes for styling', () => {
    render(<Partners />);
    
    // Check if the section has the correct CSS class
    const partnersSection = screen.getByTestId('partners-section');
    expect(partnersSection).toHaveClass('our-partners');
    
    // Check if the container has the correct CSS class
    const container = screen.getByTestId('partners-container');
    expect(container).toHaveClass('container');
  });

  it('has the correct structure with row and columns', () => {
    render(<Partners />);
    
    // Check if the row element exists
    const row = screen.getByTestId('partners-row');
    expect(row).toBeInTheDocument();
    expect(row).toHaveClass('row');
    
    // Check if the column elements exist
    const columns = screen.getAllByTestId(/partner-column/);
    expect(columns.length).toBeGreaterThanOrEqual(5);
  });
});
