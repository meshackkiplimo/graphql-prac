import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { ServiceCatalogueService } from '../services/service-catalogue.service';

@Resolver()
export class ServiceCatalogueResolver {
    constructor(private serviceCatalogueService: ServiceCatalogueService) {}

    // Add a plain method that can be called directly by Vendure's schema resolver mapping
    async serviceByIdPlain(parent: any, args: { id: string }, context: any) {
        console.log(`=== PLAIN RESOLVER CALLED ===`);
        console.log(`Parent:`, parent);
        console.log(`Args:`, args);
        console.log(`Context keys:`, Object.keys(context || {}));
        
        const id = args.id;
        console.log(`Plain Resolver: Received ID: ${id}, type: ${typeof id}`);
        
        const service = await this.serviceCatalogueService.getServiceById(id);
        
        if (!service) {
            console.log(`Plain Resolver: No service found for ID: ${id}`);
            return null;
        }

        console.log(`Plain Resolver: Found service with ID: ${id}, title: ${service.title}`);
        
        return {
            id: service.id.toString(),
            title: service.title,
            category: service.category,
            tags: service.tags,
            summary: service.summary,
            description: service.description,
            targetStakeholder: service.targetStakeholder,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt
        };
    }

    @Query()
    async servicesList() {
        const services = await this.serviceCatalogueService.getAllServices();
        console.log('Fetched services count:', services.length);
        console.log('Available service IDs:', services.map(s => ({ id: s.id, title: s.title })));
        return services.map(service => ({
            id: service.id.toString(),
            title: service.title,
            category: service.category,
            tags: service.tags,
            summary: service.summary,
            description: service.description,
            targetStakeholder: service.targetStakeholder,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt
        }));
    }

    @Query()
    async serviceById(@Args('id') id: string) {
        console.log(`=== SERVICE BY ID RESOLVER CALLED ===`);
        console.log(`Received ID: ${id}`);
        console.log(`ID type: ${typeof id}`);
        console.log(`Raw arguments:`, arguments);
        
        const service = await this.serviceCatalogueService.getServiceById(id);
        
        if (!service) {
            console.log(`GraphQL Resolver: No service found for ID: ${id}`);
            return null;
        }

        console.log(`GraphQL Resolver: Found service with ID: ${id}, title: ${service.title}`);
        
        return {
            id: service.id.toString(),
            title: service.title,
            category: service.category,
            tags: service.tags,
            summary: service.summary,
            description: service.description,
            targetStakeholder: service.targetStakeholder,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt
        };
    }

    @Query()
    async servicesByCategory(@Args('category') category: string) {
        const services = await this.serviceCatalogueService.getServicesByCategory(category);
        return services.map(service => ({
            id: service.id.toString(),
            title: service.title,
            category: service.category,
            tags: service.tags,
            summary: service.summary,
            description: service.description,
            targetStakeholder: service.targetStakeholder,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt
        }));
    }

    @Query()
    async servicesByTag(@Args('tag') tag: string) {
        const services = await this.serviceCatalogueService.getServicesByTag(tag);
        return services.map(service => ({
            id: service.id.toString(),
            title: service.title,
            category: service.category,
            tags: service.tags,
            summary: service.summary,
            description: service.description,
            targetStakeholder: service.targetStakeholder,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt
        }));
    }

    @Mutation()
    async submitEnquiry(@Args('input') input: any) {
        return this.serviceCatalogueService.submitEnquiry(input);
    }

    @Mutation()
    async followService(@Args('id') id: string, @Args('userId') userId?: string) {
        console.log(`=== FOLLOW SERVICE MUTATION CALLED ===`);
        console.log(`Received ID: ${id}, type: ${typeof id}`);
        console.log(`Received userId: ${userId}, type: ${typeof userId}`);
        
        const finalUserId = userId || 'anonymous-user';
        console.log(`Using userId: ${finalUserId}`);
        
        const result = await this.serviceCatalogueService.followService(id, finalUserId);
        console.log(`Follow service result:`, result);
        
        return result;
    }
}