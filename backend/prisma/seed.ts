import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const products = [
    {
        name: "Florescer da Cerejeira",
        slug: "florescer-da-cerejeira",
        price: 168,
        originalPrice: 189,
        description: "Peça delicada composta por um cachepô de concreto artesanal com velas em formato de flores de cerejeira, feitas em cera ecológica.",
        image: "/products/florescer-da-cerejeira.png",
        category: "velas",
        inStock: true,
        featured: true,
        details: "Feita com cera de soja 100% natural e pavio de algodão.",
        care: "Não deixe a vela acesa sem supervisão."
    },
    {
        name: "Encanto da Peônia",
        slug: "encanto-da-peonia",
        price: 132,
        description: "Cachepô de concreto com vela floral em cera ecológica. Uma peça sofisticada composta por um cachepô de concreto artesanal.",
        image: "/products/encanto-da-peonia.png",
        category: "velas",
        inStock: true,
        details: "Cera vegetal blend de coco, arroz e palma.",
        care: "Queime a vela até a borda na primeira vez."
    },
    {
        name: "Difusor Bloom",
        slug: "difusor-bloom",
        price: 152,
        originalPrice: 168,
        description: "Rechaud aromático em concreto com cumbuca de inox. Uma peça elegante e funcional, feita em concreto artesanal.",
        image: "/products/difusor-bloom.png",
        category: "difusores",
        inStock: true,
        featured: true,
        details: "O concreto atua como isolante térmico seguro.",
        care: "Limpe a cumbuca com papel toalha enquanto ainda estiver morna."
    },
    {
        name: "Bella Rose",
        slug: "bella-rose",
        price: 124,
        description: "Cachepô de concreto com vela floral em cera ecológica. Uma peça delicada e elegante.",
        image: "/products/bella-rose.png",
        category: "velas",
        inStock: true,
        details: "Design exclusivo Casa Refah.",
        care: "Evite exposição direta ao sol."
    },
    {
        name: "Tríade Refah",
        slug: "triade-refah",
        price: 198,
        description: "Conjunto com três peças em cimento de curvas orgânicas para composições equilibradas.",
        image: "/products/triade-refah.png",
        category: "decor",
        inStock: true,
        details: "Composto por 3 peças de alturas variadas.",
        care: "Peças decorativas, não utilizar para alimentos."
    },
    {
        name: "Difusora Refah",
        slug: "difusora-refah",
        price: 158,
        description: "Difusor com base em cimento e corpo cerâmico artesanal pensado para fragrâncias contínuas.",
        image: "/products/difusora-refah.png",
        category: "difusores",
        inStock: true,
        details: "Capacidade para 200ml de essência.",
        care: "Vire as varetas dia sim, dia não."
    },
    {
        name: "Conjunto Solaris",
        slug: "conjunto-solaris",
        price: 168,
        originalPrice: 182,
        description: "Conjunto aromático em bandeja de concreto – Difusor e porta-velas tealight.",
        image: "/products/conjunto-solaris.png",
        category: "kits",
        inStock: true,
        featured: true,
        details: "A união perfeita entre funcionalidade e estética.",
        care: "Limpe a bandeja imediatamente se cair essência."
    },
    {
        name: "Eterno Bouquet",
        slug: "eterno-bouquet",
        price: 186,
        description: "Flores botânicas em cera vegetal dispostas sobre bandeja de cimento leve.",
        image: "/products/eterno-bouquet.png",
        category: "decor",
        inStock: true,
        details: "Arranjo permanente feito com cera de alta dureza.",
        care: "Não expor ao calor excessivo."
    },
    {
        name: "Disco Niemeyer",
        slug: "disco-niemeyer",
        price: 210,
        description: "Escultura circular em cimento com recortes inspirados na arquitetura modernista brasileira.",
        image: "/products/disco-niemeyer.png",
        category: "decor",
        inStock: true,
        details: "Peça escultórica pesada.",
        care: "Limpeza apenas com pano seco."
    },
    {
        name: "Gota Decor",
        slug: "gota-decor",
        price: 138,
        description: "Peça em formato de gota com superfície acetinada para compor nichos e estantes.",
        image: "/products/gota-decor.png",
        category: "decor",
        inStock: true,
        details: "Acabamento lixado à mão.",
        care: "Pode ser lavada com sabão neutro."
    },
    {
        name: "Lunia",
        slug: "lunia",
        price: 142,
        description: "Objeto lunar em cimento suavemente polido que traz brilho discreto aos ambientes.",
        image: "/products/lunia.png",
        category: "decor",
        inStock: true,
        details: "Inspirada nas fases da lua.",
        care: "Manter em local seco."
    },
    {
        name: "Serenita",
        slug: "serenita",
        price: 142,
        description: "Dupla de castiçais escultóricos em cimento off-white com acabamento fosco.",
        image: "/products/serenita.png",
        category: "decor",
        inStock: true,
        details: "Design minimalista escandinavo.",
        care: "Remova a cera derramada congelando a peça."
    },
    {
        name: "Kit Aconchego",
        slug: "kit-aconchego",
        price: 248,
        originalPrice: 289,
        description: "Kit completo para criar um ambiente acolhedor com vela aromática, difusor de varetas e bandeja decorativa em concreto artesanal.",
        image: "/products/collection-essenza.png",
        category: "kits",
        inStock: true,
        featured: true,
        details: "Inclui 1 vela 180g, 1 difusor 100ml e 1 bandeja.",
        care: "Siga as instruções de cuidado de cada peça."
    },
    {
        name: "Kit Bem-Estar",
        slug: "kit-bem-estar",
        price: 218,
        description: "Conjunto relaxante com rechaud aromático, essência e velas tealight, perfeito para momentos de autocuidado.",
        image: "/products/difusora-refah.png",
        category: "kits",
        inStock: true,
        details: "Inclui 1 rechaud, 1 essência 30ml e 6 velas tealight.",
        care: "Nunca deixe o rechaud aceso sem supervisão."
    }
]

async function main() {
    console.log(`🌿 Casa Refah - Database Seeding`)
    console.log(`================================`)

    // Create admin user with hashed password
    console.log(`\n👤 Creating admin user...`)
    const hashedPassword = await bcrypt.hash('prismasolution060126', 12)

    const adminUser = await prisma.user.upsert({
        where: { email: 'refah20@casarefah.com' },
        update: {
            password: hashedPassword
        },
        create: {
            email: 'refah20@casarefah.com',
            password: hashedPassword,
            role: 'ADMIN'
        }
    })
    console.log(`   ✅ Admin user created: ${adminUser.email}`)
    console.log(`   🔑 Credentials updated successfully`)

    // Seed products
    console.log(`\n📦 Seeding products...`)
    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: p,
            create: p,
        })
        console.log(`   ✅ ${product.name}`)
    }

    console.log(`\n================================`)
    console.log(`✨ Seeding completed successfully!`)
    console.log(`   Products: ${products.length}`)
    console.log(`   Admin: refah20@casarefah.com`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

