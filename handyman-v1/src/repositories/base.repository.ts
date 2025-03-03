import { Entity } from '@/interfaces/domain';
import { DatabaseService, Result } from '@/interfaces/services';

export abstract class BaseRepository<T extends Entity> {
  constructor(
    protected readonly db: DatabaseService,
    protected readonly tableName: string
  ) {}

  protected async handleResult<U>(
    operation: Promise<U>
  ): Promise<Result<U>> {
    try {
      const data = await operation;
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error(`Error in ${this.tableName} repository:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error))
      };
    }
  }

  async findAll(): Promise<Result<T[]>> {
    return this.handleResult(
      this.db.query<T[]>(`SELECT * FROM ${this.tableName}`)
    );
  }

  async findById(id: string | number): Promise<Result<T>> {
    const result = await this.db.queryOne<T>(
      `SELECT * FROM ${this.tableName} WHERE id = '${id}'`
    );
    
    if (!result) {
      return {
        success: false,
        error: new Error(`${this.tableName} with id ${id} not found`)
      };
    }

    return {
      success: true,
      data: result
    };
  }

  async create(data: Partial<T>): Promise<Result<T>> {
    return this.handleResult(
      this.db.insert<T>(this.tableName, data)
    );
  }

  async update(id: string | number, data: Partial<T>): Promise<Result<T>> {
    return this.handleResult(
      this.db.update<T>(this.tableName, id, data)
    );
  }

  async delete(id: string | number): Promise<Result<void>> {
    return this.handleResult(
      this.db.delete(this.tableName, id)
    );
  }

  // Helper method for custom queries
  protected async query<U>(sql: string): Promise<Result<U>> {
    return this.handleResult(
      this.db.query<U>(sql)
    );
  }

  // Helper method for single record custom queries
  protected async queryOne<U>(sql: string): Promise<Result<U>> {
    const result = await this.db.queryOne<U>(sql);
    
    if (!result) {
      return {
        success: false,
        error: new Error('No record found')
      };
    }

    return {
      success: true,
      data: result
    };
  }
}
