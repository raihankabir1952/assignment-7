// import Image from "next/image";
import Hero from "@/components/Hero";
import TodayPriceUp from "@/components/TodayPriceUp";
import TodayPriceDown from "@/components/TodayPriceDown";
import AllProducts from "@/components/AllProducts";

export default function Home() {
  return (
    <div >
      <Hero></Hero>
      <TodayPriceUp></TodayPriceUp>
      <div></div>
      <TodayPriceDown></TodayPriceDown>
      <div></div>
      <AllProducts></AllProducts>

    </div>
  );
}
