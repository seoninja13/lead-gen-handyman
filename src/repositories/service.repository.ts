import { BaseRepository } from './base.repository';
import { Service } from '@/interfaces/domain';
import { DatabaseService, Result } from '@/interfaces/services';

export class ServiceRepository extends BaseRepository<Service> {
  constructor(db: DatabaseService) {
    super(db, 'services');
  }

  // Custom methods specific to services
  async findBySlug(slug: string): Promise<Result<Service>> {
    return this.queryOne<Service>(
      `SELECT * FROM ${this.tableName} WHERE slug = '${slug}'`
    );
  }

  async findByCategory(category: string): Promise<Result<Service[]>> {
    return this.query<Service[]>(
      `SELECT * FROM ${this.tableName} WHERE category = '${category}'`
    );
  }

  async findWithCityCount(): Promise<Result<Array<Service & { city_count: number }>>> {
    return this.query(
      `SELECT s.*, 
        COUNT(DISTINCT cs.city_id) as city_count 
       FROM ${this.tableName} s 
       LEFT JOIN city_services cs ON s.id = cs.service_id 
       GROUP BY s.id`
    );
  }

  async findByTags(tags: string[]): Promise<Result<Service[]>> {
    const tagConditions = tags.map(tag => `tags @> ARRAY['${tag}']`).join(' OR ');
    return this.query<Service[]>(
      `SELECT * FROM ${this.tableName} WHERE ${tagConditions}`
    );
  }

  async findPopular(limit: number = 10): Promise<Result<Array<Service & { request_count: number }>>> {
    return this.query(
      `SELECT s.*, 
        COUNT(sr.id) as request_count 
       FROM ${this.tableName} s 
       LEFT JOIN service_requests sr ON s.id = sr.service_id 
       GROUP BY s.id 
       ORDER BY request_count DESC 
       LIMIT ${limit}`
    );
  }

  async searchByName(query: string): Promise<Result<Service[]>> {
    return this.query<Service[]>(
      `SELECT * FROM ${this.tableName} 
       WHERE name ILIKE '%${query}%' 
       OR description ILIKE '%${query}%'
       OR category ILIKE '%${query}%'`
    );
  }

  async findInPriceRange(
    minPrice: number,
    maxPrice: number
  ): Promise<Result<Service[]>> {
    return this.query<Service[]>(
      `SELECT * FROM ${this.tableName} 
       WHERE CAST(REGEXP_REPLACE(price_range, '[^0-9]', '', 'g') AS INTEGER) 
       BETWEEN ${minPrice} AND ${maxPrice}`
    );
  }

  async findByDuration(duration: string): Promise<Result<Service[]>> {
    return this.query<Service[]>(
      `SELECT * FROM ${this.tableName} WHERE duration = '${duration}'`
    );
  }

  async findAvailableInCity(cityId: string | number): Promise<Result<Service[]>> {
    return this.query<Service[]>(`
      SELECT s.* 
      FROM ${this.tableName} s
      INNER JOIN city_services cs ON s.id = cs.service_id
      WHERE cs.city_id = '${cityId}'
      AND cs.availability = true
    `);
  }

  async findRelated(serviceId: string | number): Promise<Result<Service[]>> {
    return this.query<Service[]>(`
      WITH service_tags AS (
        SELECT UNNEST(tags) as tag
        FROM ${this.tableName}
        WHERE id = '${serviceId}'
      )
      SELECT DISTINCT s.*
      FROM ${this.tableName} s
      CROSS JOIN service_tags st
      WHERE s.id != '${serviceId}'
      AND s.tags @> ARRAY[st.tag]
      LIMIT 5
    `);
  }

  async updateTags(
    serviceId: string | number,
    tags: string[]
  ): Promise<Result<Service>> {
    return this.update(serviceId, { tags });
  }

  async updatePriceRange(
    serviceId: string | number,
    priceRange: string
  ): Promise<Result<Service>> {
    return this.update(serviceId, { price_range: priceRange });
  }
}
