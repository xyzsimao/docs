"use client"

import FeatureDivider from "./FeatureDivider";
import Features from "./Features";
import Footer from "./footer";
import { Hero } from "./Hero";
import Testimonial from "./Testimonial";

 
import {Map} from "./Map";
import { SolarAnalytics } from "./SolarAnalytics";
import CallToAction from "./CallToAction";
 

export default function Page() {
 
  return (
    <div className="px-4 xl:px-0">
    <main className="relative mx-auto flex flex-col">
      <div className="pt-56">
        <Hero />
      </div>
            <div className="mt-52 px-4 xl:px-0">
        <Features />
      </div>
            <div className="mt-32 px-4 xl:px-0">
        <Testimonial />
      </div>

            <FeatureDivider className="my-16 max-w-6xl" />
      <div className="px-4 xl:px-0">
        <Map />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
            <div className="mt-12 mb-40 px-4 xl:px-0">
        <SolarAnalytics />
      </div>
      <div className="mt-10 mb-40 px-4 xl:px-0">
        <CallToAction />
      </div>
      </main>
      <Footer />
   
    </div>
  );
}
