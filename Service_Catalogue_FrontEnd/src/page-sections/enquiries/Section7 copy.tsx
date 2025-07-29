
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

// Categories and other constants
const categories = [
  {
    name: "Authorised Persons",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Authorised Individuals",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Investment Funds",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Securities & Crypto",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Fintech & Innovation",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "DNFBPs",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Professional Advisors",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Recognised Entities",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Auditors",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
];

const serviceTypes = [
  { id: "enquiries", label: "Enquiries" },
  { id: "withdrawal", label: "Withdrawal" },
  { id: "extension", label: "Extension" },
  { id: "amendment", label: "Amendment" },
  { id: "renewal", label: "Renewal" },
  { id: "new_application", label: "New Application" },
];

const serviceCategories = [
  { id: "market", label: "Market" },
  { id: "enforcements", label: "Enforcements" },
  { id: "compliance", label: "Compliance" },
  { id: "licensing", label: "Licensing" },
];

interface Props {}

export default function Section7({}: Props) {
  const [filters, setFilters] = useState({
    entityType: null,
    serviceTypes: {
      enquiries: false,
      withdrawal: false,
      extension: false,
      amendment: false,
      renewal: false,
      new_application: false,
    },
    serviceCategories: {
      licensing: false,
      compliance: false,
      enforcements: false,
      market: false,
    },
    processingTime: 14,
  });
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const GET_PRODUCTS = gql`
    query {
      products(options: { take: 9 }) {
        items {
          id
          name
          slug
          description
          facetValues {
            id
            code
            name
            facet {
              id
              code
              name
            }
          }
          customFields {
            serviceType
            serviceCategory
            entityType
            processingTime
            audience
            requiredDocuments
            procedures
            fees
            serviceChannels
            termsAndConditionsUrl
            slaDetails
            contactEmail
            status
            businessStage
            tags
            partnerAgency
            relatedServices {
              id
              name
            }
          }
          createdAt
          updatedAt
        }
        totalItems
      }
    }
  `;

  const [fetchProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log("Fetched Data:", data?.products.items);
  const servicesData = data?.products.items;

  const filteredServices = useMemo(() => {
    if (!servicesData) return [];
    console.log("Filters:", filters);
    console.log("Services Data:", servicesData);

    const isAnyFilterApplied =
      filters.entityType ||
      Object.values(filters.serviceTypes).some((value) => value) ||
      Object.values(filters.serviceCategories).some((value) => value) ||
      filters.processingTime !== 14;

    if (!isAnyFilterApplied) {
      console.log("No filters applied, returning all services");
      return servicesData;
    }

    return servicesData.filter((service) => {
      const { customFields } = service;

      // Normalize for case-insensitive comparison
      const normalize = (str) => (str ? str.toLowerCase() : "");
      
      // Entity Type Filter
      const entityMatch =
        !filters.entityType ||
        normalize(customFields.entityType) === normalize(filters.entityType) ||
        (Array.isArray(customFields.entityType) &&
          customFields.entityType.some(
            (type) => normalize(type) === normalize(filters.entityType)
          ));

      // Service Type Filter
      const selectedServiceTypes = Object.keys(filters.serviceTypes).filter(
        (key) => filters.serviceTypes[key]
      );
      const serviceTypeMatch =
        selectedServiceTypes.length === 0 ||
        selectedServiceTypes.includes(normalize(customFields.serviceType));

      // Service Category Filter
      const selectedServiceCategories = Object.keys(filters.serviceCategories).filter(
        (key) => filters.serviceCategories[key]
      );
      const categoryMatch =
        selectedServiceCategories.length === 0 ||
        selectedServiceCategories.includes(normalize(customFields.serviceCategory));

      // Processing Time Filter
      const timeMatch =
        !customFields.processingTime ||
        customFields.processingTime <= filters.processingTime;

      console.log(`Service: ${service.name}`, {
        entityMatch,
        serviceTypeMatch,
        categoryMatch,
        timeMatch,
      });

      return entityMatch && serviceTypeMatch && categoryMatch && timeMatch;
    });
  }, [filters, servicesData]);

  const handleEntity = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      entityType: prev.entityType === categoryName ? null : categoryName,
    }));
    setFiltersApplied(true);
  };

  const handleChildClick = (childName: string) => {
    setFilters((prev) => ({
      ...prev,
      entityType: prev.entityType === childName ? null : childName,
    }));
    setFiltersApplied(true);
  };

  const handleServiceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Service Type Change:", event.target.name, event.target.checked);
    setFilters((prev) => {
      const newServiceTypes = {
        ...prev.serviceTypes,
        [event.target.name]: event.target.checked,
      };
      console.log("Updated Service Types:", newServiceTypes);
      return {
        ...prev,
        serviceTypes: newServiceTypes,
      };
    });
    setFiltersApplied(true);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Service Category Change:", event.target.name, event.target.checked);
    setFilters((prev) => {
      const newServiceCategories = {
        ...prev.serviceCategories,
        [event.target.name]: event.target.checked,
      };
      console.log("Updated Service Categories:", newServiceCategories);
      return {
        ...prev,
        serviceCategories: newServiceCategories,
      };
    });
    setFiltersApplied(true);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setFilters((prev) => ({
      ...prev,
      processingTime: newValue as number,
    }));
    setFiltersApplied(true);
  };

  return (
    <Container mb="70px">
      <FlexBox>
        {/* Filter section */}
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="#FCF6F5">
            {/* Entity Type */}
            <FlexBox mt="0.5rem" mb="0.5rem">
              <Typography fontWeight="600" fontSize="20px" padding="0.5rem 1rem" color="#B82932">
                Entity Type
              </Typography>
            </FlexBox>
            {categories.map((category, i) => (
              <StyledProductCategory key={i}>
                <div className="accordion_summary" onClick={() => handleEntity(category.name)}>
                  <Typography color="black" fontSize="16px" fontWeight="400">
                    {category.name}
                  </Typography>
                  <IoIosArrowDown />
                </div>
                {filters.entityType === category.name && (
                  <div className="accordion_children">
                    {category.children.map((child, index) => (
                      <p
                        key={index}
                        onClick={() => handleChildClick(child.name)}
                        className={filters.entityType === child.name ? "active" : ""}
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
            <FlexBox mt="0.5rem" mb="0.5rem" flexDirection="column">
              <Typography fontWeight="600" fontSize="20px" padding="0.5rem 1rem" color="#B82932">
                Service Type
              </Typography>
              <FormGroup style={{ padding: "0.5rem 1rem" }}>
                {serviceTypes.map((service) => (
                  <FormControlLabel
                    key={service.id}
                    control={
                      <Checkbox
                        checked={filters.serviceTypes[service.id]}
                        onChange={handleServiceTypeChange}
                        name={service.id} // Fixed: Use id instead of label
                        sx={{
                          color: "black",
                          "&.Mui-checked": { color: "#A39161" },
                        }}
                      />
                    }
                    label={
                      <Typography
                        fontSize="16px"
                        fontWeight={filters.serviceTypes[service.id] ? 700 : 400}
                        color={filters.serviceTypes[service.id] ? "#A39161" : "black"}
                      >
                        {service.label}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </FlexBox>
            <HrSeparator />
            {/* Service Category */}
            <FlexBox mt="0.5rem" mb="0.5rem" flexDirection="column">
              <Typography fontWeight="600" fontSize="20px" padding="0.5rem 1rem" color="#B82932">
                Service Category
              </Typography>
              <FormGroup style={{ padding: "0.5rem 1rem" }}>
                {serviceCategories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        checked={filters.serviceCategories[category.id]}
                        onChange={handleCategoryChange}
                        name={category.id} // Fixed: Use id instead of label
                        sx={{
                          color: "black",
                          "&.Mui-checked": { color: "#A39161" },
                        }}
                      />
                    }
                    label={
                      <Typography
                        fontSize="16px"
                        fontWeight={filters.serviceCategories[category.id] ? 700 : 400}
                        color={filters.serviceCategories[category.id] ? "#A39161" : "black"}
                      >
                        {category.label}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </FlexBox>
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

        {loading ? (
          <div style={{ textAlign: "center" }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: "center" }}>Error: {error.message}</div>
        ) : (
          <Box flex="1 1 0" minWidth="0px">
            {filteredServices.length === 0 && filtersApplied ? (
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
                  >
                    Load More
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
