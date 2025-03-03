import { createSupabaseServerClient } from './supabase.server';
import { City, Service, CityService } from '@/types/database';

export const DatabaseOperations = {
  Cities: {
    async create(data: Omit<City, 'id' | 'created_at'>): Promise<City | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: city, error } = await supabase
          .from('cities')
          .insert(data)
          .select()
          .single();
        if (error) {
          console.error(`Error creating city: ${error.message}`);
          return null;
        }
        return city;
      } catch (error) {
        console.error(`Error creating city: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getAll(): Promise<City[]> {
      try {
        const supabase = createSupabaseServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: cities, error } = await supabase
          .from('cities')
          .select()
          .order('name', { ascending: true });
        if (error) throw error;
        return cities || [];
      } catch (error) {
        console.error(`Error fetching cities: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getById(id: number): Promise<City | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: city, error } = await supabase
          .from('cities')
          .select()
          .eq('id', id)
          .single();
        if (error) throw error;
        return city;
      } catch (error) {
        console.error(`Error fetching city: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getBySlug(slug: string): Promise<City | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: city, error } = await supabase
          .from('cities')
          .select()
          .eq('slug', slug)
          .single();
        if (error) throw error;
        return city;
      } catch (error) {
        console.error(`Error fetching city: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async update(data: Partial<City> & { id: number }): Promise<City | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: city, error } = await supabase
          .from('cities')
          .update(data)
          .eq('id', data.id)
          .select()
          .single();
        if (error) throw error;
        return city;
      } catch (error) {
        console.error(`Error updating city: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async delete(id: number): Promise<boolean> {
      try {
        const supabase = createSupabaseServerClient();
        const { error } = await supabase
          .from('cities')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (error) {
        console.error(`Error deleting city: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  },

  Services: {
    async create(data: Omit<Service, 'id' | 'created_at'>): Promise<Service | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: service, error } = await supabase
          .from('services')
          .insert(data)
          .select()
          .single();
        if (error) {
          console.error(`Error creating service: ${error.message}`);
          return null;
        }
        return service;
      } catch (error) {
        console.error(`Error creating service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getAll(): Promise<Service[] | any[]> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: services, error } = await supabase
          .from('services')
          .select()
          .order('name', { ascending: true });
        if (error) throw error;
        services?.forEach(service => {
          console.log(`Service ID: ${service.id}, Image URL: ${service.image_url}`);
        });
        return services || [];
      } catch (error) {
        console.error(`Error fetching services: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getById(id: number): Promise<Service | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: service, error } = await supabase
          .from('services')
          .select()
          .eq('id', id)
          .single();
        if (error) throw error;
        return service;
      } catch (error) {
        console.error(`Error fetching service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getBySlug(slug: string): Promise<Service | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: service, error } = await supabase
          .from('services')
          .select()
          .eq('slug', slug)
          .single();
        if (error) throw error;
        return service;
      } catch (error) {
        console.error(`Error fetching service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async update(data: Partial<Service> & { id: number }): Promise<Service | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: service, error } = await supabase
          .from('services')
          .update(data)
          .eq('id', data.id)
          .select()
          .single();
        if (error) throw error;
        return service;
      } catch (error) {
        console.error(`Error updating service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async delete(id: number): Promise<boolean> {
      try {
        const supabase = createSupabaseServerClient();
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (error) {
        console.error(`Error deleting service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  },

  CityServices: {
    async create(data: Omit<CityService, 'id' | 'created_at'>): Promise<CityService | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: cityService, error } = await supabase
          .from('city_services')
          .insert(data)
          .select()
          .single();
        if (error) {
          console.error(`Error creating city service: ${error.message}`);
          return null;
        }
        return cityService;
      } catch (error) {
        console.error(`Error creating city service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getAll(cityId?: number, serviceId?: number): Promise<CityService[]> {
      try {
        const supabase = createSupabaseServerClient();
        let query = supabase
          .from('city_services')
          .select();

        if (cityId) {
          query = query.eq('city_id', cityId);
        }
        if (serviceId) {
          query = query.eq('service_id', serviceId);
        }

        query = query.order('id', { ascending: true });

        const { data: cityServices, error } = await query;
        if (error) throw error;
        return cityServices || [];
      } catch (error) {
        console.error(`Error fetching city services: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getById(id: number): Promise<CityService | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: cityService, error } = await supabase
          .from('city_services')
          .select()
          .eq('id', id)
          .single();
        if (error) throw error;
        return cityService;
      } catch (error) {
        console.error(`Error fetching city service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async getByUrl(url: string): Promise<CityService | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: cityService, error } = await supabase
          .from('city_services')
          .select()
          .eq('seo_url', url)
        if (error) throw error
        return cityService
      } catch (error) {
        console.error(`Error fetching city service: ${error instanceof Error ? error.message : String(error)}`)
        throw error
      }
    },

    async update(data: Partial<CityService> & { id: number }): Promise<CityService | null> {
      try {
        const supabase = createSupabaseServerClient();
        const { data: cityService, error } = await supabase
          .from('city_services')
          .update(data)
          .eq('id', data.id)
          .select()
          .single();
        if (error) throw error;
        return cityService;
      } catch (error) {
        console.error(`Error updating city service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    },

    async delete(id: number): Promise<boolean> {
      try {
        const supabase = createSupabaseServerClient();
        const { error } = await supabase
          .from('city_services')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (error) {
        console.error(`Error deleting city service: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  }
}
