import axios from "@lib/axios";
import { graphqlClient } from "@lib/graphql";
import Blog from "models/blog.model";
import Brand from "models/Brand.model";
import Product from "models/product.model";
import Service from "models/service.model";
import Category from "models/category.model";
import MainCarouselItem from "models/market-1.model";
import serviceCatalogueApi from "./service-catalogue";

const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products");
  return response.data;
};

const getFeatureProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=feature");
  return response.data;
};

const getSaleProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=sale");
  return response.data;
};

const getPopularProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=popular");
  return response.data;
};

const getLatestProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=latest");
  return response.data;
};

const getBestWeekProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=best-week");
  return response.data;
};

const getBlogs = async (): Promise<Blog[]> => {
  const response = await axios.get("/api/fashion-shop-2/blogs");
  return response.data;
};

const getServices = async (): Promise<Service[]> => {
  try {
    // Try to get real services from backend first
    return await serviceCatalogueApi.getAllServices();
  } catch (error) {
    console.warn('Failed to fetch services from backend, falling back to mock data:', error);
    // Fallback to mock data if backend is not available
    const response = await axios.get("/api/fashion-shop-2/service");
    return response.data;
  }
};

const getCategories = async (): Promise<Category[]> => {
  try {
    // Try to get unique categories from services
    const services = await serviceCatalogueApi.getAllServices();
    const uniqueCategories = [...new Set(services.map(service => service.category))];
    
    // Transform to Category model format
    const categories: Category[] = uniqueCategories.map((categoryName, index) => ({
      id: `cat-${index + 1}`,
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
      // Add other category properties as needed
    }));
    
    return categories;
  } catch (error) {
    console.warn('Failed to fetch categories from backend, falling back to mock data:', error);
    // Fallback to mock data if backend is not available
    const response = await axios.get("/api/fashion-shop-2/category");
    return response.data;
  }
};

const getMainCarouselData = async (): Promise<MainCarouselItem[]> => {
  const response = await axios.get("/api/fashion-shop-2/main-carousel");
  return response.data;
};

const getBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/fashion-shop-2/brands");
  return response.data;
};

export default {
  getBlogs,
  getBrands,
  getProducts,
  getServices,
  getCategories,
  getSaleProducts,
  getLatestProducts,
  getPopularProducts,
  getFeatureProducts,
  getBestWeekProducts,
  getMainCarouselData
};
