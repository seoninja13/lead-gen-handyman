import { DatabaseService } from '@/interfaces/services';
import { CityRepository } from './city.repository';
import { ServiceRepository } from './service.repository';
import { CityServiceRepository } from './city-service.repository';

/**
 * Creates and returns repository instances for data access
 * @param db Database service implementation
 * @returns Object containing repository instances
 */
export function createRepositories(db: DatabaseService) {
  return {
    cities: new CityRepository(db),
    services: ServiceRepository.getInstance(db),
    cityServices: new CityServiceRepository(db)
  };
}

export type Repositories = ReturnType<typeof createRepositories>;
