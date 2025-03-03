import { render, screen } from '@testing-library/react'
import ServiceDetails from '@/components/features/ServiceDetails'
import { mockService } from '@/utils/supabase/__tests__/testdata'

describe('ServiceDetails', () => {
  const testService = mockService()
  
  it('renders service title and description', () => {
    render(<ServiceDetails service={testService} />)
    
    expect(screen.getByText(testService.title)).toBeInTheDocument()
    expect(screen.getByText(testService.description)).toBeInTheDocument()
  })

  it('displays pricing information', () => {
    render(<ServiceDetails service={testService} />)
    
    expect(screen.getByText(`$${testService.base_price}`)).toBeInTheDocument()
    expect(screen.getByText(testService.category)).toBeInTheDocument()
  })

  it('shows availability status', () => {
    render(<ServiceDetails service={testService} />)
    
    expect(screen.getByText(testService.availability)).toBeInTheDocument()
  })
})
