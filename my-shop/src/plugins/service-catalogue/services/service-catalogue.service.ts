import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ID } from '@vendure/common/lib/shared-types';
import { Service } from '../entities/service.entity';
import { ServiceEnquiry, EnquiryStatus } from '../entities/service-enquiry.entity';
import { ServiceFollow } from '../entities/service-follow.entity';
import { EnquiryInput, EnquiryResult, FollowResult } from '../types';

@Injectable()
export class ServiceCatalogueService {
    constructor(@InjectConnection() private connection: Connection) {}

    async getAllServices(): Promise<Service[]> {
        console.log('Fetching all active services',);
        return this.connection.getRepository(Service).find({
           
            order: { createdAt: 'DESC' }
        });
        
    }

    async getServiceById(id: ID): Promise<Service | undefined> {
        console.log(`Fetching service with ID: ${id}`);  // Debug log moved before query
        
        try {
            const service = await this.connection.getRepository(Service).findOne({
                where: { id: id as string }
            });
            
            console.log(`Service found:`, service ? 'Yes' : 'No');
            if (service) {
                console.log(`Service details:`, { id: service.id, title: service.title });
            }
            
            return service || undefined;
        } catch (error) {
            console.error(`Error fetching service with ID ${id}:`, error);
            return undefined;
        }
    }

    async getServicesByCategory(category: string): Promise<Service[]> {
        return this.connection.getRepository(Service).find({
            where: { category },
            order: { createdAt: 'DESC' }
        });
    }

    async getServicesByTag(tag: string): Promise<Service[]> {
        return this.connection.getRepository(Service)
            .createQueryBuilder('service')
            .where('service.isActive = :isActive', { isActive: true })
            .andWhere('service.tags LIKE :tag', { tag: `%${tag}%` })
            .orderBy('service.createdAt', 'DESC')
            .getMany();
    }

    async submitEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
        try {
            // Use the same method as getAllServices to ensure consistency
            const allServices = await this.getAllServices();
            const service = allServices.find(s => s.id === input.serviceId);
            
            if (!service) {
                return {
                    success: false,
                    message: 'Service not found'
                };
            }

            // Create enquiry
            const enquiry = new ServiceEnquiry({
                serviceId: input.serviceId,
                userEmail: input.userEmail,
                userName: input.userName,
                message: input.message,
                status: EnquiryStatus.PENDING
            });

            const savedEnquiry = await this.connection.getRepository(ServiceEnquiry).save(enquiry);

            return {
                success: true,
                enquiryId: savedEnquiry.id.toString(),
                message: 'Enquiry submitted successfully'
            };
        } catch (error) {
            console.error('Error in submitEnquiry:', error);
            return {
                success: false,
                message: `Failed to submit enquiry: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
        }
    }

    async followService(serviceId: ID, userId: string): Promise<FollowResult> {
        try {
            // Validate service exists
            const service = await this.getServiceById(serviceId);
            if (!service) {
                return {
                    success: false,
                    message: 'Service not found'
                };
            }

            // Check if already following
            const existingFollow = await this.connection.getRepository(ServiceFollow).findOne({
                where: { serviceId, userId }
            });

            if (existingFollow) {
                return {
                    success: false,
                    message: 'Already following this service'
                };
            }

            // Create follow
            const follow = new ServiceFollow({
                serviceId,
                userId
            });

            const savedFollow = await this.connection.getRepository(ServiceFollow).save(follow);

            return {
                success: true,
                followId: savedFollow.id.toString(),
                message: 'Service followed successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to follow service'
            };
        }
    }
}