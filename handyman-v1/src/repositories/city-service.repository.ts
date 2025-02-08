import { BaseRepository } from './base.repository';
import { CityService } from '@/interfaces/domain';
import { DatabaseService, Result } from '@/interfaces/services';

export class CityServiceRepository extends BaseRepository<CityService> {
  constructor(db: DatabaseService) {
    super(db, 'city_services');
  }

  // Custom methods specific to city-services junction
  async findByCityAndService(
    cityId: string | number,
    serviceId: string | number
  ): Promise<Result<CityService>> {
    return this.queryOne<CityService>(
      `SELECT * FROM ${this.tableName} 
       WHERE city_id = '${cityId}' 
       AND service_id = '${serviceId}'`
    );
  }

  async findWithDetails(): Promise<Result<CityService[]>> {
    return this.query<CityService[]>(`
      SELECT cs.*, 
        c.name as city_name, 
        c.state as city_state,
        s.name as service_name,
        s.description as service_description
      FROM ${this.tableName} cs
      INNER JOIN cities c ON cs.city_id = c.id
      INNER JOIN services s ON cs.service_id = s.id
    `);
  }

  async findAvailableByCity(cityId: string | number): Promise<Result<CityService[]>> {
    return this.query<CityService[]>(`
      SELECT cs.*, s.name as service_name
      FROM ${this.tableName} cs
      INNER JOIN services s ON cs.service_id = s.id
      WHERE cs.city_id = '${cityId}'
      AND cs.availability = true
    `);
  }

  async findAvailableByService(serviceId: string | number): Promise<Result<CityService[]>> {
    return this.query<CityService[]>(`
      SELECT cs.*, c.name as city_name
      FROM ${this.tableName} cs
      INNER JOIN cities c ON cs.city_id = c.id
      WHERE cs.service_id = '${serviceId}'
      AND cs.availability = true
    `);
  }

  async updateAvailability(
    cityId: string | number,
    serviceId: string | number,
    availability: boolean
  ): Promise<Result<CityService>> {
    const result = await this.queryOne<CityService>(
      `SELECT id FROM ${this.tableName} 
       WHERE city_id = '${cityId}' 
       AND service_id = '${serviceId}'`
    );

    if (!result.success || !result.data) {
      return {
        success: false,
        error: new Error('CityService record not found')
      };
    }

    return this.update(result.data.id, { availability });
  }

  async updatePriceModifier(
    cityId: string | number,
    serviceId: string | number,
    priceModifier: number
  ): Promise<Result<CityService>> {
    const result = await this.queryOne<CityService>(
      `SELECT id FROM ${this.tableName} 
       WHERE city_id = '${cityId}' 
       AND service_id = '${serviceId}'`
    );

    if (!result.success || !result.data) {
      return {
        success: false,
        error: new Error('CityService record not found')
      };
    }

    return this.update(result.data.id, { price_modifier: priceModifier });
  }

  async findByServiceAreaRadius(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<Result<CityService[]>> {
    return this.query<CityService[]>(`
      SELECT cs.*, 
        c.name as city_name,
        s.name as service_name,
        ST_Distance(
          ST_MakePoint(c.coordinates->>'longitude', c.coordinates->>'latitude')::geography,
          ST_MakePoint(${longitude}, ${latitude})::geography
        ) / 1609.34 as distance_miles
      FROM ${this.tableName} cs
      INNER JOIN cities c ON cs.city_id = c.id
      INNER JOIN services s ON cs.service_id = s.id
      WHERE cs.service_area_radius >= (
        ST_Distance(
          ST_MakePoint(c.coordinates->>'longitude', c.coordinates->>'latitude')::geography,
          ST_MakePoint(${longitude}, ${latitude})::geography
        ) / 1609.34
      )
      AND cs.availability = true
      AND ST_DWithin(
        ST_MakePoint(c.coordinates->>'longitude', c.coordinates->>'latitude')::geography,
        ST_MakePoint(${longitude}, ${latitude})::geography,
        ${radius} * 1609.34
      )
      ORDER BY distance_miles ASC
    `);
  }

  async findWithCustomContent(): Promise<Result<CityService[]>> {
    return this.query<CityService[]>(`
      SELECT cs.* 
      FROM ${this.tableName} cs
      WHERE cs.custom_description IS NOT NULL 
      OR cs.main_content IS NOT NULL
      OR cs.service_images IS NOT NULL
    `);
  }

  async bulkUpdateAvailability(
    cityId: string | number,
    serviceIds: (string | number)[],
    availability: boolean
  ): Promise<Result<void>> {
    const serviceIdList = serviceIds.map(id => `'${id}'`).join(',');
    return this.query(`
      UPDATE ${this.tableName}
      SET availability = ${availability}
      WHERE city_id = '${cityId}'
      AND service_id IN (${serviceIdList})
    `);
  }
}
