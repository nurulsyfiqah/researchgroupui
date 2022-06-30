import React from "react";
import LPHeader from "../Components/LandingPage/LPHeader.js"
import LPAbout from "../Components/LandingPage/LPAbout.js";
import LPDiscover from "../Components/LandingPage/LPDiscover.js";
import Footer from "../Components/Footer.js";

export default function LandingPage() {
    return (
        <div>
           <LPHeader />
           <LPAbout />
           <LPDiscover />
           <Footer />
        </div>
    )
}