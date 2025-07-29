"use client";

import { useEffect, useState, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography, { H3 } from "@component/Typography";
import { gql, useLazyQuery } from "@apollo/client";
import { StyledProductCategory, HrSeparator } from "./styled";
import { Button } from "@component/buttons";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Slider from "@mui/material/Slider";
import { SearchInput } from "@component/search-box";

// Filter options
const categories = [
  { name: "Authorised Persons", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
  { name: "Authorised Individuals", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
  { name: "Investment Funds", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
  { name: "Securities & Crypto", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
  { name: "Fintech & Innovation", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
  { name: "DNFBPs", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
  { name: "Professional Advisors", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
  { name: "Recognised Entities", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
  { name: "Auditors", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
];

const serviceTypes = [
  { id: "enquiries", label: "Enquiries", value: "Enquiries" },
  { id: "withdrawal", label: "Withdrawal", value: "Withdrawal" },
  { id: "extension", label: "Extension", value: "Extension" },
  { id: "amendment", label: "Amendment", value: "Amendment" },
  { id: "renewal", label: "Renewal", value: "Renewal" },
  { id: "new_application", label: "New Application", value: "New Application" },
];

const serviceCategories = [
  { id: "market", label: "Market", value: "Market" },
  { id: "enforcements", label: "Enforcements", value: "Enforcements" },
  { id: "compliance", label: "Compliance", value: "Compliance" },
  { id: "licensing", label: "Licensing", value: "Licensing" },
];

export default function Section7() {
  const [searchFilters, setSearchFilters] = useState<{
    serviceType?: string | null;
    serviceCategory?: string | null;
  }>({ serviceType: null, serviceCategory: null });

  // State to track filters
  const [filters, setFilters] = useState({
    entityType: null, // e.g., "Authorised Firms"
    serviceTypes: [], // e.g., ["amendment", "renewal"]
    serviceCategories: [], // e.g., ["licensing", "market"]
    processingTime: 1, // Max days
  });

  // State for hover effect
  const [hoveredServiceId, setHoveredServiceId] = useState(null);
  const [skip, setSkip] = useState(0);

  // Fetch data
  const GET_PRODUCTS = gql`
    query GetProducts($skip: Int!) {
      products(options: { skip: $skip, take: 9, sort: { id: ASC } }) {
        items {
          id
          name
          slug
          description
          customFields {
            serviceType
            serviceCategory
            entityType
            processingTime
            tags
          }
        }
        totalItems
      }
    }
  `;

  const [fetchProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS, {
    variables: { skip },
  });

  useEffect(() => {
    fetchProducts({ variables: { skip } });
  }, [skip]);

  const servicesData = data?.products.items || [];
  const totalItems = data?.products.totalItems || 0;
  const allItemsLoaded = skip + 9 >= totalItems;

  // Filter services
  const filteredServices = useMemo(() => {
    if (!servicesData) return [];

    console.log("Filters:", filters);

    // If no filters, return all services
    if (
      !filters.entityType &&
      filters.serviceTypes.length === 0 &&
      filters.serviceCategories.length === 0 &&
      filters.processingTime === 1
    ) {
      return servicesData;
    }

    return servicesData.filter((service) => {
      const { customFields } = service;

      // Normalize for case-insensitive comparison
      const normalize = (str) => (str || "").toLowerCase();

      // Entity Type
      const entityMatch =
        !filters.entityType ||
        normalize(customFields.entityType) === normalize(filters.entityType);

      // Service Type: Map UI IDs to customFields values
      const selectedServiceTypeValues = filters.serviceTypes.map(
        (id) => serviceTypes.find((st) => st.id === id)?.value
      );
      const serviceTypeMatch =
        filters.serviceTypes.length === 0 ||
        selectedServiceTypeValues.includes(customFields.serviceType);

      // Service Category: Map UI IDs to customFields values
      const selectedServiceCategoryValues = filters.serviceCategories.map(
        (id) => serviceCategories.find((sc) => sc.id === id)?.value
      );
      const categoryMatch =
        filters.serviceCategories.length === 0 ||
        selectedServiceCategoryValues.includes(customFields.serviceCategory);

      // Processing Time: Parse "12 Days" to 12
      const processingTime = parseInt((customFields.processingTime || "").split(" ")[0], 10);
      const timeMatch = !customFields.processingTime || processingTime <= filters.processingTime;

      console.log(`Service: ${service.name}`, {
        entityMatch,
        serviceTypeMatch,
        categoryMatch,
        timeMatch,
      });

      return entityMatch && serviceTypeMatch && categoryMatch && timeMatch;
    });
  }, [filters, servicesData]);

  // Handlers
  const handleEntity = (categoryName) => {
    setFilters((prev) => ({
      ...prev,
      entityType: prev.entityType === categoryName ? null : categoryName,
    }));
  };

  const handleChildClick = (childName) => {
    setFilters((prev) => ({
      ...prev,
      entityType: prev.entityType === childName ? null : childName,
    }));
  };

  const handleServiceTypeChange = (event) => {
    const { name, checked } = event.target;
    console.log("Service Type:", { name, checked });
    setFilters((prev) => ({
      ...prev,
      serviceTypes: checked
        ? [...prev.serviceTypes, name]
        : prev.serviceTypes.filter((type) => type !== name),
    }));
  };

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    console.log("Service Category:", { name, checked });
    setFilters((prev) => ({
      ...prev,
      serviceCategories: checked
        ? [...prev.serviceCategories, name]
        : prev.serviceCategories.filter((category) => category !== name),
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      processingTime: newValue,
    }));
  };

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + 9);
  };

  return (
    <Container mb="70px">
      <FlexBox>
        {/* Filters */}
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="#FCF6F5">
            {/* Search Box */}
     

            {/* Entity Type */}
            <Typography fontWeight="600" fontSize="20px" padding="0.5rem 1rem" color="#B82932">
              Entity Type
            </Typography>
            {categories.map((category, i) => (
              <StyledProductCategory key={i}>
                <div className="accordion_summary" onClick={() => handleEntity(category.name)}>
                  <Typography fontSize="16px">{category.name}</Typography>
                  <IoIosArrowDown />
                </div>
                {filters.entityType === category.name && (
                  <div className="accordion_children">
                    {category.children.map((child, index) => (
                      <p
                        key={index}
                        onClick={() => handleChildClick(child.name)}
                        style={{
                          color: filters.entityType === child.name ? "#A39161" : "inherit",
                          fontWeight: filters.entityType === child.name ? "bold" : "normal",
                        }}
                      >
                        {child.name}
                      </p>
                    ))}
                  </div>
                )}
              </StyledProductCategory>
            ))}
            <HrSeparator />

            {/* Service Type */}
            <Typography fontWeight="600" fontSize="20px" padding="0.5rem 1rem" color="#B82932">
              Service Type
            </Typography>
            <FormGroup style={{ padding: "0.5rem 1rem" }}>
              {serviceTypes.map((service) => (
                <FormControlLabel
                  key={service.id}
                  control={
                    <Checkbox
                      checked={filters.serviceTypes.includes(service.id)}
                      onChange={handleServiceTypeChange}
                      name={service.id}
                      sx={{ color: "black", "&.Mui-checked": { color: "#A39161" } }}
                    />
                  }
                  label={<Typography fontSize="16px">{service.label}</Typography>}
                />
              ))}
            </FormGroup>
            <HrSeparator />

            {/* Service Category */}
            <Typography fontWeight="600" fontSize="20px" padding="0.5rem 1rem" color="#B82932">
              Service Category
            </Typography>
            <FormGroup style={{ padding: "0.5rem 1rem" }}>
              {serviceCategories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      checked={filters.serviceCategories.includes(category.id)}
                      onChange={handleCategoryChange}
                      name={category.id}
                      sx={{ color: "black", "&.Mui-checked": { color: "#A39161" } }}
                    />
                  }
                  label={<Typography fontSize="16px">{category.label}</Typography>}
                />
              ))}
            </FormGroup>
            <HrSeparator />

            {/* Processing Timeline */}
            <FlexBox mt="0.5rem" mb="0.5rem" flexDirection="column">
              <Typography fontWeight="600" fontSize="20px" padding="0.5rem 1rem" color="#B82932" marginBottom="2rem">
                Processing Timeline
              </Typography>
              <FlexBox style={{ padding: "0.5rem 1rem", flexDirection: "column", alignItems: "center" }}>
                <div style={{ position: "relative", width: "100%" }}>
                  <Slider
                    value={filters.processingTime}
                    min={0}
                    max={60}
                    onChange={handleSliderChange}
                    sx={{
                      color: "#b82932",
                      "& .MuiSlider-track": { background: "#b82932", border: "none" },
                      "& .MuiSlider-rail": { backgroundColor: "rgba(184, 41, 50, 0.35)" },
                      "& .MuiSlider-thumb": { border: "3px solid #b82932", backgroundColor: "white" },
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "-30px",
                      left: `calc(${(filters.processingTime / 60) * 100}% - 20px)`,
                      transform: "translateX(-20%)",
                      backgroundColor: "#A39161",
                      color: "white",
                      padding: "5px 6px",
                      borderRadius: "5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {filters.processingTime} Days
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <span>0</span>
                  <span>60</span>
                </div>
              </FlexBox>
            </FlexBox>
          </Box>
        </Hidden>

        {/* Services */}
        {loading ? (
          <div style={{ textAlign: "center" }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: "center" }}>Error: {error.message}</div>
        ) : (
          <Box flex="1 1 0" minWidth="0px">
            {filteredServices.length === 0 ? (
              <Typography textAlign="center" mt="2rem">
                No services match the selected filters.
              </Typography>
            ) : (
<>
<Grid container spacing={6}>
                {filteredServices.map((item) => (
                    <Grid item lg={4} sm={6} xs={12} key={item.id}>
                    <Box
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "10px",
                        height: "400px",
                        backgroundImage: `url("assets/images/DFSA/Social-icons.png")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                      onMouseEnter={() => setHoveredServiceId(item.id)}
                      onMouseLeave={() => setHoveredServiceId(null)}
                    >
                      {hoveredServiceId === item.id ? (
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          bottom="0"
                          padding="1rem"
                          bg="rgba(0, 0, 0, 0.5)"
                          color="white"
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-end"
                          zIndex="20"
                          style={{ gap: "1.5rem" }}
                        >
                          <Typography>
                            <H3>{item.name}</H3>
                          </Typography>
                          <Typography>{item.description}</Typography>
                          <Button
                            bg="#9B1823"
                            color="primary"
                            variant="contained"
                            size="medium"
                            borderRadius="10px"
                            width="60%"
                            padding="10px 24px"
                          >
                            Learn more
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          bottom="0"
                          padding="1rem"
                          bg="rgba(0, 0, 0, 0.5)"
                          color="white"
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-end"
                          style={{ gap: "37px" }}
                        >
                          <Typography
                            style={{
                              marginBottom: "0.5rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "normal",
                              height: "3em",
                              lineHeight: "1.5em",
                            }}
                          >
                            <H3>{item.name}</H3>
                          </Typography>
                          <FlexBox flexWrap="wrap">
                            {item.customFields.tags?.slice(0, 2).map((tag, index) => (
                              <Typography
                                key={index}
                                variant="body2"
                                marginRight="0.5rem"
                                width="93px"
                                style={{
                                  border: "1px solid white",
                                  borderRadius: "5px",
                                  padding: "0.2rem 0.5rem",
                                  marginBottom: "0.5rem",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  textAlign: "center",
                                }}
                              >
                                {tag.length > 10 ? `${tag.substring(0, 10)}...` : tag}
                              </Typography>
                            ))}
                          </FlexBox>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
                    <FlexBox marginTop={"2rem"} justifyContent="center">
                    <Button
                      bg="#9B1823"
                      borderRadius="0.7rem"
                      color="primary"
                      variant="contained"
                      size="medium"
                      onClick={handleLoadMore}
                      disabled={allItemsLoaded}
                      style={{
                        backgroundColor: allItemsLoaded ? "#ccc" : "#9B1823",
                        cursor: allItemsLoaded ? "not-allowed" : "pointer",
                      }}
                    >
                      {allItemsLoaded ? "No More Items" : "Load More"}
                    </Button>
                  </FlexBox>
</>
            )}
          </Box>
        )}
      </FlexBox>
    </Container>
  );
}