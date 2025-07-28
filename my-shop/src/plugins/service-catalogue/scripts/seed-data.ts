import { bootstrap } from '@vendure/core';
import { config } from '../../../vendure-config';
import { DataSeederService } from '../services/data-seeder.service';

async function seedServiceData() {
    try {
        console.log('Bootstrapping Vendure...');
        const app = await bootstrap(config);
        
        console.log('Seeding service data...');
        const dataSeederService = app.get(DataSeederService);
        await dataSeederService.seedServices();
        
        console.log('Data seeding completed successfully!');
        await app.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    seedServiceData();
}

export { seedServiceData };