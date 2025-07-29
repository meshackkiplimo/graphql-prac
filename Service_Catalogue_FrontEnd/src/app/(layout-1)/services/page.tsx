"use client";

import { useEffect, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import Typography, { H1, H3, H4, H5, Span } from "@component/Typography";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import CheckBox from "@component/CheckBox";
import serviceCatalogueApi from "@utils/__api__/service-catalogue";
import Navbar from "@component/navbar/Navbar";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await serviceCatalogueApi.getAllServices();
        setServices(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Get unique categories from services
  const categories = Array.from(new Set(services.map(service => service.category))).filter(Boolean);

  // Filter services based on selected categories and search query
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(service.category);
    const matchesSearch = searchQuery === "" || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.tags && service.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  if (loading) {
    return (
      <Container my="2rem">
        
        <FlexBox justifyContent="center" alignItems="center" minHeight="400px">
          <Typography fontSize="18px">Loading services...</Typography>
        </FlexBox>
      </Container>
    );
  }

  if (error) {
    return (
      <Container my="2rem">
        <FlexBox justifyContent="center" alignItems="center" minHeight="400px" flexDirection="column">
          <Typography fontSize="18px" color="error.main" mb="1rem">
            {error}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </FlexBox>
      </Container>
    );
  }

  return (
    <Container my="2rem">
      <Navbar/>
      {/* Header Section */}
      <Box mb="3rem" textAlign="center">
        <H1 mb="1rem" color="primary.main">
          Our Services
        </H1>
        <Typography fontSize="18px" color="text.muted" maxWidth="600px" mx="auto">
          Discover the comprehensive range of services offered by DFSA to support
          and regulate the financial sector in Dubai.
        </Typography>
      </Box>

      {/* Main Content with Sidebar */}
      <Grid container spacing={4}>
        {/* Left Sidebar */}
        <Grid item lg={3} md={4} xs={12}>
          <Card p="1.5rem" height="fit-content" position="sticky" top="2rem">
            {/* Search Box */}
            <Box mb="2rem">
              <H5 mb="1rem" color="primary.main">Search Services</H5>
              <TextField
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullwidth
                size="small"
              />
            </Box>

            {/* Category Filters */}
            <Box mb="2rem">
              <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
                <H5 color="primary.main">Categories</H5>
                {selectedCategories.length > 0 && (
                  <Button
                    variant="text"
                    size="small"
                    color="primary"
                    onClick={clearAllFilters}
                    style={{ fontSize: "12px", padding: "0.25rem 0.5rem" }}
                  >
                    Clear All
                  </Button>
                )}
              </FlexBox>
              
              <Box>
                {categories.map((category) => (
                  <CheckBox
                    key={category}
                    my="0.75rem"
                    color="primary"
                    size={16}
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                    label={
                      <Typography
                        fontSize="14px"
                        style={{ textTransform: "capitalize" }}
                        color="inherit"
                      >
                        {category}
                      </Typography>
                    }
                  />
                ))}
              </Box>
            </Box>

            {/* Filter Summary */}
            <Box p="1rem" bg="gray.100" borderRadius="8px">
              <Typography fontSize="12px" color="text.muted" mb="0.5rem">
                Showing {filteredServices.length} of {services.length} services
              </Typography>
              {selectedCategories.length > 0 && (
                <Typography fontSize="12px" color="primary.main">
                  Filtered by: {selectedCategories.join(", ")}
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Right Content - Services Grid */}
        <Grid item lg={9} md={8} xs={12}>
          {filteredServices.length === 0 ? (
            <FlexBox justifyContent="center" alignItems="center" minHeight="300px" flexDirection="column">
              <Typography fontSize="18px" color="text.muted" mb="1rem">
                No services found matching your criteria.
              </Typography>
              <Button variant="outlined" color="primary" onClick={clearAllFilters}>
                Clear Filters
              </Button>
            </FlexBox>
          ) : (
            <Grid container spacing={4}>
              {filteredServices.map((service) => (
                <Grid item lg={6} md={12} xs={12} key={service.id}>
                  <Card 
                    p="1.5rem" 
                    height="100%" 
                    display="flex" 
                    flexDirection="column"
                    boxShadow="border"
                    hoverEffect
                  >
                    {/* Service Header */}
                    <Box mb="1rem">
                      <FlexBox justifyContent="space-between" alignItems="flex-start" mb="0.5rem">
                        <H4 color="primary.main" lineHeight="1.3">
                          {service.title}
                        </H4>
                      </FlexBox>
                      
                      <FlexBox mb="1rem">
                        <Box
                          bg="primary.light"
                          color="primary.main"
                          px="0.75rem"
                          py="0.25rem"
                          borderRadius="20px"
                          fontSize="12px"
                          fontWeight="600"
                          mr="0.5rem"
                        >
                          {service.category}
                        </Box>
                        <Box
                          bg="gray.200"
                          color="text.secondary"
                          px="0.75rem"
                          py="0.25rem"
                          borderRadius="20px"
                          fontSize="12px"
                        >
                          {service.targetStakeholder}
                        </Box>
                      </FlexBox>
                    </Box>

                    {/* Service Content */}
                    <Box flex="1" mb="1rem">
                      <Typography 
                        fontSize="14px" 
                        color="text.muted" 
                        lineHeight="1.6"
                        mb="1rem"
                      >
                        {service.summary}
                      </Typography>

                      {service.tags && service.tags.length > 0 && (
                        <FlexBox flexWrap="wrap">
                          {service.tags.slice(0, 3).map((tag, index) => (
                            <Span
                              key={index}
                              fontSize="11px"
                              color="text.secondary"
                              bg="gray.100"
                              px="0.5rem"
                              py="0.125rem"
                              borderRadius="12px"
                              mr="0.25rem"
                              mb="0.25rem"
                            >
                              {tag}
                            </Span>
                          ))}
                          {service.tags.length > 3 && (
                            <Span
                              fontSize="11px"
                              color="text.secondary"
                              bg="gray.100"
                              px="0.5rem"
                              py="0.125rem"
                              borderRadius="12px"
                              mr="0.25rem"
                              mb="0.25rem"
                            >
                              +{service.tags.length - 3} more
                            </Span>
                          )}
                        </FlexBox>
                      )}
                    </Box>

                    {/* Service Footer */}
                    <Box>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small"
                        fullwidth
                        onClick={() => {
                          // Navigate to service detail or enquiry
                          window.location.href = `/enquiries?service=${service.id}`;
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Call to Action */}
          <Box mt="4rem" textAlign="center" p="2rem" bg="gray.100" borderRadius="8px">
            <H3 mb="1rem" color="primary.main">
              Need More Information?
            </H3>
            <Typography fontSize="16px" color="text.muted" mb="2rem" maxWidth="500px" mx="auto">
              Can't find what you're looking for? Contact us directly for personalized assistance
              with your regulatory needs.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => {
                window.location.href = "/enquiries";
              }}
            >
              Make an Enquiry
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
