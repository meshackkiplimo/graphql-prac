# DFSA Service Catalogue Plugin

This plugin provides GraphQL API endpoints for the Dubai Financial Services Authority (DFSA) Service Catalogue functionality, enabling regulatory services listing, filtering, and user interaction capabilities.

## Features

- **Service Listing**: Browse all available DFSA regulatory services
- **Service Filtering**: Filter services by category and tags
- **Service Details**: Get detailed information about specific services
- **Enquiry Submission**: Submit enquiries for specific services
- **Service Following**: Bookmark/track services of interest

## GraphQL API Endpoints

### Queries

#### `servicesList`
Returns all available active services.

```graphql
query {
  servicesList {
    id
    title
    category
    tags
    summary
    description
    targetStakeholder
    isActive
    createdAt
    updatedAt
  }
}
```

#### `serviceById(id: ID!)`
Returns detailed information for a specific service.

```graphql
query GetService($id: ID!) {
  serviceById(id: $id) {
    id
    title
    category
    tags
    summary
    description
    targetStakeholder
    isActive
    createdAt
    updatedAt
  }
}
```

#### `servicesByCategory(category: String!)`
Returns services filtered by category.

```graphql
query GetServicesByCategory($category: String!) {
  servicesByCategory(category: $category) {
    id
    title
    category
    tags
    summary
    targetStakeholder
  }
}
```

**Available Categories:**
- Banks
- Insurance
- Investment Firms
- FinTech
- Individual Practitioners

#### `servicesByTag(tag: String!)`
Returns services filtered by tag.

```graphql
query GetServicesByTag($tag: String!) {
  servicesByTag(tag: $tag) {
    id
    title
    category
    tags
    summary
    targetStakeholder
  }
}
```

**Available Tags:**
- Licensing
- Authorization
- Compliance
- Reporting
- Advisory
- Registration
- Notification
- Exemption

### Mutations

#### `submitEnquiry(input: EnquiryInput!)`
Submit an enquiry for a specific service.

```graphql
mutation SubmitEnquiry($input: EnquiryInput!) {
  submitEnquiry(input: $input) {
    success
    enquiryId
    message
  }
}
```

**Input:**
```graphql
input EnquiryInput {
  serviceId: ID!
  userEmail: String!
  userName: String!
  message: String!
}
```

#### `followService(id: ID!)`
Follow/bookmark a service.

```graphql
mutation FollowService($id: ID!, $userId: String) {
  followService(id: $id, userId: $userId) {
    success
    followId
    message
  }
}
```

## Usage Examples

### Frontend Integration

```typescript
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://localhost:3000/shop-api');

// Get all services
const services = await client.request(`
  query {
    servicesList {
      id
      title
      category
      summary
      targetStakeholder
    }
  }
`);

// Filter by category
const bankingServices = await client.request(`
  query {
    servicesByCategory(category: "Banks") {
      id
      title
      summary
    }
  }
`);

// Submit enquiry
const enquiryResult = await client.request(`
  mutation SubmitEnquiry($input: EnquiryInput!) {
    submitEnquiry(input: $input) {
      success
      enquiryId
      message
    }
  }
`, {
  input: {
    serviceId: "service-uuid",
    userEmail: "user@example.com",
    userName: "John Doe",
    message: "I need more information about this service."
  }
});
```

### Testing in GraphQL Playground

1. Start the Vendure server: `npm run dev`
2. Open GraphQL Playground: `http://localhost:3000/shop-api`
3. Use the query examples above to test the API

## Data Model

### Service Entity
```typescript
{
  id: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  description: string;
  targetStakeholder: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Service Enquiry Entity
```typescript
{
  id: string;
  serviceId: string;
  userEmail: string;
  userName: string;
  message: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
}
```

### Service Follow Entity
```typescript
{
  id: string;
  serviceId: string;
  userId: string;
  createdAt: Date;
}
```

## Mock Data

The plugin includes comprehensive mock data for DFSA regulatory services across all stakeholder categories:

- **Banking Services**: 3 services including licensing, reporting, and advisory
- **Insurance Services**: 3 services covering registration, solvency, and product approval
- **Investment Firm Services**: 3 services for authorization, risk reporting, and fund management
- **FinTech Services**: 3 services including innovation licensing, digital asset compliance, and sandbox programs
- **Individual Practitioner Services**: 3 services for registration, competency assessment, and professional development

## Development

### Running the Server
```bash
npm run dev
```

### Seeding Data
The plugin automatically seeds mock data on first run. To manually seed data:
```bash
npm run seed-services
```

### Database Migration
The plugin includes migration files that will automatically create the required database tables when the server starts.

## Configuration

The plugin is configured in `vendure-config.ts`:

```typescript
import { ServiceCataloguePlugin } from './plugins/service-catalogue';

export const config: VendureConfig = {
  // ... other config
  plugins: [
    // ... other plugins
    ServiceCataloguePlugin.init(),
  ],
};
```

## Production Considerations

1. **Data Validation**: Add proper input validation for production use
2. **Authentication**: Implement authentication for enquiry submissions
3. **Rate Limiting**: Add rate limiting for API endpoints
4. **Caching**: Implement caching for frequently accessed service data
5. **Monitoring**: Add logging and monitoring for enquiry tracking
6. **Email Notifications**: Integrate email notifications for enquiry confirmations

## Support

For questions or issues with the Service Catalogue plugin, contact the DFSA Digital Business Platform team.