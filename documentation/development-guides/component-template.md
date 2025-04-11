# Component Documentation Template

Use this template when documenting React components in the project.

## Component Name

[Brief description of the component's purpose and functionality]

## File Location

```
components/path/to/ComponentName.js
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `prop1` | `string` | Yes | - | Description of prop1 |
| `prop2` | `number` | No | `0` | Description of prop2 |
| `prop3` | `boolean` | No | `false` | Description of prop3 |
| `prop4` | `() => void` | No | - | Callback function for some event |
| `prop5` | `{ key: string, value: any }` | No | `{}` | Object with specific structure |

## Usage Example

```jsx
import ComponentName from 'components/path/to/ComponentName';

function ParentComponent() {
  return (
    <ComponentName
      prop1="example"
      prop2={42}
      prop3={true}
      prop4={() => console.log('Event triggered')}
      prop5={{ key: 'example', value: 123 }}
    />
  );
}
```

## Component Structure

[Describe the internal structure of the component, including any sub-components or key elements]

```jsx
// Simplified component structure
<div className="component-wrapper">
  <header className="component-header">
    {/* Header content */}
  </header>
  <main className="component-body">
    {/* Main content */}
    {children}
  </main>
  <footer className="component-footer">
    {/* Footer content */}
  </footer>
</div>
```

## State Management

| State Variable | Initial Value | Description |
|----------------|---------------|-------------|
| `isLoading` | `false` | Tracks loading state during data fetching |
| `data` | `null` | Stores fetched data |
| `error` | `null` | Stores any error that occurs during data fetching |

## Effects

| Dependency Array | Description |
|------------------|-------------|
| `[]` | Runs once on component mount to fetch initial data |
| `[id]` | Runs when the `id` prop changes to fetch updated data |
| `[isEnabled]` | Runs when the `isEnabled` prop changes to toggle functionality |

## Event Handlers

| Handler Name | Parameters | Description |
|--------------|------------|-------------|
| `handleClick` | `(event: React.MouseEvent)` | Handles click events on the main element |
| `handleSubmit` | `(event: React.FormEvent)` | Handles form submission |
| `handleChange` | `(event: React.ChangeEvent<HTMLInputElement>)` | Handles input value changes |

## Styling

[Describe how the component is styled, including any CSS modules, Tailwind classes, or styled components]

```css
/* Key CSS classes */
.component-wrapper {
  /* Styles for the wrapper */
}

.component-header {
  /* Styles for the header */
}

.component-body {
  /* Styles for the body */
}

.component-footer {
  /* Styles for the footer */
}
```

## Accessibility

[Describe any accessibility features or considerations for this component]

- Uses semantic HTML elements
- Includes proper ARIA attributes
- Supports keyboard navigation
- Color contrast meets WCAG standards

## Performance Considerations

[Describe any performance optimizations or considerations]

- Memoized with React.memo to prevent unnecessary re-renders
- Uses virtualization for long lists
- Implements lazy loading for images
- Optimizes expensive calculations

## Related Components

[List any related components that are commonly used with this one]

- `RelatedComponent1`: Brief description of relationship
- `RelatedComponent2`: Brief description of relationship

## Testing

[Describe how to test this component, including any test files or special considerations]

```jsx
// Example test
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from 'components/path/to/ComponentName';

describe('ComponentName', () => {
  it('renders correctly with default props', () => {
    render(<ComponentName prop1="test" />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<ComponentName prop1="test" prop4={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Notes

[Any additional notes, caveats, or important information about the component]

---

## Example Documentation

### SearchForm

A form component that allows users to search for handyman services by location and service type.

## File Location

```
components/search/SearchForm.js
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `onSearch` | `(location: string, serviceType: string) => void` | Yes | - | Callback function called when search is submitted |
| `initialLocation` | `string` | No | `''` | Initial value for the location input |
| `initialServiceType` | `string` | No | `''` | Initial value for the service type input |
| `isLoading` | `boolean` | No | `false` | Whether the search is currently being processed |
| `serviceTypes` | `string[]` | No | `[]` | List of available service types for dropdown |

## Usage Example

```jsx
import SearchForm from 'components/search/SearchForm';

function SearchPage() {
  const handleSearch = (location, serviceType) => {
    console.log(`Searching for ${serviceType} in ${location}`);
    // Perform search logic
  };

  return (
    <div className="search-page">
      <h1>Find Handyman Services</h1>
      <SearchForm
        onSearch={handleSearch}
        initialLocation="New York"
        serviceTypes={['Plumbing', 'Electrical', 'Carpentry', 'Painting']}
      />
    </div>
  );
}
```

## Component Structure

The SearchForm component consists of a form with two main inputs: location and service type. The location input uses the Google Maps Autocomplete API for address suggestions. The service type input is a dropdown populated from the serviceTypes prop.

```jsx
// Simplified component structure
<form className="search-form" onSubmit={handleSubmit}>
  <div className="input-group">
    <label htmlFor="location">Location</label>
    <input
      id="location"
      type="text"
      value={location}
      onChange={handleLocationChange}
      placeholder="Enter your location"
    />
  </div>
  <div className="input-group">
    <label htmlFor="serviceType">Service Type</label>
    <select
      id="serviceType"
      value={serviceType}
      onChange={handleServiceTypeChange}
    >
      <option value="">Select a service</option>
      {serviceTypes.map((type) => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
  </div>
  <button type="submit" disabled={isLoading || !location || !serviceType}>
    {isLoading ? 'Searching...' : 'Search'}
  </button>
</form>
```

## State Management

| State Variable | Initial Value | Description |
|----------------|---------------|-------------|
| `location` | `initialLocation` | Current value of the location input |
| `serviceType` | `initialServiceType` | Current value of the service type input |
| `suggestions` | `[]` | Location suggestions from Google Maps Autocomplete |

## Effects

| Dependency Array | Description |
|------------------|-------------|
| `[initialLocation, initialServiceType]` | Updates form values when initial props change |
| `[location]` | Fetches location suggestions when location input changes |

## Event Handlers

| Handler Name | Parameters | Description |
|--------------|------------|-------------|
| `handleSubmit` | `(event: React.FormEvent)` | Prevents default form submission and calls onSearch prop |
| `handleLocationChange` | `(event: React.ChangeEvent<HTMLInputElement>)` | Updates location state and triggers suggestions |
| `handleServiceTypeChange` | `(event: React.ChangeEvent<HTMLSelectElement>)` | Updates serviceType state |
| `handleSuggestionSelect` | `(suggestion: string)` | Updates location when a suggestion is selected |

## Styling

The component uses Tailwind CSS for styling:

```jsx
<form className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md">
  {/* Input groups and button with Tailwind classes */}
</form>
```

## Accessibility

- Form inputs have associated labels
- Required fields are marked with aria-required
- Error messages are announced with aria-live
- Focus states are clearly visible
- Button is disabled when form is invalid or loading

## Performance Considerations

- Debounces location input to limit API calls to Google Maps
- Memoizes the suggestions dropdown to prevent unnecessary re-renders
- Uses React.memo to optimize the component

## Related Components

- `LocationAutocomplete`: Used internally for location suggestions
- `SearchResults`: Typically renders the results of the search
- `ServiceTypeSelector`: Alternative component for selecting service types with icons

## Testing

```jsx
// Example test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchForm from 'components/search/SearchForm';

describe('SearchForm', () => {
  it('calls onSearch with correct values when submitted', async () => {
    const handleSearch = jest.fn();
    render(
      <SearchForm
        onSearch={handleSearch}
        serviceTypes={['Plumbing', 'Electrical']}
      />
    );
    
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'New York' },
    });
    
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'Plumbing' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    expect(handleSearch).toHaveBeenCalledWith('New York', 'Plumbing');
  });
});
```

## Notes

- The Google Maps Autocomplete functionality requires the Google Maps MCP server to be running
- For performance reasons, suggestions are limited to 5 results
- The component handles both US and international addresses
