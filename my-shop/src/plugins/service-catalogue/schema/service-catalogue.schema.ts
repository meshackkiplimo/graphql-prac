import gql from 'graphql-tag';

export const serviceCatalogueShopSchema = gql`
    type ServiceType {
        id: ID!
        title: String!
        category: String!
        tags: [String!]!
        summary: String!
        description: String!
        targetStakeholder: String!
      
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    input EnquiryInput {
        serviceId: String!
        userEmail: String!
        userName: String!
        message: String!
    }

    type EnquiryResult {
        success: Boolean!
        enquiryId: ID
        message: String!
    }

    type FollowResult {
        success: Boolean!
        followId: ID
        message: String!
    }

    extend type Query {
        servicesList: [ServiceType!]!
        serviceById(id: String!): ServiceType
        servicesByCategory(category: String!): [ServiceType!]!
        servicesByTag(tag: String!): [ServiceType!]!
    }

    extend type Mutation {
        submitEnquiry(input: EnquiryInput!): EnquiryResult!
        followService(id: String!, userId: String): FollowResult!
    }
`;

export const serviceCatalogueAdminSchema = serviceCatalogueShopSchema;