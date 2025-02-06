import { Service } from '@/interfaces/services';
import { BaseRepository } from './base.repository';
import { SupabaseService } from '@/services/database/supabase.service';
import { DatabaseService } from '@/interfaces/services';

export class ServiceRepository extends BaseRepository<Service> {
  private static instance: ServiceRepository;
  private supabase = SupabaseService.getInstance().getClient();

  constructor(db: DatabaseService) {
    super(db, 'services');
  }

  static getInstance(db?: DatabaseService): ServiceRepository {
    if (!ServiceRepository.instance) {
      if (!db) {
        const supabaseService = SupabaseService.getInstance();
        db = { client: supabaseService.getClient() };
      }
      ServiceRepository.instance = new ServiceRepository(db);
    }
    return ServiceRepository.instance;
  }

  async getServices(): Promise<Service[]> {
    const { data, error } = await this.supabase
      .from('services')
      .select('*');

    if (error) throw error;
    console.log('Raw service data:', data);
    return data || [];
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    const { data, error } = await this.supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  }
}
