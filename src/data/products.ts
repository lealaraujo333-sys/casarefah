import { Product } from "@/types/product";
import florescerDaCerejeiraImage from "@/assets/Florescer da Cerejeira.png";
import encantoDaPeoniaImage from "@/assets/Encanto da Peônia.png";
import difusorBloomImage from "@/assets/Difusor Bloom.png";
import bellaRoseImage from "@/assets/Bella Rose.png";
import triadeRefahImage from "@/assets/Tríade Refah.png";
import difusoraRefahImage from "@/assets/Difusora Refah.png";
import conjuntoSolarisImage from "@/assets/Conjunto solaris.png";
import eternoBouquetImage from "@/assets/Eterno Bouquet.png";
import discoNiemeyerImage from "@/assets/Disco Niemeyer.png";
import gotaDecorImage from "@/assets/Gota Decor.png";
import luniaImage from "@/assets/Lunia.png";
import serenitaImage from "@/assets/Serenita.png";

export const products: Product[] = [
  {
    id: "1",
    name: "Florescer da Cerejeira",
    slug: "florescer-da-cerejeira",
    price: 168,
    originalPrice: 189,
    description:
      "Arranjo escultórico com flores de cera inspiradas em cerejeiras, apoiado em base minimalista de cimento.",
    image: florescerDaCerejeiraImage,
    category: "decor",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Encanto da Peônia",
    slug: "encanto-da-peonia",
    price: 132,
    description:
      "Peônia artesanal em cera pigmentada que contrasta com pedestal em cimento polido.",
    image: encantoDaPeoniaImage,
    category: "decor",
    inStock: true,
  },
  {
    id: "3",
    name: "Difusor Bloom",
    slug: "difusor-bloom",
    price: 152,
    originalPrice: 168,
    description:
      "Difusor cerâmico texturizado com essência floral exclusiva e acabamento feito à mão.",
    image: difusorBloomImage,
    category: "decor",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Bella Rose",
    slug: "bella-rose",
    price: 124,
    description:
      "Rosa escultórica em cera natural que leva romantismo às mesas e aparadores.",
    image: bellaRoseImage,
    category: "decor",
    inStock: true,
  },
  {
    id: "5",
    name: "Tríade Refah",
    slug: "triade-refah",
    price: 198,
    description:
      "Conjunto com três peças em cimento de curvas orgânicas para composições equilibradas.",
    image: triadeRefahImage,
    category: "decor",
    inStock: true,
  },
  {
    id: "6",
    name: "Difusora Refah",
    slug: "difusora-refah",
    price: 158,
    description:
      "Difusor com base em cimento e corpo cerâmico artesanal pensado para fragrâncias contínuas.",
    image: difusoraRefahImage,
    category: "decor",
    inStock: true,
  },
  {
    id: "7",
    name: "Conjunto Solaris",
    slug: "conjunto-solaris",
    price: 168,
    originalPrice: 182,
    description:
      "Kit com bandeja, vaso e porta-velas em cimento pigmentado em tons solares.",
    image: conjuntoSolarisImage,
    category: "decor",
    inStock: true,
    featured: true,
  },
  {
    id: "8",
    name: "Eterno Bouquet",
    slug: "eterno-bouquet",
    price: 186,
    description:
      "Flores botânicas em cera vegetal dispostas sobre bandeja de cimento leve.",
    image: eternoBouquetImage,
    category: "decor",
    inStock: true,
  },
  {
    id: "9",
    name: "Disco Niemeyer",
    slug: "disco-niemeyer",
    price: 210,
    description:
      "Escultura circular em cimento com recortes inspirados na arquitetura modernista brasileira.",
    image: discoNiemeyerImage,
    category: "decor",
    inStock: true,
  },
  {
    id: "10",
    name: "Gota Decor",
    slug: "gota-decor",
    price: 138,
    description:
      "Peça em formato de gota com superfície acetinada para compor nichos e estantes.",
    image: gotaDecorImage,
    category: "decor",
    inStock: true,
  },
  {
    id: "11",
    name: "Lunia",
    slug: "lunia",
    price: 142,
    description:
      "Objeto lunar em cimento suavemente polido que traz brilho discreto aos ambientes.",
    image: luniaImage,
    category: "decor",
    inStock: true,
  },
  {
    id: "12",
    name: "Serenita",
    slug: "serenita",
    price: 142,
    description:
      "Dupla de castiçais escultóricos em cimento off-white com acabamento fosco.",
    image: serenitaImage,
    category: "decor",
    inStock: true,
  },
];

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured).slice(0, 3);
};

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};
