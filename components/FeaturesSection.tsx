'use client'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface FeaturesSectionProps {
  title?: string
  features: Feature[]
}

export function FeaturesSection({ title, features }: FeaturesSectionProps) {
  return (
    <section className="bg-[#faf9f7] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-[#4a9ebd] rounded-lg p-3.5 w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-sm md:text-base px-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
