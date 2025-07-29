import { graphqlClient } from "@lib/graphql";
import Service from "models/service.model";

// GraphQL Queries
const GET_ALL_SERVICES = `
  query GetAllServices {
    servicesList {
      id
      title
      category
      tags
      summary
      description
      targetStakeholder
      createdAt
      updatedAt
    }
  }
`;

const GET_SERVICE_BY_ID = `
  query GetServiceById($id: String!) {
    serviceById(id: $id) {
      id
      title
      category
      tags
      summary
      description
      targetStakeholder
      createdAt
      updatedAt
    }
  }
`;

const GET_SERVICES_BY_CATEGORY = `
  query GetServicesByCategory($category: String!) {
    servicesByCategory(category: $category) {
      id
      title
      category
      tags
      summary
      description
      targetStakeholder
      createdAt
      updatedAt
    }
  }
`;

const GET_SERVICES_BY_TAG = `
  query GetServicesByTag($tag: String!) {
    servicesByTag(tag: $tag) {
      id
      title
      category
      tags
      summary
      description
      targetStakeholder
      createdAt
      updatedAt
    }
  }
`;

const SUBMIT_ENQUIRY = `
  mutation SubmitEnquiry($input: EnquiryInput!) {
    submitEnquiry(input: $input) {
      success
      enquiryId
      message
    }
  }
`;

const FOLLOW_SERVICE = `
  mutation FollowService($id: String!, $userId: String) {
    followService(id: $id, userId: $userId) {
      success
      followId
      message
    }
  }
`;

// API Functions
const getAllServices = async (): Promise<Service[]> => {
  try {
    const data = await graphqlClient.query(GET_ALL_SERVICES);
    return data.servicesList || [];
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
};

const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const data = await graphqlClient.query(GET_SERVICE_BY_ID, { id });
    return data.serviceById || null;
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    throw error;
  }
};

const getServicesByCategory = async (category: string): Promise<Service[]> => {
  try {
    const data = await graphqlClient.query(GET_SERVICES_BY_CATEGORY, { category });
    return data.servicesByCategory || [];
  } catch (error) {
    console.error('Error fetching services by category:', error);
    throw error;
  }
};

const getServicesByTag = async (tag: string): Promise<Service[]> => {
  try {
    const data = await graphqlClient.query(GET_SERVICES_BY_TAG, { tag });
    return data.servicesByTag || [];
  } catch (error) {
    console.error('Error fetching services by tag:', error);
    throw error;
  }
};

const submitEnquiry = async (input: {
  serviceId: string;
  userEmail: string;
  userName: string;
  message: string;
}) => {
  try {
    const data = await graphqlClient.query(SUBMIT_ENQUIRY, { input });
    return data.submitEnquiry;
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw error;
  }
};

const followService = async (id: string, userId?: string) => {
  try {
    const data = await graphqlClient.query(FOLLOW_SERVICE, { id, userId });
    return data.followService;
  } catch (error) {
    console.error('Error following service:', error);
    throw error;
  }
};

// Compatibility functions to match existing API structure
const getServices = getAllServices;
const getFeatureServices = () => getServicesByTag('feature');
const getPopularServices = () => getServicesByTag('popular');
const getLatestServices = () => getServicesByTag('latest');

export default {
  getAllServices,
  getServiceById,
  getServicesByCategory,
  getServicesByTag,
  submitEnquiry,
  followService,
  // Compatibility exports
  getServices,
  getFeatureServices,
  getPopularServices,
  getLatestServices,
};