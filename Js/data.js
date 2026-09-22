// ===== Brew Haven — product data =====
// Each product: id, name, category, description, price (INR), image, popular (bool)

const CATEGORIES = ["All", "Coffee", "Cold Coffee", "Tea", "Pastries", "Desserts", "Snacks"];

const PRODUCTS = [
  {
    id: "iced-caramel-latte",
    name: "Iced Caramel Latte",
    category: "Cold Coffee",
    description: "Smooth espresso with caramel and chilled milk.",
    price: 199,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop",
    popular: true
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Coffee",
    description: "Classic cappuccino with rich foam and bold flavor.",
    price: 169,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop",
    popular: true
  },
  {
    id: "mocha",
    name: "Mocha",
    category: "Coffee",
    description: "Espresso with chocolate and steamed milk.",
    price: 189,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=600&auto=format&fit=crop",
    popular: true
  },
  {
    id: "espresso",
    name: "Espresso",
    category: "Coffee",
    description: "Strong, bold and pure espresso shot.",
    price: 139,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop",
    popular: true
  },
  {
    id: "americano",
    name: "Americano",
    category: "Coffee",
    description: "Espresso diluted with hot water for a lighter, crisp cup.",
    price: 149,
    image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "flat-white",
    name: "Flat White",
    category: "Coffee",
    description: "Velvety micro-foam poured over a double espresso.",
    price: 179,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    category: "Cold Coffee",
    description: "Steeped for 18 hours for a smooth, low-acid finish.",
    price: 209,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "affogato",
    name: "Affogato",
    category: "Cold Coffee",
    description: "A scoop of vanilla gelato drowned in hot espresso.",
    price: 219,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    category: "Tea",
    description: "Black tea simmered with warm hand-ground spices.",
    price: 129,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "green-tea",
    name: "Jasmine Green Tea",
    category: "Tea",
    description: "Light, floral green tea leaves, gently steeped.",
    price: 119,
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    category: "Pastries",
    description: "Laminated, flaky, and baked fresh every morning.",
    price: 149,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cinnamon-roll",
    name: "Cinnamon Roll",
    category: "Pastries",
    description: "Soft roll swirled with cinnamon and cream cheese icing.",
    price: 169,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "chocolate-brownie",
    name: "Chocolate Brownie",
    category: "Desserts",
    description: "Dense, fudgy brownie with a crackled top.",
    price: 159,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    category: "Desserts",
    description: "Espresso-soaked layers with mascarpone cream.",
    price: 229,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "Snacks",
    description: "Sourdough, smashed avocado, chili flakes, olive oil.",
    price: 249,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "club-sandwich",
    name: "Club Sandwich",
    category: "Snacks",
    description: "Grilled sandwich stacked with fresh, savory layers.",
    price: 229,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=600&auto=format&fit=crop"
  }
];
