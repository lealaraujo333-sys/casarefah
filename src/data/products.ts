import { Product } from "@/types/product";
export const products: Product[] = [
  {
    id: "1",
    name: "Florescer da Cerejeira",
    slug: "florescer-da-cerejeira",
    price: 168,
    originalPrice: 189,
    description:
      "Peça delicada composta por um cachepô de concreto artesanal com velas em formato de flores de cerejeira, feitas em cera ecológica. Um toque de charme e suavidade para decorar e perfumar o ambiente com elegância.",
    image: "/products/florescer-da-cerejeira.png",
    category: "velas",
    inStock: true,
    featured: true,
    dimensions: "15 x 15 x 12 cm", // Estimated
    packaging: "Embaladas em caixa de MDF, com detalhes que fazem toda a diferença.",
    details: "Feita com cera de soja 100% natural e pavio de algodão. O cachepô é impermeabilizado para garantir durabilidade.",
    care: "Não deixe a vela acesa sem supervisão. Mantenha longe de correntes de ar e objetos inflamáveis. Apare o pavio antes de reacender."
  },
  {
    id: "2",
    name: "Encanto da Peônia",
    slug: "encanto-da-peonia",
    price: 132,
    description:
      "Cachepô de concreto com vela floral em cera ecológica. Uma peça sofisticada composta por um cachepô de concreto artesanal que abriga uma imponente vela de cera ecológica moldada em formato de peônia. Rica em detalhes e textura, a flor traz simbolismo de beleza, amor e elegância. Quando acesa, a vela ilumina suavemente as camadas da peônia, criando um visual acolhedor e encantador para qualquer ambiente.",
    image: "/products/encanto-da-peonia.png",
    category: "velas",
    inStock: true,
    dimensions: "12 x 12 x 10 cm", // Estimated
    packaging: "Embaladas em caixa de MDF.",
    details: "Cera vegetal blend de coco, arroz e palma. Essência premium livre de ftalatos. Concreto artesanal pigmentado.",
    care: "Queime a vela até a borda na primeira vez para evitar túneis. Não queime por mais de 4 horas seguidas."
  },
  {
    id: "3",
    name: "Difusor Bloom",
    slug: "difusor-bloom",
    price: 152,
    originalPrice: 168,
    description:
      "Rechaud aromático em concreto com cumbuca de inox. Uma peça elegante e funcional, feita em concreto artesanal. Possui uma abertura frontal onde é colocada uma vela tealight em copo acrílico, responsável por aquecer a cumbuca de inox superior. Nela, você pode derreter ceras aromáticas, essências sólidas ou velas decorativas, liberando um aroma suave e constante no ambiente.",
    image: "/products/difusor-bloom.png",
    category: "difusores",
    inStock: true,
    featured: true,
    dimensions: "14 x 14 x 16 cm", // Estimated
    packaging: "Embalada em caixa proteção reforçada.",
    kitContents: [
      "06 flores de vela aromatizadas (Wax Melts)",
      "01 cumbuca de aço inoxidável de alta qualidade",
      "01 vela tealight para aquecimento"
    ],
    details: "O concreto atua como isolante térmico seguro. A cumbuca de inox é removível e fácil de limpar. Acompanha wax melts de alta performance.",
    care: "Limpe a cumbuca com papel toalha enquanto ainda estiver morna (mas não quente) para remover a cera antiga. Use apenas tealights em copo de alumínio ou acrílico."
  },
  {
    id: "4",
    name: "Bella Rose",
    slug: "bella-rose",
    price: 124,
    description:
      "Cachepô de concreto com vela floral em cera ecológica. Uma peça delicada e elegante, composta por um cachepô de concreto artesanal que abriga uma charmosa vela de cera ecológica moldada em formato de rosa. Rica em camadas e suavidade, a flor traz um toque romântico e refinado ao ambiente. Ao acender, a luz realça cada pétala, criando um clima acolhedor e sofisticado.",
    image: "/products/bella-rose.png",
    category: "velas",
    inStock: true,
    dimensions: "10 x 10 x 8 cm", // Estimated
    packaging: "Embaladas com carinho em papel de seda e caixa resistente.",
    details: "Design exclusivo Casa Refah. Cimento branco estrutural de alta resistência. Acabamento acetinado.",
    care: "Evite exposição direta ao sol para não alterar a cor da cera. Limpe o concreto com pano úmido apenas com água."
  },
  {
    id: "5",
    name: "Tríade Refah",
    slug: "triade-refah",
    price: 198,
    description:
      "Conjunto com três peças em cimento de curvas orgânicas para composições equilibradas.",
    image: "/products/triade-refah.png",
    category: "decor",
    inStock: true,
    details: "Composto por 3 peças de alturas variadas. Ideal para centro de mesa ou aparadores.",
    care: "Peças decorativas, não utilizar para alimentos sem proteção. Limpeza com pano seco ou levemente úmido."
  },
  {
    id: "6",
    name: "Difusora Refah",
    slug: "difusora-refah",
    price: 158,
    description:
      "Difusor com base em cimento e corpo cerâmico artesanal pensado para fragrâncias contínuas.",
    image: "/products/difusora-refah.png",
    category: "difusores",
    inStock: true,
    details: "Capacidade para 200ml de essência. Acompanha 5 varetas de fibra de algodão de alta absorção.",
    care: "Vire as varetas dia sim, dia não para melhor explosão de aroma. Mantenha longe de correntes de ar fortes."
  },
  {
    id: "7",
    name: "Conjunto Solaris",
    slug: "conjunto-solaris",
    price: 168,
    originalPrice: 182,
    description:
      "Conjunto aromático em bandeja de concreto – Difusor e porta-velas tealight. Um conjunto elegante composto por uma bandeja de concreto artesanal, um difusor de varetas em concreto e três porta-velas tealight no mesmo design. As peças combinam textura suave, acabamento minimalista e um visual sofisticado, perfeito para compor ambientes com harmonia, aroma e charme contemporâneo.",
    image: "/products/conjunto-solaris.png",
    category: "kits",
    inStock: true,
    featured: true,
    dimensions: "Bandeja 30cm, Difusor 12cm",
    packaging: "Embaladas individualmente no kit com proteção extra.",
    kitContents: [
      "01 Bandeja oval em concreto artesanal (30cm)",
      "01 Difusor de varetas em concreto com frasco interno",
      "06 Varetas de fibra na cor preta ou nude",
      "01 Frasco de vidro com 100ml de essência (Aroma à escolha)",
      "03 Porta-velas tealight em concreto",
      "03 Velas tealight aromáticas"
    ],
    details: "A união perfeita entre funcionalidade e estética. O concreto é tratado para não absorver líquidos em caso de derramamento acidental.",
    care: "Limpe a bandeja imediatamente se cair essência para evitar manchas. Não use produtos abrasivos no concreto."
  },
  {
    id: "8",
    name: "Eterno Bouquet",
    slug: "eterno-bouquet",
    price: 186,
    description:
      "Flores botânicas em cera vegetal dispostas sobre bandeja de cimento leve.",
    image: "/products/eterno-bouquet.png",
    category: "decor",
    inStock: true,
    dimensions: "25 x 15 x 10 cm",
    details: "Arranjo permanente feito com cera de alta dureza para manter a forma.",
    care: "Não expor ao calor excessivo. Limpar poeira com secador no ar frio ou pincel macio."
  },
  {
    id: "9",
    name: "Disco Niemeyer",
    slug: "disco-niemeyer",
    price: 210,
    description:
      "Escultura circular em cimento com recortes inspirados na arquitetura modernista brasileira.",
    image: "/products/disco-niemeyer.png",
    category: "decor",
    inStock: true,
    dimensions: "28cm diâmetro",
    details: "Peça escultórica pesada, com base de feltro para não riscar móveis.",
    care: "Limpeza apenas com pano seco. Evite batidas nas bordas."
  },
  {
    id: "10",
    name: "Gota Decor",
    slug: "gota-decor",
    price: 138,
    description:
      "Peça em formato de gota com superfície acetinada para compor nichos e estantes.",
    image: "/products/gota-decor.png",
    category: "decor",
    inStock: true,
    details: "Acabamento lixado à mão até atingir toque de seda.",
    care: "Pode ser lavada com sabão neutro e água corrente."
  },
  {
    id: "11",
    name: "Lunia",
    slug: "lunia",
    price: 142,
    description:
      "Objeto lunar em cimento suavemente polido que traz brilho discreto aos ambientes.",
    image: "/products/lunia.png",
    category: "decor",
    inStock: true,
    details: "Inspirada nas fases da lua e na textura bruta do satélite natural.",
    care: "Manter em local seco."
  },
  {
    id: "12",
    name: "Serenita",
    slug: "serenita",
    price: 142,
    description:
      "Dupla de castiçais escultóricos em cimento off-white com acabamento fosco.",
    image: "/products/serenita.png",
    category: "decor",
    inStock: true,
    details: "Design minimalista escandinavo. Compatível com velas palito padrão.",
    care: "Remova a cera derramada congelando a peça ou com água morna."
  },
  {
    id: "13",
    name: "Kit Aconchego",
    slug: "kit-aconchego",
    price: 248,
    originalPrice: 289,
    description:
      "Kit completo para criar um ambiente acolhedor. Inclui uma vela floral, um difusor de varetas e três wax melts aromáticos, tudo em uma elegante caixa presente.",
    image: "/products/collection-essenza.png",
    category: "kits",
    inStock: true,
    featured: true,
    packaging: "Caixa presente premium com laço de cetim.",
    kitContents: [
      "01 Vela floral Encanto da Peônia",
      "01 Difusor de varetas 100ml",
      "03 Wax Melts aromáticos sortidos",
      "01 Caixa presente decorada"
    ],
    details: "Ideal para presentear em aniversários, casamentos ou datas especiais.",
    care: "Armazene em local fresco e seco até o uso."
  },
  {
    id: "14",
    name: "Kit Bem-Estar",
    slug: "kit-bem-estar",
    price: 198,
    description:
      "Combinação perfeita de aromas relaxantes para momentos de autocuidado. Inclui vela aromática e difusor em embalagem especial.",
    image: "/products/difusor-bloom.png",
    category: "kits",
    inStock: true,
    packaging: "Embalagem kraft com acabamento artesanal.",
    kitContents: [
      "01 Vela aromática Bella Rose",
      "01 Difusor Bloom com cumbuca de inox",
      "06 Flores de cera aromáticas (Wax Melts)"
    ],
    details: "Perfeito para rituais de relaxamento e meditação.",
    care: "Siga as instruções individuais de cada produto."
  }
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
