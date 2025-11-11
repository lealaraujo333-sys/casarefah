import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

const CategoryCard = ({ title, description, image, href }: CategoryCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-medium bg-card h-full">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6 space-y-2">
          <h3 className="font-cormorant text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </Card>
    </a>
  );
};

export default CategoryCard;
