export const FILTER_PARAM_KEYS = {
  category: "c",
  subcategory: "s",
  type: "t",
  priceMin: "price_min",
  priceMax: "price_max",
};

export const PARAM_LABELS = {
  c: "Categoría",
  s: "Subcategoría",
  t: "Tipo",
  price_min: "Precio mínimo",
  price_max: "Precio máximo",
  brand: "Marca",
  search: "Búsqueda",
};

export const PATHS = {
  allProducts: "/all-products",
};

export const CATEGORY_ICONS = {
  tecnologia: "💻",
  lineablanca: "🧺",
  hogar: "🏠",
  dormitorio: "🛏️",
  muebles: "🛋️",
  oficina: "🗂️",
  "cuidado-personal": "💅",
  entretenimiento: "🎮",
  motos: "🏍️",
};

export const FILTERS_MAP = {
  categories: {
    tecnologia: {
      label: "Tecnología",
      subcategories: {
        computadoras: { label: "Computadoras", keywords: ["Laptop", "PC", "Notebook"] },
        celulares: { label: "Celulares", keywords: ["Smartphone", "Android", "iPhone"] },
        accesorios: { label: "Accesorios", keywords: ["Cables", "USB", "HDMI", "Mouse", "Teclado"] },
      },
    },
    lineablanca: {
      label: "Línea Blanca",
      subcategories: {
        refrigeracion: { label: "Refrigeración", keywords: ["Refrigeradora", "Freezer"] },
        lavado: { label: "Lavado", keywords: ["Lavadora", "Secadora"] },
      },
    },
    hogar: {
      label: "Hogar",
      subcategories: {
        cocina: { label: "Cocina", keywords: ["Ollas", "Utensilios"] },
        decoracion: { label: "Decoración", keywords: ["Cuadros", "Lámparas"] },
      },
    },
    dormitorio: { label: "Dormitorio", subcategories: {} },
    muebles: { label: "Muebles", subcategories: {} },
    oficina: { label: "Oficina", subcategories: {} },
    "cuidado-personal": { label: "Cuidado Personal", subcategories: {} },
    entretenimiento: { label: "Entretenimiento", subcategories: {} },
    motos: { label: "Motos", subcategories: {} },
  },
};