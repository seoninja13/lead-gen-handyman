import { DatabaseService } from '@/interfaces/services';
import { CityRepository } from './city.repository';
import { ServiceRepository } from './service.repository';
import { CityServiceRepository } from './city-service.repository';

export interface Repositories {
  cities: CityRepository;
  services: ServiceRepository;
  cityServices: CityServiceRepository;
}

// Factory function to create all repositories
export function createRepositories(db: DatabaseService): Repositories {
  return {
    cities: new CityRepository(db),
    services: new ServiceRepository(db),
    cityServices: new CityServiceRepository(db)
  };
}

// Export individual repositories for direct use
export { CityRepository } from './city.repository';
export { ServiceRepository } from './service.repository';
export { CityServiceRepository } from './city-service.repository';

// Export base repository for extension
export { BaseRepository } from './base.repository';
