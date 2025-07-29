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
import { StyledProductCategory, HrSeparator, ChatbotLauncher } from "./styled";
import { Button } from "@component/buttons";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Slider from "@mui/material/Slider";
import ListingCard from "@component/product-cards/ListingCard";
import SearchInput1 from "@component/search-box/SearchInput1";
import Image from "next/image";

// Categories and other constants
const categories = [
  {
    name: "Firms",
    children: [
      { name: "Authorized Firms" },
      { name: "Recognised Auditors" },
      { name: "Recognised Members" },
      { name: "External Fund Manager" },
      { name: "DNFBP" },
      { name: "Authorised Market Institutions" },
      { name: "Ancillary Service Providers" },
    ],
  },
  {
    name: "Delisted Securities",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Securities",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Funds",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Restricted Individuals",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
  {
    name: "Individuals",
    children: [
      { name: "Authorized Firms" },
      { name: "Authorized Market Institutions" },
    ],
  },
];

const serviceTypes = [
  { id: "active", label: "Active" },
  { id: "withdrawn/revoked", label: "Withdrawn/Revoked" },
];

interface Props {}

export default function Section16({}: Props) {
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
      const selectedServiceCategories = Object.keys(
        filters.serviceCategories
      ).filter((key) => filters.serviceCategories[key]);
      const categoryMatch =
        selectedServiceCategories.length === 0 ||
        selectedServiceCategories.includes(
          normalize(customFields.serviceCategory)
        );

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

  const handleServiceTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(
      "Service Type Change:",
      event.target.name,
      event.target.checked
    );
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
    console.log(
      "Service Category Change:",
      event.target.name,
      event.target.checked
    );
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
  const listings = [
    {
      id: 1,
      name: "Julius Baer (Middle East) Limited",
      referenceNumber: "F000001",
      slug: "julius-baer-middle-east-limited",
      tags: ["Authorised Firms", "Active"],
    },
    {
      id: 2,
      name: "Standard Chartered Bank",
      referenceNumber: "F000003",
      slug: "standard-chartered-bank",
      tags: ["Authorised Firms", "Active"],
    },
    {
      id: 3,
      name: "Barclays Bank PLC",
      referenceNumber: "F000013",
      slug: "barclays-bank-plc",
      tags: ["Authorised Firms", "Active"],
    },
    {
      id: 4,
      name: "AIG MEA Limited",
      referenceNumber: "F000010",
      slug: "aig-mea-limited",
      tags: ["Authorised Firms", "Active"],
    },
    {
      id: 5,
      name: "Nasdaq Dubai",
      referenceNumber: "F000026",
      slug: "nasdaq-dubai",
      tags: ["Authorised Firms", "Active"],
    },
    {
      id: 6,
      name: "Ernst & Young Middle East (Dubai Branch)",
      referenceNumber: "F000031",
      slug: "ernst-young-middle-east",
      tags: ["Authorised Firms", "Active"],
    },
    {
      id: 7,
      name: "Julius Baer (Middle East) Limited",
      referenceNumber: "F000001",
      slug: "julius-baer-middle-east-limited-2",
      tags: ["Authorised Firms", "Active"],
    },
    {
      id: 8,
      name: "Standard Chartered Bank",
      referenceNumber: "F000003",
      slug: "standard-chartered-bank-2",
      tags: ["Authorised Firms", "Active"],
    },
    {
      id: 9,
      name: "Barclays Bank PLC",
      referenceNumber: "F000013",
      slug: "barclays-bank-plc-2",
      tags: ["Authorised Firms", "Active"],
    },
  ];
  return (
    <Container mb="70px">
      <FlexBox>
        {/* Filter section */}
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="#FCF6F5">
            {/* Entity Type */}
            <div style={{ padding: "0.5rem 1rem" }}>
              <SearchInput1 />
            </div>
            <FlexBox mt="0.5rem" mb="0.5rem">
              <Typography
                fontWeight="600"
                fontSize="20px"
                padding="0.5rem 1rem"
                color="#B82932"
              >
                Listing Category
              </Typography>
            </FlexBox>
            {categories.map((category, i) => (
              <StyledProductCategory key={i} mb="0.5rem">
                <div
                  className="accordion_summary"
                  onClick={() => handleEntity(category.name)}
                >
                  <Typography color="black" fontSize="16px" fontWeight="400">
                    {category.name}
                  </Typography>
                  <IoIosArrowDown
                    style={{
                      transform:
                        filters.entityType === category.name
                          ? "rotate(0deg)"
                          : "rotate(-90deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </div>
                {filters.entityType === category.name && (
                  <div className="accordion_children">
                    {category.children.map((child, index) => (
                      <p
                        key={index}
                        onClick={() => handleChildClick(child.name)}
                        className={
                          filters.entityType === child.name ? "active" : ""
                        }
                        style={{
                          color:
                            filters.entityType === child.name
                              ? "#A39161"
                              : "inherit",
                          fontWeight:
                            filters.entityType === child.name
                              ? "bold"
                              : "normal",
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
              <Typography
                fontWeight="600"
                fontSize="20px"
                padding="0.5rem 1rem"
                color="#B82932"
              >
                Regulatory Status
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
                        fontWeight={
                          filters.serviceTypes[service.id] ? 700 : 400
                        }
                        color={
                          filters.serviceTypes[service.id] ? "#A39161" : "black"
                        }
                      >
                        {service.label}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </FlexBox>
          </Box>
        </Hidden>

        <Box flex="1 1 0" minWidth="0px">
          <>
            <Grid container spacing={6} md={4} sm={6} xs={12}>
              {listings.map((listing) => (
                <Grid item xl={4} lg={4} md={6} sm={6} xs={12} key={listing.id}>
                  <ListingCard
                    key={listing.id}
                    name={listing.name}
                    slug={listing.slug}
                    referenceNumber={listing.referenceNumber}
                    tags={listing.tags}
                    id={listing.id}
                  />
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
        </Box>
      </FlexBox>
      <ChatbotLauncher style={{}}>
        <span>Ask AI</span>
        <Image
          width={24}
          height={24}
          src="/assets/images/icons/ai1.svg"
          alt="ai"
        />
      </ChatbotLauncher>
    </Container>
  );
}
