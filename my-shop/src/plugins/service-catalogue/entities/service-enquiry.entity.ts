import { DeepPartial, ID } from '@vendure/common/lib/shared-types';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VendureEntity } from '@vendure/core';
import { Service } from './service.entity';

export enum EnquiryStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

@Entity()
export class ServiceEnquiry extends VendureEntity {
    constructor(input?: DeepPartial<ServiceEnquiry>) {
        super(input);
    }

    @PrimaryGeneratedColumn('uuid')
    id: ID;

    @Column()
    serviceId: ID;

    @Column()
    userEmail: string;

    @Column()
    userName: string;

    @Column('text')
    message: string;

    @Column({
        type: 'varchar',
        enum: EnquiryStatus,
        default: EnquiryStatus.PENDING
    })
    status: EnquiryStatus;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Service, service => service.enquiries)
    @JoinColumn({ name: 'serviceId' })
    service: Service;
}