import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { Service } from './entities/service.entity';
import { ServiceEnquiry } from './entities/service-enquiry.entity';
import { ServiceFollow } from './entities/service-follow.entity';
import { ServiceCatalogueService } from './services/service-catalogue.service';
import { DataSeederService } from './services/data-seeder.service';
import { ServiceCatalogueResolver } from './resolvers/service-catalogue.resolver';
import { serviceCatalogueShopSchema, serviceCatalogueAdminSchema } from './schema/service-catalogue.schema';

@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [Service, ServiceEnquiry, ServiceFollow],
    providers: [ServiceCatalogueService, DataSeederService, ServiceCatalogueResolver],
    shopApiExtensions: {
        schema: serviceCatalogueShopSchema,
        resolvers: [ServiceCatalogueResolver]
    },
    adminApiExtensions: {
        schema: serviceCatalogueAdminSchema,
        resolvers: [ServiceCatalogueResolver]
    },
    compatibility: '^3.0.0'
})
export class ServiceCataloguePlugin {
    static options: any = {};

    static init(options?: any) {
        this.options = options || {};
        return ServiceCataloguePlugin;
    }
}