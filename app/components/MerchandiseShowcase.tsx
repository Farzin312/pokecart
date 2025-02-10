'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const merchandiseItems = [
  {
    pokemon: 'Pikachu',
    merchandise: 'Plushies',
    image: '/merchandise/pikachu-plushies.jpg',
    link: 'https://www.amazon.com/Pok%C3%A9mon-Happy-Pikachu-Stuffed-Animal/dp/B09RBJ9D1B?content-id=amzn1.sym.c5787da2-212d-48eb-a894-9ea5a87adeb3%3Aamzn1.sym.c5787da2-212d-48eb-a894-9ea5a87adeb3&cv_ct_cx=Pikachu+Plushies&keywords=Pikachu+Plushies&pd_rd_i=B09RBJ9D1B&pd_rd_r=35984e59-f50b-4bf3-a28d-782a14f2a7d0&pd_rd_w=XeCGC&pd_rd_wg=C8aZB&pf_rd_p=c5787da2-212d-48eb-a894-9ea5a87adeb3&pf_rd_r=CCJ46RFN6AX8HWVREE42&qid=1739148626&s=toys-and-games&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-1-6024b2a3-78e4-4fed-8fed-e1613be3bcce-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&psc=1&linkCode=ll1&tag=10212013-20&linkId=40650c5845ae5435a316af147cf61a49&language=en_US&ref_=as_li_ss_tl'
  },
  {
    pokemon: 'Charizard',
    merchandise: 'Figurine',
    image: '/merchandise/charizard-figurine.jpg',
    link: 'https://www.amazon.com/Pokemon-Deluxe-Collector-Figure-Style/dp/B0BRT5XYZS?dib=eyJ2IjoiMSJ9.G6CE5JGEgZQ7PUb2rUY-ql5H7lbGK5b_NatNaAbjoBwI6W8FR_F9ElxsnLTOynHPuyrivUPuiWcoNtGTsshLUxlnRxEBXZa0T510q6Jk5lHe8rh1Pcl1dUSbCdRbxs3jS00q132ALbPwoRPxdnziMrOefaJ_bbzKWoSr_ruIScBgDBvy5SMX4sY82JRzjQ5sMHS7Kkk87LIPgZiOX1i57t3BEholAT5nf8q2m9KEXNl4yDWlmRs3VzbyQ9836L2y13QKxI0XQ5aq5HbIt4iW3ojBtnaMyvVRQO-uzG4zdU1Pm-9MZLulzzEq6OawD_lCrZ6j_jEqMUOREBOIr_TUzCdlI1_34Xpgsdg3X7QFGg4.hLokqZ_ssxuoQsN4AL2PYQunXzpSR2H_8RliTMF9RwE&dib_tag=se&keywords=Charizard+Figurine&qid=1739148709&s=toys-and-games&sr=1-10&ufe=app_do%3Aamzn1.fos.9fe8cbfa-bf43-43d1-a707-3f4e65a4b666&linkCode=ll1&tag=10212013-20&linkId=69b3860134954b2998be2cf95264b792&language=en_US&ref_=as_li_ss_tl'
  },
  {
    pokemon: 'Bulbasaur',
    merchandise: 'Pokemon Card',
    image: '/merchandise/bulbasaur-card.jpg',
    link: 'https://www.amazon.com/Venusaur-003-165-Charmander-Charmeleon/dp/B0CKW4SNCV?dib=eyJ2IjoiMSJ9.JTJmCDWqgzSwqop_i19CNhJRfXBvzySli6aPZkcCtmkC9SaWprmBY0NvpDkC4QOAXybQd5PVvGxY9jnjJ2w85C3Dz3KK8QoEVFret_frgjmmH_HJC4bAINC4Es-6zkD0olOKTCxzfqXIbs7PmLs4tJ-cdyimFuuryMisWyz64c_huGsVnyH8xP075ftZxcn5caxW2MzE42dFKpwC6QbekuXLzQikr0zUdMoeynntQ-c0NGoTsKAl14OIc1_b5SRUZ8DbT4xd1mKHA9Uxv-TjE03sv3ID95_HqOZmUpwVMsRiPW3cUTcVe-UHmkI0YO1bi33Z0H8y0kxmi6Ir5bdqLk3Z6hqlUUMC9lxqMxdrU_A.pj8ukEkIYCMAVt0lGURfgavb9-ZM-7z6AKhUw2cZgRg&dib_tag=se&keywords=Bulbasaur+Pokemon+Card&qid=1739148745&s=toys-and-games&sr=1-6&linkCode=ll1&tag=10212013-20&linkId=659564ad3c35b87d89eff4a367e75828&language=en_US&ref_=as_li_ss_tl'
  },
  {
    pokemon: 'Dragonite',
    merchandise: 'Squishmallows',
    image: '/merchandise/dragonite-squishmallows.jpg',
    link: 'https://www.amazon.com/s?k=Dragonite+Squishmallows&i=toys-and-games&linkCode=ll2&tag=10212013-20&linkId=41169fe13d5e983d7e2a70c855ac910d&language=en_US&ref_=as_li_ss_tl'
  },
  {
    pokemon: 'Snorlax',
    merchandise: 'Nanoblock',
    image: '/merchandise/snorlax-nanoblock.jpg',
    link: 'https://www.amazon.com/Kawada-NBPM%E2%80%91012-Pok%C3%A9mon-Micro-Sized-Building/dp/B00SKGUPT2?dib=eyJ2IjoiMSJ9.aVA7GdwURbM4e5jRbQoIDnXZrD8vkF1dDTHk78JDhHGSKCewNgRI0TdNGYJmdwjJDmdon8lfsMSVTMIfVoYpLT8BKkdLgeBOMI_FgCsQZXUNADSLkQHyl8hyed75NE4hyGR_IdtwLn7Euu2MQLB0qKOXP4vODSbRf7Aq4K70Y61eIY2da9CHKagU0SJQ2by3KdeUGZvKaE6WjJzQ_1OZFR58evSqrpyZYqgszD3FUktb3GNjvoDCYsh9-_cORrrqzDkidK7p7gif8hIn3p7BeE4jQ5B0nsxSP_CIkBLNUrY.xUWfB-LyBWiWHiGTxWkAJSKMWPi_z513nqI-TY5XkfE&dib_tag=se&keywords=Snorlax+Nanoblock&qid=1739148823&s=toys-and-games&sr=1-1&linkCode=ll1&tag=10212013-20&linkId=315deb2d881d24a5354735d0818d5ddf&language=en_US&ref_=as_li_ss_tl'
  },
  {
    pokemon: 'Eevee',
    merchandise: 'Funko Pop',
    image: '/merchandise/evee-funkopop.jpg',
    link: 'https://www.amazon.com/Funko-Pop-Games-Pokemon-Eevee/dp/B081TQYG3N?dib=eyJ2IjoiMSJ9.gckB8WVaEE1r7Sd1scnq5sJ-wv7iqKr3Yqy0wsHYT5vpFyt8Gpfrp5A7IM_SRdt_K7Z1e-J7TZI8BTXIeVtxKUDoC7RFRdFwuBNsO1gfyEKyULPOCnnGNzlgi77FguzpWhEsbTGnOGFD671sx_uZPQQFZgjFxZB6uvSMW7q4Ly1Rt3sdKX6oT4xfuLyVS6YWod0mExT4J3Q8ruGeWNpinsYlw9ywEfFqGt-o4ablxMi27Z-zAVAr_jOkPV4TJ1nG-pfJRwSX9T_meJFYTBUZr-5YDVFaTKYltCZRY7Sw4gmmHLH-TBmwMeKjVVstjR-0g0PijJ6ND4HWEPSVHw6190LphQHvN8AsVQK_gC4gex4.OHJrMBAib0ExL7eY0L1CeN9K5QKLVPz-rxNLZlJvZ-A&dib_tag=se&keywords=Eevee%2BFunko%2BPop&qid=1739148848&s=toys-and-games&sr=1-5&th=1&linkCode=ll1&tag=10212013-20&linkId=2b7f6e11e99864b40bc0c96022616924&language=en_US&ref_=as_li_ss_tl'
  },
];

function MerchandiseShowcase() {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = 1;

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < merchandiseItems.length - itemsPerView) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <section className="w-full py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          🎁 Merchandise <span className="text-yellow-500">Showcase</span> 🛍️
        </h2>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {merchandiseItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={`${item.pokemon} ${item.merchandise}`}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{item.pokemon}</h3>
                <p className="text-gray-600">{item.merchandise}</p>
                <p className="mt-2 text-yellow-600 font-semibold">Buy on Amazon →</p>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Carousel Layout */}
        <div className="block lg:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {merchandiseItems.map((item, index) => (
                <div key={index} className="min-w-full bg-white flex-shrink-0 shadow hover:shadow-lg rounded-lg px-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={`${item.pokemon} ${item.merchandise}`}
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-bold text-gray-800">{item.pokemon}</h3>
                      <p className="text-gray-600">{item.merchandise}</p>
                      <p className="mt-2 text-yellow-600 font-semibold">Buy on Amazon →</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {activeIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {activeIndex < merchandiseItems.length - itemsPerView && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default MerchandiseShowcase;
