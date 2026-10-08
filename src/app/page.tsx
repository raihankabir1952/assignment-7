import Image from "next/image";
import Hero from "@/components/Hero";
import TodayPriceUp from "@/components/TodayPriceUp";

export default function Home() {
  return (
    <div >
      <Hero></Hero>
      <TodayPriceUp></TodayPriceUp>
    </div>
  );
}
