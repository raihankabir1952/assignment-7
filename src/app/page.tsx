import Image from "next/image";
import Hero from "@/components/Hero";
import TodayPriceUp from "@/components/TodayPriceUp";
import TodayPriceDown from "@/components/TodayPriceDown";

export default function Home() {
  return (
    <div >
      <Hero></Hero>
      <TodayPriceUp></TodayPriceUp>
      <div>
        
      </div>
      <TodayPriceDown></TodayPriceDown>

    </div>
  );
}
