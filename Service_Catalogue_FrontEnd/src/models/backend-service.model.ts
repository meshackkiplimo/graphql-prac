// Backend Service model matching the GraphQL schema
interface BackendService {
  id: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  description: string;
  targetStakeholder: string;
  createdAt: string;
  updatedAt: string;
}

export default BackendService;