import Image from 'next/image'

const FeatureCard = ({ imageSrc, title, description }) => (
  <div className="rounded-lg shadow-md overflow-hidden">
    <Image
      src={imageSrc}
      alt={title}
      width={400}
      height={300}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  </div>
)

const FeaturesSection = () => {
  const features = [
    {
      imageSrc: "/feature1.jpg",
      title: "Feature 1",
      description: "Description of feature 1. This amazing feature will revolutionize your experience."
    },
    {
      imageSrc: "/feature2.jpg",
      title: "Feature 2",
      description: "Description of feature 2. Unlock new possibilities with this groundbreaking feature."
    },
    {
      imageSrc: "/feature3.jpg",
      title: "Feature 3",
      description: "Description of feature 3. Enhance your productivity with our innovative solution."
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
