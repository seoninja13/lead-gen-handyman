-- CREATE TABLE (if it doesn't exist)
CREATE TABLE IF NOT EXISTS "test-delete" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2)
);

-- INSERT (Create) - Add 10 records of handyman services
INSERT INTO "test-delete" (name, description, price) VALUES 
('Quick Fix Handyman', 'Professional electrical services', 75.00),
('Pro Plumbing Solutions', 'Expert plumbing services', 85.00),
('Master Carpentry', 'Custom carpentry work', 90.00),
('Perfect Paint Pro', 'Interior and exterior painting', 65.00),
('Floor Masters', 'Professional flooring installation', 70.00),
('HVAC Experts', 'Heating and cooling services', 95.00),
('Drywall Specialists', 'Drywall installation and repair', 60.00),
('Appliance Repair Pros', 'Appliance repair and maintenance', 80.00),
('Roofing Solutions', 'Roof repair and installation', 100.00),
('Lawn & Garden Care', 'Landscaping and garden maintenance', 55.00);

-- SELECT (Read) - Retrieve all records
SELECT * FROM "test-delete";

-- SELECT (Read) - Retrieve specific record
SELECT * FROM "test-delete" WHERE name = 'Quick Fix Handyman';

-- SELECT (Read) - Filter by price range
SELECT * FROM "test-delete" WHERE price BETWEEN 70 AND 90;

-- UPDATE (Update) - Modify a record
UPDATE "test-delete" SET price = 79.99 WHERE name = 'Quick Fix Handyman';

-- SELECT (Read) - Verify the update
SELECT * FROM "test-delete" WHERE name = 'Quick Fix Handyman';

-- DELETE (Delete) - Remove a record
DELETE FROM "test-delete" WHERE name = 'Lawn & Garden Care';

-- SELECT (Read) - Verify the deletion and count remaining records
SELECT COUNT(*) FROM "test-delete";

-- SELECT (Read) - Get all remaining records
SELECT * FROM "test-delete" ORDER BY price DESC;
