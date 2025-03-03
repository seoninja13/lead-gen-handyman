import {
  formatCurrency,
  formatDate,
  slugify,
  truncate,
  parsePriceRange,
  generateMetaDescription,
  isValidEmail,
  isValidPhone,
  formatPhone,
  isWithinServiceArea,
  generateSchemaMarkup,
  deepClone,
} from '../utils';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles different currencies', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
      expect(formatCurrency(1234.56, 'GBP')).toBe('£1,234.56');
    });
  });

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2024-02-05');
      expect(formatDate(date)).toBe('February 5, 2024');
    });

    it('handles date strings', () => {
      expect(formatDate('2024-02-05')).toBe('February 5, 2024');
    });
  });

  describe('slugify', () => {
    it('converts text to URL-friendly slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
      expect(slugify('This is a TEST')).toBe('this-is-a-test');
      expect(slugify('Special@#$Characters')).toBe('specialcharacters');
    });

    it('handles multiple spaces and dashes', () => {
      expect(slugify('multiple   spaces')).toBe('multiple-spaces');
      expect(slugify('multiple---dashes')).toBe('multiple-dashes');
    });
  });

  describe('truncate', () => {
    it('truncates text to specified length', () => {
      const text = 'This is a long text that needs to be truncated';
      expect(truncate(text, 7)).toBe('This is...');
    });

    it('does not truncate short text', () => {
      const text = 'Short text';
      expect(truncate(text, 20)).toBe(text);
    });
  });

  describe('parsePriceRange', () => {
    it('extracts min and max values from price range', () => {
      expect(parsePriceRange('$100-$200')).toEqual({ min: 100, max: 200 });
      expect(parsePriceRange('From $50 to $150')).toEqual({ min: 50, max: 150 });
    });

    it('handles single number', () => {
      expect(parsePriceRange('$100')).toEqual({ min: 100, max: 100 });
    });
  });

  describe('generateMetaDescription', () => {
    it('generates meta description with all parameters', () => {
      const result = generateMetaDescription(
        'Plumbing',
        'Sacramento',
        'Expert repairs and installations'
      );
      expect(result).toBe(
        'Professional Plumbing services in Sacramento. Expert repairs and installations'
      );
    });

    it('generates meta description without optional parameters', () => {
      expect(generateMetaDescription('Plumbing')).toBe(
        'Professional Plumbing services'
      );
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('invalidates incorrect email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('validates correct phone numbers', () => {
      expect(isValidPhone('(123) 456-7890')).toBe(true);
      expect(isValidPhone('1234567890')).toBe(true);
      expect(isValidPhone('+1 (123) 456-7890')).toBe(true);
    });

    it('invalidates incorrect phone numbers', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('abc-def-ghij')).toBe(false);
    });
  });

  describe('formatPhone', () => {
    it('formats phone numbers correctly', () => {
      expect(formatPhone('1234567890')).toBe('(123) 456-7890');
      expect(formatPhone('(123) 456-7890')).toBe('(123) 456-7890');
    });

    it('returns original string for invalid formats', () => {
      expect(formatPhone('123')).toBe('123');
    });
  });

  describe('isWithinServiceArea', () => {
    it('correctly determines if point is within service area', () => {
      // Sacramento coordinates
      const centerLat = 38.5816;
      const centerLng = -121.4944;
      
      // Point 5 miles away
      const nearbyLat = 38.6316;
      const nearbyLng = -121.4944;

      expect(
        isWithinServiceArea(centerLat, centerLng, nearbyLat, nearbyLng, 10)
      ).toBe(true);
    });

    it('correctly determines if point is outside service area', () => {
      // Sacramento coordinates
      const centerLat = 38.5816;
      const centerLng = -121.4944;
      
      // San Francisco coordinates (far away)
      const farLat = 37.7749;
      const farLng = -122.4194;

      expect(
        isWithinServiceArea(centerLat, centerLng, farLat, farLng, 10)
      ).toBe(false);
    });
  });

  describe('generateSchemaMarkup', () => {
    it('generates valid schema markup', () => {
      const data = {
        name: 'Plumbing Service',
        description: 'Professional plumbing services',
        price: '$100',
      };

      const schema = JSON.parse(generateSchemaMarkup('Service', data));
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Service');
      expect(schema.name).toBe('Plumbing Service');
    });
  });

  describe('deepClone', () => {
    it('creates a deep copy of objects', () => {
      const original = {
        name: 'Service',
        details: {
          price: 100,
          features: ['a', 'b'],
        },
      };

      const clone = deepClone(original);
      clone.details.price = 200;
      clone.details.features.push('c');

      expect(original.details.price).toBe(100);
      expect(original.details.features).toHaveLength(2);
    });
  });
});
