"use client";

import { useEffect, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import Typography, { H1, H3, H4, Span } from "@component/Typography";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import serviceCatalogueApi from "@utils/__api__/service-catalogue";
import Navbar from "@component/navbar/Navbar";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
  const categories = ["all", ...Array.from(new Set(services.map(service => service.category)))];

  // Filter services based on selected category
  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

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
      <Navbar />
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

      {/* Category Filter */}
      <Box mb="2rem">
        <FlexBox justifyContent="center" flexWrap="wrap">
          {categories.map((category, index) => (
            <Box key={category} mr={index < categories.length - 1 ? "1rem" : "0"} mb="0.5rem">
              <Button
                variant={selectedCategory === category ? "contained" : "outlined"}
                color="primary"
                onClick={() => setSelectedCategory(category)}
                style={{ textTransform: "capitalize" }}
              >
                {category === "all" ? "All Services" : category}
              </Button>
            </Box>
          ))}
        </FlexBox>
      </Box>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <FlexBox justifyContent="center" alignItems="center" minHeight="200px">
          <Typography fontSize="16px" color="text.muted">
            No services found in this category.
          </Typography>
        </FlexBox>
      ) : (
        <Grid container spacing={6}>
          {filteredServices.map((service) => (
            <Grid item lg={4} md={6} xs={12} key={service.id}>
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
    </Container>
  );
}
