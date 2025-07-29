import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

import Box from "@component/Box";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import MenuItem from "@component/MenuItem";
import { Button } from "@component/buttons";
import { Span } from "@component/Typography";
import TextField from "@component/text-field";
import SearchBoxStyle from "./styled";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../lib/apollo-client";
import FlexBox from "@component/FlexBox";

interface Suggestion {
  id: string;
  name: string;
  slug: string;
  customFields: {
    category?: string;
    serviceType?: string;
    serviceCategory?: string;
  };
}

interface ProductsResponse {
  products: {
    items: Suggestion[];
  };
}

interface SearchInputProps {
  onFilterSelected?: (filters: {
    serviceType?: string;
    serviceCategory?: string;
  }) => void;
}

export default function SearchInput({ onFilterSelected }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultList, setResultList] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const GET_SUGGESTIONS = gql`
    query GetSuggestions($searchTerm: String) {
      products(
        options: {
          filter: {
            _or: [
              { serviceCategory: { contains: $searchTerm } }
              { name: { contains: $searchTerm } }
              { description: { contains: $searchTerm } }
              { serviceType: { contains: $searchTerm } }
            ]
          }
          take: 5
        }
      ) {
        items {
          id
          name
          slug
          description
          customFields {
            serviceCategory
            serviceType
          }
        }
      }
    }

  `;

  const { loading, error } = useQuery<ProductsResponse>(
    GET_SUGGESTIONS,
    {
      variables: { searchTerm },
      client,
      skip: !searchTerm,
      onCompleted: (data) => {
        setResultList(data.products.items);
        setShowSuggestions(true);
      },
      onError: (error) => {
        console.error("GraphQL Query Error:", error);
      }
    }
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
  }, []);

  const handleDocumentClick = (e: MouseEvent) => {
    const searchBox = e.target as HTMLElement;
    if (!searchBox.closest('.search-box')) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    
    if (onFilterSelected) {
      onFilterSelected({
        serviceType: suggestion.customFields?.serviceType,
        serviceCategory: suggestion.customFields?.serviceCategory
      });
    }
  };

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <SearchBoxStyle>
        <Icon className="search-icon" size="18px">
          search
        </Icon>
  


        <TextField
          fullwidth
          onChange={handleSearch}
          className="search-field"
          placeholder="Search and hit enter..."
        />

        <Button
          className="search-button"
          variant="contained"
          color="primary"
          style={{ background: "#9B1823" }}
        >
          Search
        </Button>

        <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box>
      </SearchBoxStyle>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
            <MenuItem key={item.id} onClick={() => handleSuggestionClick(item)}>
              <FlexBox alignItems="center" justifyContent="space-between" width="100%">
                <FlexBox alignItems="center" style={{gap:"10px"}}>
                  <Span fontSize="14px">{item.name}</Span>
           
                </FlexBox>
                {item.customFields?.serviceCategory && (
                  <Span fontSize="12px" color="primary" fontWeight="600">
                    {item.customFields.serviceCategory}
                  </Span>
                )}
              </FlexBox>
            </MenuItem>
          ))}
        </Card>
      )}
    </Box>
  );
}

const dummySearchResult = [
  "Macbook Air 13",
  "Ksus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];
