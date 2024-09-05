import SpecialSection from './SpecialSection'

const AllSpecialSection = () => {
  return (
    <div>
         <SpecialSection
        title="Explore Our Treadmills"
        paragraph="Our treadmills are built to enhance your fitness journey with advanced features, durability, and comfort. Achieve your fitness goals with ease and style. Experience quality workouts at home."
        imageSrc="https://res.cloudinary.com/dsisnya7j/image/upload/v1725211492/Treadmills1725211489756.png"
        categoryId="66d4a3660e198edc79ea3877"
        imagePosition="right"
      />
      <SpecialSection
        title="Revolutionize Your Cardio Workouts"
        paragraph="Our ellipticals offer a low-impact, full-body workout experience. Burn calories, tone muscles, and improve stamina with our state-of-the-art machines designed for every fitness level."
        imageSrc="https://res.cloudinary.com/dsisnya7j/image/upload/v1725211518/Ellipticals1725211515932.png" // Replace with the actual image URL for ellipticals
        categoryId="66d4a37f0e198edc79ea3879" // Replace with the actual category ID for ellipticals
        imagePosition="left" // Image will appear on the left
      />
      <SpecialSection
  title="Unlock Unlimited Workout Variations"
  paragraph="Cable machines offer unmatched versatility in strength training. Perfect for targeting all muscle groups, our machines are built for durability, performance, and seamless integration into any gym."
  imageSrc="https://res.cloudinary.com/dsisnya7j/image/upload/v1725211568/Cable%20Machines1725211561305.png" // Replace with the actual image URL for cable machines
  categoryId="66d4a3b10e198edc79ea387b" // Replace with the actual category ID for cable machines
  imagePosition="right" // Image will appear on the right
/>
<SpecialSection
  title="Build Your Strength with Premium Equipment"
  paragraph="Explore our wide range of strength training equipment, from free weights to machines, designed to help you achieve your fitness goals. Durable, reliable, and built for maximum performance."
  imageSrc="https://res.cloudinary.com/dsisnya7j/image/upload/v1725211593/Strength1725211591704.png" // Replace with the actual image URL for strength equipment
  categoryId="66d4a3cb0e198edc79ea387d" // Replace with the actual category ID for strength equipment
  imagePosition="left" // Set the image to appear on the left side
/>
    </div>
  )
}

export default AllSpecialSection