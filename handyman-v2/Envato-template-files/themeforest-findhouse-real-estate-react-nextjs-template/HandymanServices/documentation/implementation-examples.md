# Implementation Examples

## Breadcrumb Component
```jsx
// components/navigation/Breadcrumbs.jsx
export default function Breadcrumbs({ path }) {
  const segments = path.split('/').filter(Boolean);
  return (
    <nav>
      {segments.map((segment, index) => (
        <Link key={index} href={`/${segments.slice(0, index+1).join('/')}`}>
          {segment.replace(/-/g, ' ')}
        </Link>
      ))}
    </nav>
  );
}
```
