import { DeepPartial, ID } from '@vendure/common/lib/shared-types';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VendureEntity } from '@vendure/core';
import { Service } from './service.entity';

@Entity()
export class ServiceFollow extends VendureEntity {
    constructor(input?: DeepPartial<ServiceFollow>) {
        super(input);
    }

    @PrimaryGeneratedColumn('uuid')
    id: ID;

    @Column()
    serviceId: ID;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Service, service => service.follows)
    @JoinColumn({ name: 'serviceId' })
    service: Service;
}