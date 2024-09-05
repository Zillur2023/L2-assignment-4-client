import React from "react";
import { Link } from "react-router-dom";

interface SpecialSectionProps {
  title: string;
  paragraph: string;
  imageSrc: string;
  categoryId: string;
  imagePosition?: "left" | "right"; // New prop for controlling image position
}

const SpecialSection: React.FC<SpecialSectionProps> = ({
  title,
  paragraph,
  imageSrc,
  categoryId,
  imagePosition = "right", // Default position is right
}) => {
  const isImageLeft = imagePosition === "left"; // Determine if the image should be on the left

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 shadow-2xl rounded-3xl px-6 py-12 sm:px-16 lg:flex lg:gap-x-20 lg:px-24 lg:py-16">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Main Container Flex for Responsive Layout */}
          <div
            className={`flex flex-col-reverse lg:flex-row ${isImageLeft ? "lg:flex-row-reverse" : ""
              }`}
          >
            {/* Text Section */}
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left lg:px-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">{paragraph}</p>

              <div className="mt-10 flex items-center justify-center lg:justify-start">
                <Link
                  to={`/productByCategory/${categoryId}`}
                  className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-md hover:bg-gray-100 transition duration-200"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center mb-8 lg:mb-0 lg:mr-10">
              <img
                alt="Product"
                src={imageSrc}
                className="w-full max-w-xs rounded-lg shadow-lg ring-1 ring-white/10 lg:max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialSection;
