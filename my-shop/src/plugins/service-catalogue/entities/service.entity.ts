import { DeepPartial, ID } from '@vendure/common/lib/shared-types';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { VendureEntity } from '@vendure/core';
import { ServiceEnquiry } from './service-enquiry.entity';
import { ServiceFollow } from './service-follow.entity';


@Entity()
export class Service extends VendureEntity {
    constructor(input?: DeepPartial<Service>) {
        super(input);
    }

    @PrimaryGeneratedColumn('uuid')
    id: ID;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column('simple-array')
    tags: string[];

    @Column('text')
    summary: string;

    @Column('text')
    description: string;

    @Column()
    targetStakeholder: string;

   

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ServiceEnquiry, enquiry => enquiry.service)
    enquiries: ServiceEnquiry[];

    @OneToMany(() => ServiceFollow, follow => follow.service)
    follows: ServiceFollow[];
}