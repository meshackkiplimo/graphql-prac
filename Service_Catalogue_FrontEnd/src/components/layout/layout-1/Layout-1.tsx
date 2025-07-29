"use client";

import { ReactElement, ReactNode } from "react";

import Topbar from "@component/topbar";
import Sticky from "@component/sticky";
import { Header } from "@component/header";
import { Footer1 } from "@component/footer";
import MobileNavigationBar from "@component/mobile-navigation";
import StyledAppLayout from "./styles";

// ===============================================================================
type Props = { title?: string; navbar?: ReactElement; children: ReactNode };
// ===============================================================================

export default function ShopLayout({ navbar, children }: Props) {
  return (
    <StyledAppLayout
      style={{
        backgroundColor: "#fff",
        backgroundSize: "cover",
      }}
    >
      {/* <Topbar /> */}

      {/* <Sticky fixedOn={0} scrollDistance={300}>
        <Header />
      </Sticky> */}

      {navbar ? <div className="section-after-sticky">{navbar}</div> : null}
      {navbar ? (
        children
      ) : (
        <div className="section-after-sticky">{children}</div>
      )}

      <MobileNavigationBar />

      <Footer1 />
    </StyledAppLayout>
  );
}
