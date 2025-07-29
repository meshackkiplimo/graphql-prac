// API FUNCTIONS
import api from "@utils/__api__/market-1";
// PAGE SECTION COMPONENTS
import Section1 from "@sections/enquiries/Section1";
import Section2 from "@sections/enquiries/Section2";
import Section3 from "@sections/enquiries/Section3";
import Section4 from "@sections/enquiries/Section4";
import Section5 from "@sections/enquiries/Section5";
import Section6 from "@sections/enquiries/Section6";
import Section7 from "@sections/enquiries/Section7";
import Section8 from "@sections/enquiries/Section8";

import Section14 from "@sections/enquiries/Section14";

import { Button } from "react-scroll";
import FlexBox from "@component/FlexBox";

export default async function Market1() {
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const mobileList = await api.getMobileList();
  const opticsList = await api.getOpticsList();
  const mobileShops = await api.getMobileShops();
  const opticsShops = await api.getOpticsShops();
  const mobileBrands = await api.getMobileBrands();
  const opticsBrands = await api.getOpticsBrands();

  return (
    <main>
      {/* HERO CAROUSEL AREA */}
      <Section1 />
      <Section14 />
      <Section7

      />
    </main>
  );
}
