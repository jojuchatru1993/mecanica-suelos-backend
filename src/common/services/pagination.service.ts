import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationResult } from '../interfaces/pagination-result.interface';

@Injectable()
export class PaginationService<T> {
    constructor() { }

    async paginate<T>(
        repository: Repository<T>,
        options: {
            page: number;
            limit: number;
            search?: string;
            searchFields?: Array<{ field: string, type: 'string' | 'number' | 'date' }>;
            orderBy?: string;
            orderDirection?: 'ASC' | 'DESC';
        },
        queryBuilder?: SelectQueryBuilder<T>
    ): Promise<PaginationResult<T>> {
        const { page, limit, search, searchFields, orderBy, orderDirection = 'ASC' } = options;
        const skip = (page - 1) * limit;

        try {
            if (!queryBuilder) {
                queryBuilder = repository.createQueryBuilder('entity');
            }

            if (search && searchFields && searchFields.length > 0) {
                const whereConditions = searchFields.map(({ field, type }) => {
                    switch (type) {
                        case 'string':
                            return `CAST(entity.${field} AS TEXT) ILIKE :search`;
                        case 'number':
                            return `CAST(entity.${field} AS TEXT) = :exactSearch`;
                        case 'date':
                            return `TO_CHAR(entity.${field}, 'YYYY-MM-DD') LIKE :search`;
                        default:
                            return `CAST(entity.${field} AS TEXT) ILIKE :search`;
                    }
                });

                queryBuilder.where(`(${whereConditions.join(' OR ')})`, {
                    search: `%${search}%`,
                    exactSearch: search
                });
            }

            if (orderBy) {
                queryBuilder.orderBy(`entity.${orderBy}`, orderDirection);
            }

            const [items, total] = await queryBuilder
                .skip(skip)
                .take(limit)
                .getManyAndCount();

            const totalPages = Math.ceil(total / limit);

            return {
                items,
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error) {
            console.log('Error paginating results:', error)

            throw new Error('Error paginating results, check server logs.');
        }
    }
}