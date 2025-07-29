import Shop from "./shop.model";
import Review from "./Review.model";

interface Product {
  unit?: any;
  slug: string;
  price: number;
  title: string;
  rating: number;
  discount: number;
  thumbnail: string;
  id: string;
  shop?: {
    id: string;
    slug: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
    coverPicture: string;
    socialLinks: {
      facebook?: string | null;
      twitter?: string | null;
      youtube?: string | null;
      instagram?: string | null;
    };
  };
  brand?: string;
  size?: string[];
  status?: string;
  colors?: string[];
  images?: string[];
  categories: any[];
  reviews?: Review[];
  published?: boolean;
}

export default Product;
