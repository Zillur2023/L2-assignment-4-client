import bannerImg from "../../assets/HOMEPAGE_clubseriesplus-cardio_021224.webp";

export default function Banner() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 mb-6">
      <img
        alt="Fitness Equipment Banner"
        src={bannerImg}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Elevate Your Fitness Journey
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover top-quality fitness equipment and accessories designed to
            enhance your workouts. From cardio machines to strength training
            tools, we have everything you need to achieve your fitness goals.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {/* Add buttons or links to categories here */}
            <a href="#" className="hover:text-gray-400">
              Shop Cardio Equipment
            </a>
            <a href="#" className="hover:text-gray-400">
              Browse Strength Training
            </a>
            <a href="#" className="hover:text-gray-400">
              Explore Accessories
            </a>
            <a href="#" className="hover:text-gray-400">
              View All Products
            </a>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {/* Add promotional stats or benefits here */}
            <div>
              <dt className="text-white font-semibold">Free Shipping</dt>
              <dd className="text-gray-300 mt-1">On all orders over $50</dd>
            </div>
            <div>
              <dt className="text-white font-semibold">30-Day Returns</dt>
              <dd className="text-gray-300 mt-1">
                Easy returns and exchanges
              </dd>
            </div>
            <div>
              <dt className="text-white font-semibold">Quality Guarantee</dt>
              <dd className="text-gray-300 mt-1">
                Only the best products for you
              </dd>
            </div>
            <div>
              <dt className="text-white font-semibold">Secure Checkout</dt>
              <dd className="text-gray-300 mt-1">
                Your information is safe with us
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
