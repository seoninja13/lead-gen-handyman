import { BaseRepository } from './base.repository';
import { City } from '@/interfaces/domain';
import { DatabaseService, Result } from '@/interfaces/services';

export class CityRepository extends BaseRepository<City> {
  constructor(db: DatabaseService) {
    super(db, 'cities');
  }

  // Custom methods specific to cities
  async findByState(state: string): Promise<Result<City[]>> {
    return this.query<City[]>(
      `SELECT * FROM ${this.tableName} WHERE state = '${state}'`
    );
  }

  async findByServiceArea(serviceArea: string): Promise<Result<City[]>> {
    return this.query<City[]>(
      `SELECT * FROM ${this.tableName} WHERE service_area @> ARRAY['${serviceArea}']`
    );
  }

  async findWithServiceCount(): Promise<Result<Array<City & { service_count: number }>>> {
    return this.query(
      `SELECT c.*, 
        COUNT(cs.service_id) as service_count 
       FROM ${this.tableName} c 
       LEFT JOIN city_services cs ON c.id = cs.city_id 
       GROUP BY c.id`
    );
  }

  async findByZipCode(zipCode: string): Promise<Result<City[]>> {
    return this.query<City[]>(
      `SELECT * FROM ${this.tableName} WHERE zip_codes @> ARRAY['${zipCode}']`
    );
  }

  async findNearby(
    latitude: number, 
    longitude: number, 
    radiusMiles: number
  ): Promise<Result<City[]>> {
    // Using PostGIS for geographic calculations
    return this.query<City[]>(`
      SELECT *, 
        ST_Distance(
          ST_MakePoint(coordinates->>'longitude', coordinates->>'latitude')::geography,
          ST_MakePoint(${longitude}, ${latitude})::geography
        ) / 1609.34 as distance_miles
      FROM ${this.tableName}
      WHERE ST_DWithin(
        ST_MakePoint(coordinates->>'longitude', coordinates->>'latitude')::geography,
        ST_MakePoint(${longitude}, ${latitude})::geography,
        ${radiusMiles} * 1609.34
      )
      ORDER BY distance_miles ASC
    `);
  }

  async searchByName(query: string): Promise<Result<City[]>> {
    return this.query<City[]>(
      `SELECT * FROM ${this.tableName} 
       WHERE name ILIKE '%${query}%' 
       OR state ILIKE '%${query}%'`
    );
  }

  async updateServiceArea(
    cityId: string | number,
    serviceArea: string[]
  ): Promise<Result<City>> {
    return this.update(cityId, { service_area: serviceArea });
  }

  async updateCoordinates(
    cityId: string | number,
    latitude: number,
    longitude: number
  ): Promise<Result<City>> {
    return this.update(cityId, {
      coordinates: { latitude, longitude }
    });
  }

  async findWithActiveServices(): Promise<Result<City[]>> {
    return this.query<City[]>(`
      SELECT DISTINCT c.* 
      FROM ${this.tableName} c
      INNER JOIN city_services cs ON c.id = cs.city_id
      WHERE cs.availability = true
    `);
  }

  async findWithSpecificService(serviceId: string | number): Promise<Result<City[]>> {
    return this.query<City[]>(`
      SELECT c.* 
      FROM ${this.tableName} c
      INNER JOIN city_services cs ON c.id = cs.city_id
      WHERE cs.service_id = '${serviceId}'
      AND cs.availability = true
    `);
  }
}
