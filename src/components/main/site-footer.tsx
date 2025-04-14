// import React from "react";
// import { siteConfig } from "@/configs/site";

// const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

// const SiteFooter = () => {
//   return (
//     <footer aria-label="Footer">
// <h2 className="text-center text-white py-7 text-sm">Copyright 2025 | {SITE_NAME} </h2>
//     </footer>
//   );
// };

// export default SiteFooter;


import React from 'react';
import { siteConfig } from '@/configs/site';
import { Icons } from '@/components/icons'; // Assuming you have an Icons component for the DMCA icon
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

const SiteFooter = () => {
  return (
    <footer aria-label="Footer" className="bg-gradient-to-t from-secondary to-transparent py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-white text-sm sm:text-base">
            &copy; 2025 {SITE_NAME}. All rights reserved.
          </h2>

          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://www.dmca.com/Protection/Status.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm hover:text-primary transition-colors"
            >
              <Icons.logo className="inline-block mr-2 h-5 w-5 text-white" /> {/* DMCA Icon */}
              DMCA Notice
            </a>
            <span className="text-white text-sm">|</span>
            <a
              href="https://www.example.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm hover:text-primary transition-colors"
            >
             Important Notice: NetPrime does not host any content. We are an aggregator that provides links to media hosted by third-party services.

All copyright complaints must be directed to the appropriate content providers that we used in our players.
            </a>
            <span className="text-white text-sm">|</span>
            <a
              href="https://www.example.com/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
