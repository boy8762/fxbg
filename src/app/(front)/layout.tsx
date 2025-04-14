// import SiteFooter from '@/components/main/site-footer';
// import SiteHeader from '@/components/main/site-header';
// import TelegramFloat from '@/components/telegramFloat';
// const FrontLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="min-h-screen">
//       <SiteHeader />
//       <main>{children}</main>
//       <SiteFooter />
      
//     </div>
//   );
// };

// export default FrontLayout;

import SiteFooter from '@/components/main/site-footer';
import SiteHeader from '@/components/main/site-header';
import TelegramFloat from '@/components/telegramFloat';

const FrontLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen relative">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <TelegramFloat />
    </div>
  );
};

export default FrontLayout;
