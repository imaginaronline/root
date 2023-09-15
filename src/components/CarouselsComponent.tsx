import preview from '../assets/Preview.png'
import next from '../assets/Next.png'
import OwlCarousel from 'react-owl-carousel';

import { ReactNode } from 'react';

interface CarasoulProps {
  children: ReactNode; // The type ReactNode allows any valid React content as children
  itemsCount: number;
}

function CarausolComponent({ children, itemsCount,  }: CarasoulProps) {

    const owlCarouselOptions = {
        items: itemsCount,
        margin: 20,
        loop: false,
        nav: true, // Display navigation arrows
        responsive: {
            0: {
                items: 1, // Number of items at 0-767px screen width
            },
            768: {
                items: 2, // Number of items at 768px and above screen width
            },
            992: {
                items: 3, // Number of items at 992px and above screen width
            },
            1200: {
                items: 4, // Number of items at 1200px and above screen width
            },
        },
        navText: [
            `<img src=${preview} alt="Previous" />`, // Custom preview button
            `<img src=${next} alt="Next" />`, // Custom next button
        ],
    };

    return (
        <>
            <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
                {children}
            </OwlCarousel>
        </>
    )
}

export default CarausolComponent;