import React from "react";
import LPHeader from "../Components/LPHeader.js"
import LPAbout from "../Components/LPAbout.js";
import LPDiscover from "../Components/LPDiscover.js";
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