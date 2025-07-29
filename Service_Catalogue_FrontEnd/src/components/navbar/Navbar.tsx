"use client";

import Box from "../Box";
import Card from "../Card";
import Badge from "../badge";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import Container from "../Container";
import Typography, { Span } from "../Typography";
import Categories from "../categories/Categories";
import Image from "../Image";

import StyledNavbar from "./styles";
import navbarNavigations from "@data/navbarNavigations";
import { SearchInput } from "@component/search-box";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import path from "path";

// ==============================================================
interface Nav {
  url: string;
  child?: Nav[];
  title: string;
  badge?: string;
  isIcon?: boolean;
  extLink?: boolean;
}

type NavbarProps = { navListOpen?: boolean };
// ==============================================================

export default function Navbar({ navListOpen }: NavbarProps) {
  const [navVisible, setNavVisible] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);
  const renderNestedNav = (list: any[], isRoot = false) => {
    return list?.map((nav: Nav) => {
      if (isRoot) {
        if (nav.isIcon) {
          return (
            <div
              className="cursor-pointer"
              key={nav.title}
              onClick={() => {
                if (nav.title === "search") {
                  setNavVisible(false);
                  setShowSearch(true);
                  console.log("hide nav");
                }
              }}
            >
              {" "}
              <Icon size="1.25rem">{nav.title}</Icon>
            </div>
          );
        }

        if (nav.url && nav.extLink) {
          return (
            <NavLink
              href={nav.url}
              key={nav.title}
              target="_blank"
              className="nav-link"
              rel="noopener noreferrer"
            >
              {nav.badge ? (
                <Badge
                  style={{ marginRight: "0px", border: "2px solid red" }}
                  title={nav.badge}
                >
                  {nav.title}
                </Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        }

        if (nav.child) {
          return (
            <FlexBox className="root" position="relative" key={nav.title}>
              <Span className="nav-link">{nav.title}</Span>
              <div className="root-child">
                {nav.child.map((child: Nav) => (
                  <NavLink href={child.url} key={child.title}>
                    <Span className="nav-link">{child.title}</Span>
                  </NavLink>
                ))}
              </div>
            </FlexBox>
          );
        }

        if (nav.url) {
          return (
            <NavLink className="nav-link" href={nav.url} key={nav.title}>
              {nav.badge ? (
                <Badge title={nav.badge}>{nav.title}</Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        }
      }
      return null;
    });
  };
  const router = usePathname();
  const hideButtonOnPages = ["/enquiries"]; // Define pages where the button should be hidden
  return (
    <StyledNavbar style={{ height: "80px" }}>
      <Container
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FlexBox alignItems="center">
          <NavLink href="/">
            <Image
              src="/assets/images/DFSA/DFSA_Logo.png"
              alt="DFSA logo"
              height={40}
            />
          </NavLink>
        </FlexBox>

        <FlexBox style={{ gap: 32 }}>
          {navVisible ? (
            renderNestedNav(navbarNavigations, true)
          ) : (
            <SearchInput />
          )}
        </FlexBox>
        <FlexBox style={{ gap: "1rem" }}>
          <Button
            bg="white"
            style={{ color: "#9B1823" }}
            variant="contained"
            size="medium"
            border="1px solid #9B1823"
            borderRadius="10px"
            height={40}
          >
            Sign in
          </Button>
          {!hideButtonOnPages.includes(router) && (
            <Link href="/enquiries">
              <Button
                bg="#9B1823"
                color="primary"
                variant="contained"
                size="medium"
                borderRadius="10px"
                height={40}
              >
                Make an Enquiry
              </Button>
            </Link>
          )}
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
}
