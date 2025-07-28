import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Service } from '../entities/service.entity';

@Injectable()
export class DataSeederService {
    constructor(@InjectConnection() private connection: Connection) {}

    async seedServices(): Promise<void> {
        const serviceRepository = this.connection.getRepository(Service);
        
        // Check if data already exists
        const existingCount = await serviceRepository.count();
        if (existingCount > 0) {
            console.log('Service data already exists, skipping seeding.');
            return;
        }

        const mockServices = [
            // Banking Services
            {
                title: 'Banking License Application',
                category: 'Banks',
                tags: ['Licensing', 'Authorization', 'Banking'],
                summary: 'Apply for a banking license to operate as a bank in the DIFC',
                description: 'Comprehensive application process for obtaining a banking license in the Dubai International Financial Centre. Includes assessment of capital requirements, business plan review, and regulatory compliance verification.',
                targetStakeholder: 'Banks',
              
            },
            {
                title: 'Bank Capital Adequacy Reporting',
                category: 'Banks',
                tags: ['Reporting', 'Compliance', 'Capital'],
                summary: 'Submit required capital adequacy reports for banking operations',
                description: 'Regular reporting requirements for banks to demonstrate compliance with capital adequacy ratios and risk management standards as per DFSA regulations.',
                targetStakeholder: 'Banks',
              
            },
            {
                title: 'Banking Compliance Advisory',
                category: 'Banks',
                tags: ['Advisory', 'Compliance', 'Consultation'],
                summary: 'Expert advisory services for banking compliance matters',
                description: 'Professional advisory services to help banks navigate complex regulatory requirements and ensure ongoing compliance with DFSA banking regulations.',
                targetStakeholder: 'Banks',
              
            },

            // Insurance Services
            {
                title: 'Insurance License Registration',
                category: 'Insurance',
                tags: ['Licensing', 'Registration', 'Insurance'],
                summary: 'Register for an insurance operating license in the DIFC',
                description: 'Application process for insurance companies seeking to establish operations in the Dubai International Financial Centre, including life, general, and reinsurance licenses.',
                targetStakeholder: 'Insurance',
              
            },
            {
                title: 'Insurance Solvency Reporting',
                category: 'Insurance',
                tags: ['Reporting', 'Solvency', 'Compliance'],
                summary: 'Submit quarterly solvency and financial condition reports',
                description: 'Mandatory reporting for insurance companies to demonstrate financial stability and compliance with solvency requirements under DFSA insurance regulations.',
                targetStakeholder: 'Insurance',
              
            },
            {
                title: 'Insurance Product Approval',
                category: 'Insurance',
                tags: ['Authorization', 'Product', 'Approval'],
                summary: 'Obtain approval for new insurance products and services',
                description: 'Regulatory approval process for new insurance products, policy terms, and service offerings to ensure consumer protection and market integrity.',
                targetStakeholder: 'Insurance',
              
            },

            // Investment Firms Services
            {
                title: 'Investment Firm Authorization',
                category: 'Investment Firms',
                tags: ['Authorization', 'Licensing', 'Investment'],
                summary: 'Apply for authorization to operate as an investment firm',
                description: 'Comprehensive authorization process for investment firms, including portfolio management, investment advice, and securities dealing activities in the DIFC.',
                targetStakeholder: 'Investment Firms',
              
            },
            {
                title: 'Investment Risk Reporting',
                category: 'Investment Firms',
                tags: ['Reporting', 'Risk', 'Compliance'],
                summary: 'Submit investment risk and exposure reports',
                description: 'Regular reporting requirements for investment firms to disclose risk exposures, investment positions, and compliance with prudential requirements.',
                targetStakeholder: 'Investment Firms',
              
            },
            {
                title: 'Fund Management Registration',
                category: 'Investment Firms',
                tags: ['Registration', 'Fund', 'Management'],
                summary: 'Register fund management services and offerings',
                description: 'Registration process for fund managers and collective investment schemes, including due diligence, operational requirements, and ongoing compliance obligations.',
                targetStakeholder: 'Investment Firms',
              
            },

            // FinTech Services
            {
                title: 'FinTech Innovation License',
                category: 'FinTech',
                tags: ['Licensing', 'Innovation', 'Technology'],
                summary: 'Apply for specialized FinTech operating license',
                description: 'Streamlined licensing process for FinTech companies offering innovative financial services, including digital payments, blockchain solutions, and robo-advisory services.',
                targetStakeholder: 'FinTech',
              
            },
            {
                title: 'Digital Asset Regulation Compliance',
                category: 'FinTech',
                tags: ['Compliance', 'Digital Assets', 'Cryptocurrency'],
                summary: 'Ensure compliance with digital asset regulations',
                description: 'Comprehensive compliance framework for FinTech companies dealing with digital assets, cryptocurrencies, and blockchain-based financial services.',
                targetStakeholder: 'FinTech',
              
            },
            {
                title: 'FinTech Sandbox Application',
                category: 'FinTech',
                tags: ['Innovation', 'Testing', 'Sandbox'],
                summary: 'Apply for regulatory sandbox testing program',
                description: 'Access to DFSA regulatory sandbox for testing innovative FinTech solutions in a controlled environment with relaxed regulatory requirements.',
                targetStakeholder: 'FinTech',
              
            },

            // Individual Practitioners Services
            {
                title: 'Individual Practitioner Registration',
                category: 'Individual Practitioners',
                tags: ['Registration', 'Individual', 'Practitioner'],
                summary: 'Register as an individual financial services practitioner',
                description: 'Registration process for individual practitioners providing financial services, including investment advisors, insurance brokers, and financial consultants.',
                targetStakeholder: 'Individual Practitioners',
              
            },
            {
                title: 'Professional Competency Assessment',
                category: 'Individual Practitioners',
                tags: ['Assessment', 'Competency', 'Professional'],
                summary: 'Complete required professional competency evaluations',
                description: 'Mandatory competency assessments for individual practitioners to demonstrate knowledge and skills in financial services regulations and best practices.',
                targetStakeholder: 'Individual Practitioners',
              
            },
            {
                title: 'Continuing Professional Development',
                category: 'Individual Practitioners',
                tags: ['Training', 'Development', 'Education'],
                summary: 'Access continuing professional development programs',
                description: 'Ongoing professional development requirements and training programs for individual practitioners to maintain regulatory qualifications and stay current with industry standards.',
                targetStakeholder: 'Individual Practitioners',
              
            }
        ];

        // Insert mock services
        const services = mockServices.map(serviceData => new Service(serviceData));
        await serviceRepository.save(services);
        
        console.log(`Successfully seeded ${services.length} services into the database.`);
    }
}