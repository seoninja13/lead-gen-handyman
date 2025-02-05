import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ServiceList } from '../ServiceList';
import { useServiceRepository } from '@/providers/service.provider';
import { Service } from '@/interfaces/domain';

// Mock the service provider hook
jest.mock('@/providers/service.provider', () => ({
  useServiceRepository: jest.fn(),
}));

// Mock service data
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Plumbing',
    description: 'Professional plumbing services',
    slug: 'plumbing',
    price_range: '$100-$200',
    duration: '1-2 hours',
    tags: ['repairs', 'installation'],
  },
  {
    id: '2',
    name: 'Electrical',
    description: 'Expert electrical services',
    slug: 'electrical',
    price_range: '$150-$300',
    duration: '2-4 hours',
    tags: ['wiring', 'installation'],
  },
];

describe('ServiceList Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue({ success: true, data: [] }),
      findByCategory: jest.fn().mockResolvedValue({ success: true, data: [] }),
    };

    (useServiceRepository as jest.Mock).mockReturnValue(mockRepository);

    render(<ServiceList />);

    // Wait for loading state
    await waitFor(
      () => {
        const skeletons = screen.getAllByRole('generic').filter(
          (element: HTMLElement) => element.className.includes('animate-pulse')
        );
        expect(skeletons.length).toBeGreaterThan(0);
      },
      { timeout: 1000 }
    );
  });

  it('renders services successfully', async () => {
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue({ success: true, data: mockServices }),
      findByCategory: jest.fn().mockResolvedValue({ success: true, data: mockServices }),
    };

    (useServiceRepository as jest.Mock).mockReturnValue(mockRepository);

    render(<ServiceList />);

    // Wait for services to load
    await waitFor(
      () => {
        expect(screen.getByText('Plumbing')).toBeInTheDocument();
        expect(screen.getByText('Electrical')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check for service details
    // Check for service details
    const plumbingDesc = screen.getByText('Professional plumbing services');
    const electricalDesc = screen.getByText('Expert electrical services');
    expect(plumbingDesc).toBeInTheDocument();
    expect(electricalDesc).toBeInTheDocument();

    // Check for price ranges
    const plumbingPrice = screen.getByText('Price: $100-$200');
    const electricalPrice = screen.getByText('Price: $150-$300');
    expect(plumbingPrice).toBeInTheDocument();
    expect(electricalPrice).toBeInTheDocument();

    // Check for tags
    const repairsTag = screen.getByText('repairs');
    const wiringTag = screen.getByText('wiring');
    expect(repairsTag).toBeInTheDocument();
    expect(wiringTag).toBeInTheDocument();
  });

  it('handles category filter correctly', async () => {
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue({ success: true, data: mockServices }),
      findByCategory: jest.fn().mockResolvedValue({
        success: true,
        data: [mockServices[0]],
      }),
    };

    (useServiceRepository as jest.Mock).mockReturnValue(mockRepository);

    render(<ServiceList category="Plumbing" />);

    // Wait for services to load
    await waitFor(
      () => {
        expect(mockRepository.findByCategory).toHaveBeenCalledWith('Plumbing');
        expect(screen.getByText('Plumbing')).toBeInTheDocument();
        expect(screen.queryByText('Electrical')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('handles empty results correctly', async () => {
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue({ success: true, data: [] }),
      findByCategory: jest.fn().mockResolvedValue({ success: true, data: [] }),
    };

    (useServiceRepository as jest.Mock).mockReturnValue(mockRepository);

    render(<ServiceList />);

    // Wait for no results message
    await waitFor(
      () => {
        expect(screen.getByText('No services found.')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('handles error state correctly', async () => {
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue({
        success: false,
        error: new Error('Failed to fetch services'),
      }),
      findByCategory: jest.fn().mockResolvedValue({
        success: false,
        error: new Error('Failed to fetch services'),
      }),
    };

    (useServiceRepository as jest.Mock).mockReturnValue(mockRepository);

    render(<ServiceList />);

    // Wait for error message
    await waitFor(
      () => {
        expect(screen.getByText('Error Loading Services')).toBeInTheDocument();
        expect(screen.getByText('Failed to fetch services')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('respects the limit prop', async () => {
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue({ success: true, data: mockServices }),
      findByCategory: jest.fn().mockResolvedValue({ success: true, data: mockServices }),
    };

    (useServiceRepository as jest.Mock).mockReturnValue(mockRepository);

    render(<ServiceList limit={1} />);

    // Wait for services to load
    await waitFor(
      () => {
        expect(screen.getByText('Plumbing')).toBeInTheDocument();
        expect(screen.queryByText('Electrical')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('toggles price display based on showPrice prop', async () => {
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue({ success: true, data: mockServices }),
      findByCategory: jest.fn().mockResolvedValue({ success: true, data: mockServices }),
    };

    (useServiceRepository as jest.Mock).mockReturnValue(mockRepository);

    const { rerender } = render(<ServiceList showPrice={false} />);

    // Wait for services to load and verify prices are hidden
    await waitFor(
      () => {
        expect(screen.queryByText('Price: $100-$200')).not.toBeInTheDocument();
        expect(screen.queryByText('Price: $150-$300')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Rerender with showPrice true
    rerender(<ServiceList showPrice={true} />);

    // Verify prices are now visible
    await waitFor(
      () => {
        expect(screen.getByText('Price: $100-$200')).toBeInTheDocument();
        expect(screen.getByText('Price: $150-$300')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
