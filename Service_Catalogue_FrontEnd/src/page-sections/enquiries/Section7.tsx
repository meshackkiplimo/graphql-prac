"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography, { H3 } from "@component/Typography";
// import { gql, useLazyQuery } from "@apollo/client";
import { StyledProductCategory, HrSeparator } from "./styled";
import { Button } from "@component/buttons";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Slider from "@mui/material/Slider";

// Filter options
const categories = [
  { name: "Authorised Entities", children: [{ name: "Authorised Firms" }, { name: "Authorised Market Institutions" }] },
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
  { id: "new_application", label: "New Application", value: "New Application" },
  { id: "renewal", label: "Renewal", value: "Renewal" },
  { id: "amendment", label: "Amendment", value: "Amendment" },
  { id: "extension", label: "Extension", value: "Extension" },
  { id: "withdrawal", label: "Withdrawal", value: "Withdrawal" },
  { id: "enquiries", label: "Enquiries", value: "Enquiries" },
];

// Dummy data based on Figma design
const dummyServicesData = [
  {
    id: 1,
    name: "General Enquiry",
    slug: "general-enquiry",
    description: "Get answers to your general questions about DFSA services, regulations, and processes. Our team is here to help with any inquiries you may have.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Licensing",
      entityType: "Authorised Firms",
      processingTime: "5 Days",
      tags: ["Enquiry", "Other"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/general-enquiry.png"
  },
  {
    id: 2,
    name: "Authorisation & Registration Enquiry",
    slug: "authorisation-registration-enquiry",
    description: "Learn about the authorisation and registration processes for financial services firms in the DIFC. Get guidance on requirements and procedures.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Licensing",
      entityType: "Authorised Firms",
      processingTime: "7 Days",
      tags: ["Enquiry", "Authorisation"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/authorization-registration.png"
  },
  {
    id: 3,
    name: "Supervision Enquiry",
    slug: "supervision-enquiry",
    description: "Get information about DFSA supervision requirements, compliance obligations, and regulatory expectations for supervised entities.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Compliance",
      entityType: "Authorised Firms",
      processingTime: "3 Days",
      tags: ["Enquiry", "Compliance"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/supervision.png"
  },
  {
    id: 4,
    name: "Enforcement Enquiry",
    slug: "enforcement-enquiry",
    description: "Understand DFSA enforcement procedures, breach reporting requirements, and compliance investigation processes.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Enforcements",
      entityType: "Authorised Firms",
      processingTime: "10 Days",
      tags: ["Enquiry", "Breach"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/enforcement.png"
  },
  {
    id: 5,
    name: "Policy & Rules",
    slug: "policy-rules",
    description: "Access information about DFSA policies, rulebooks, and regulatory guidance. Stay updated with the latest regulatory developments.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Market",
      entityType: "Authorised Firms",
      processingTime: "2 Days",
      tags: ["Enquiry", "Rulebook"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/policy-rules.png"
  },
  {
    id: 6,
    name: "Innovation",
    slug: "innovation",
    description: "Explore DFSA's innovation initiatives, fintech regulatory framework, and support for emerging financial technologies in the DIFC.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Market",
      entityType: "Fintech & Innovation",
      processingTime: "15 Days",
      tags: ["Enquiry", "ITL"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/innovation.png"
  },
  {
    id: 7,
    name: "Complaints",
    slug: "complaints",
    description: "Submit and track complaints about financial services firms or individuals. Learn about the complaint resolution process and your rights.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Enforcements",
      entityType: "Authorised Firms",
      processingTime: "20 Days",
      tags: ["Enquiry", "Authorisation"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/complaints.png"
  },
  {
    id: 8,
    name: "Whistleblowing",
    slug: "whistleblowing",
    description: "Report concerns about potential breaches of DFSA rules or regulations. Learn about whistleblower protections and reporting procedures.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Enforcements",
      entityType: "Authorised Firms",
      processingTime: "30 Days",
      tags: ["Enquiry", "Reporting"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/whistleblowing.png"
  },
  {
    id: 9,
    name: "News & Press",
    slug: "news-press",
    description: "Stay informed with the latest DFSA news, press releases, regulatory updates, and important announcements affecting the financial services sector.",
    customFields: {
      serviceType: "Enquiries",
      serviceCategory: "Market",
      entityType: "Authorised Firms",
      processingTime: "1 Days",
      tags: ["Enquiry", "Updates"]
    },
    backgroundImage: "assets/images/DFSA/enquiries/news-press.png"
  }
];

const serviceCategories = [
  { id: "licensing", label: "Licensing", value: "Licensing" },
  { id: "compliance", label: "Compliance", value: "Compliance" },
  { id: "enforcements", label: "Enforcements", value: "Enforcements" },
  { id: "market", label: "Market", value: "Market" },
];

export default function Section7() {
  const router = useRouter();

  // State to track filters
  const [filters, setFilters] = useState({
    entityType: null,
    serviceTypes: [],
    serviceCategories: [],
    processingTime: 1,
  });

  // State for hover effect and mobile filters
  const [hoveredServiceId, setHoveredServiceId] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);

  // Use dummy data instead of API
  const servicesData = dummyServicesData;
  const totalItems = dummyServicesData.length;
  const allItemsLoaded = displayCount >= totalItems;

  // Filter services and limit display count
  const filteredServices = useMemo(() => {
    if (!servicesData) return [];

    let filtered = servicesData;

    // Apply filters only if they are set
    if (
      filters.entityType ||
      filters.serviceTypes.length > 0 ||
      filters.serviceCategories.length > 0 ||
      filters.processingTime > 1
    ) {
      filtered = servicesData.filter((service) => {
        const { customFields } = service;
        const normalize = (str) => (str || "").toLowerCase();

        const entityMatch =
          !filters.entityType ||
          normalize(customFields.entityType) === normalize(filters.entityType);

        const selectedServiceTypeValues = filters.serviceTypes.map(
          (id) => serviceTypes.find((st) => st.id === id)?.value
        );
        const serviceTypeMatch =
          filters.serviceTypes.length === 0 ||
          selectedServiceTypeValues.includes(customFields.serviceType);

        const selectedServiceCategoryValues = filters.serviceCategories.map(
          (id) => serviceCategories.find((sc) => sc.id === id)?.value
        );
        const categoryMatch =
          filters.serviceCategories.length === 0 ||
          selectedServiceCategoryValues.includes(customFields.serviceCategory);

        const processingTime = parseInt((customFields.processingTime || "").split(" ")[0], 10);
        const timeMatch = !customFields.processingTime || processingTime <= filters.processingTime;

        return entityMatch && serviceTypeMatch && categoryMatch && timeMatch;
      });
    }

    // Limit to display count
    return filtered.slice(0, displayCount);
  }, [filters, servicesData, displayCount]);

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
    setFilters((prev) => ({
      ...prev,
      serviceTypes: checked
        ? [...prev.serviceTypes, name]
        : prev.serviceTypes.filter((type) => type !== name),
    }));
  };

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
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
    setDisplayCount((prevCount) => Math.min(prevCount + 9, totalItems));
  };

  // Navigation handler for Learn more button
  const handleLearnMore = (slug) => {
    router.push(`/enquiries/${slug}`);
  };

  // Filter component for reuse
  const FilterContent = () => (
    <Box shadow={6} borderRadius={10} padding="1.25rem" bg="#FCF6F5">
      {/* Entity Type */}
      <Typography fontWeight="600" fontSize="18px" padding="0.5rem 1rem" color="#B82932">
        Entity Type
      </Typography>
      {categories.map((category, i) => (
        <StyledProductCategory key={i}>
          <div className="accordion_summary" onClick={() => handleEntity(category.name)}>
            <Typography fontSize="16px" padding="0rem 0.5rem">{category.name}</Typography>
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

      {/* Service Category */}
      <Typography fontWeight="600" fontSize="18px" padding="0.5rem 1rem" marginTop={24} color="#B82932">
        Service Category
      </Typography>
      <FormGroup style={{ padding: "0.5rem 1rem", marginBottom: "20px" }}>
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
            label={<Typography fontSize="16px" fontFamily="inherit">{category.label}</Typography>}
          />
        ))}
      </FormGroup>
      <HrSeparator className="mt-40"/>

      {/* Service Type */}
      <Typography fontWeight="600" fontSize="18px" padding="0.5rem 1rem" marginTop={24} color="#B82932">
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

      {/* Processing Timeline */}
      <FlexBox my={32} flexDirection="column">
        <Typography fontWeight="600" fontSize="18px" padding="0.5rem 1rem" color="#B82932" marginBottom="2rem">
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
  );

  return (
    <Container mb="70px">
      {/* Mobile Filter Toggle Button */}
      <Box display={{ xs: "block", md: "none" }} mb="1rem">
        <Button
          bg="#B82932"
          color="primary"
          variant="contained"
          size="medium"
          borderRadius="10px"
          width="100%"
          padding="12px 24px"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          style={{ color: "white" }}
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </Box>

      {/* Mobile Filters Dropdown */}
      {showMobileFilters && (
        <Box display={{ xs: "block", md: "none" }} mb="2rem">
          <FilterContent />
        </Box>
      )}

      <FlexBox flexDirection={{ xs: "column", md: "row" }}>
        {/* Desktop Filters Sidebar */}
        <Hidden down={768} mr={{ md: "1.75rem", lg: "1.75rem" }}>
          <Box 
            minWidth={{ md: "280px", lg: "320px" }}
            maxWidth={{ md: "280px", lg: "320px" }}
          >
            <FilterContent />
          </Box>
        </Hidden>

        {/* Services Grid */}
        <Box flex="1 1 0" minWidth="0px">
          {filteredServices.length === 0 ? (
            <Typography textAlign="center" mt="2rem" fontSize="18px">
              No services match the selected filters.
            </Typography>
          ) : (
            <>
              <Grid container spacing={4}>
                {filteredServices.map((item) => (
                  <Grid item xl={4} lg={4} md={6} sm={6} xs={12} key={item.id}>
                    <Box
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "10px",
                        height: "400px",
                        backgroundImage: `url("${item.backgroundImage || 'assets/images/DFSA/Social-icons.png'}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setHoveredServiceId(item.id)}
                      onMouseLeave={() => setHoveredServiceId(null)}
                    >
                        {/* Default State */}
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
                          style={{
                            gap: "37px",
                            transition: "opacity 0.3s ease-in-out",
                            opacity: hoveredServiceId === item.id ? 0 : 1,
                          }}
                        >
                          <Typography
                            style={{
                              marginBottom: "0.5rem",
                              textOverflow: "ellipsis",
                              whiteSpace: "normal",
                              height: "3em",
                              lineHeight: "24px",
                            }}
                          >
                            <H3 fontSize="20px">{item.name}</H3>
                          </Typography>
                          <FlexBox flexWrap="wrap" style={{ gap: "0.5rem" }}>
                            {item.customFields.tags?.slice(0, 2).map((tag, index) => (
                              <Typography
                                key={index}
                                variant="body2"
                                fontSize="14px"
                                style={{
                                  border: "1px solid white",
                                  borderRadius: "5px",
                                  padding: "0.2rem 0.5rem",
                                  marginBottom: "0.5rem",
                                  textAlign: "center",
                                  whiteSpace: "nowrap",
                                  display: "inline-block",
                                  flexShrink: 0,
                                }}
                              >
                                {tag}
                              </Typography>
                            ))}
                          </FlexBox>
                        </Box>

                        {/* Hover State */}
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          bottom="0"
                          padding="1rem"
                          bg="rgba(0, 0, 0, 0.7)"
                          color="white"
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-end"
                          zIndex="20"
                          style={{
                            gap: "1.5rem",
                            transform: hoveredServiceId === item.id ? "translateY(0)" : "translateY(100%)",
                            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          <Typography>
                            <H3 fontSize="20px">{item.name}</H3>
                          </Typography>
                          <Typography
                            fontSize="16px"
                            style={{
                              opacity: hoveredServiceId === item.id ? 1 : 0,
                              transition: "opacity 0.5s ease-in-out 0.1s",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {item.description}
                          </Typography>
                          <Button
                            bg="#9B1823"
                            color="primary"
                            variant="contained"
                            size="medium"
                            borderRadius="10px"
                            width="70%"
                            padding="10px 24px"
                            onClick={() => handleLearnMore(item.slug)}
                            style={{
                              transform: hoveredServiceId === item.id ? "translateY(0)" : "translateY(20px)",
                              opacity: hoveredServiceId === item.id ? 1 : 0,
                              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                            }}
                          >
                            Learn more
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                {/* <FlexBox 
                  marginTop="2rem"
                  justifyContent="center"
                  px="1rem"
                >
                  <Button
                    bg="#9B1823"
                    borderRadius="0.7rem"
                    color="primary"
                    variant="contained"
                    size="medium"
                    onClick={handleLoadMore}
                    disabled={allItemsLoaded}
                    width="100%"
                    padding="14px 28px"
                    style={{
                      backgroundColor: allItemsLoaded ? "#ccc" : "#9B1823",
                      cursor: allItemsLoaded ? "not-allowed" : "pointer",
                      maxWidth: "300px",
                    }}
                  >
                    {allItemsLoaded ? "No More Items" : "Load More"}
                  </Button>
                </FlexBox> */}
              </>
            )}
          </Box>
      </FlexBox>
    </Container>
  );
}