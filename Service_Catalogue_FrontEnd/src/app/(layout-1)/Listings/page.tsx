// API FUNCTIONS
import api from "@utils/__api__/market-1";
// PAGE SECTION COMPONENTS
import Section1 from "@sections/market-1/Section1";

import Section15 from "@sections/market-1/Section15";
import Section16 from "@sections/market-1/Section16";

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
      <Section15 />
      <Section16 />
    </main>
  );
}
