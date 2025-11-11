import CategoryCard from "./CategoryCard";
import collectionEssenzaImage from "@/assets/collection-essenza.png";
import collectionHomeDecorImage from "@/assets/collection-home-decor.png";

const Categories = () => {
  const categories = [
    {
      title: "Essenza",
      description: "Velas aromáticas artesanais e difusores que transformam seu ambiente com fragrâncias delicadas",
      image: collectionEssenzaImage,
      href: "/categoria/essenza",
    },
    {
      title: "Home & Decor",
      description: "Objetos de cimento feitos à mão, bandejas e vasos para adicionar elegância minimalista",
      image: collectionHomeDecorImage,
      href: "/categoria/decor",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground mb-4">
            Nossas Coleções
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Explore nossa seleção curada de produtos artesanais para casa e bem-estar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
