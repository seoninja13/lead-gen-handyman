import React from 'react';
import { render, screen } from '@testing-library/react';
import { ServiceList } from '../ServiceList';
import { ServiceProvider } from '@/providers/service.provider';
import { config } from '@/config/services';

// Mock the service provider hooks
jest.mock('@/providers/service.provider', () => ({
  ...jest.requireActual('@/providers/service.provider'),
  useRepository: () => ({
    services: mockServices,
    loading: false,
    error: null,
    fetchServices: jest.fn(),
  }),
}));

const mockServices = [
  {
    id: 1,
    name: 'Plumbing Service',
    description: 'Professional plumbing services',
    price_range_min: 50,
  },
  {
    id: 2,
    name: 'Electrical Service',
    description: 'Expert electrical work',
    price_range_min: 75,
  },
];

describe('ServiceList Component', () => {
  it('renders services correctly', () => {
    render(
      <ServiceProvider config={config}>
        <ServiceList />
      </ServiceProvider>
    );

    // Check if services are rendered
    expect(screen.getByText('Plumbing Service')).toBeInTheDocument();
    expect(screen.getByText('Professional plumbing services')).toBeInTheDocument();
    expect(screen.getByText('Starting at $50')).toBeInTheDocument();

    expect(screen.getByText('Electrical Service')).toBeInTheDocument();
    expect(screen.getByText('Expert electrical work')).toBeInTheDocument();
    expect(screen.getByText('Starting at $75')).toBeInTheDocument();
  });

  it('hides prices when showPrice is false', () => {
    render(
      <ServiceProvider config={config}>
        <ServiceList showPrice={false} />
      </ServiceProvider>
    );

    expect(screen.queryByText('Starting at $50')).not.toBeInTheDocument();
    expect(screen.queryByText('Starting at $75')).not.toBeInTheDocument();
  });

  it('shows loading state', () => {
    jest.spyOn(require('@/providers/service.provider'), 'useRepository')
      .mockImplementation(() => ({
        services: [],
        loading: true,
        error: null,
        fetchServices: jest.fn(),
      }));

    render(
      <ServiceProvider config={config}>
        <ServiceList />
      </ServiceProvider>
    );

    expect(screen.getByText('Loading services...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Failed to load services';
    jest.spyOn(require('@/providers/service.provider'), 'useRepository')
      .mockImplementation(() => ({
        services: [],
        loading: false,
        error: new Error(errorMessage),
        fetchServices: jest.fn(),
      }));

    render(
      <ServiceProvider config={config}>
        <ServiceList />
      </ServiceProvider>
    );

    expect(screen.getByText(`Error loading services: ${errorMessage}`)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    jest.spyOn(require('@/providers/service.provider'), 'useRepository')
      .mockImplementation(() => ({
        services: [],
        loading: false,
        error: null,
        fetchServices: jest.fn(),
      }));

    render(
      <ServiceProvider config={config}>
        <ServiceList />
      </ServiceProvider>
    );

    expect(screen.getByText('No services found.')).toBeInTheDocument();
  });
});
