/**
 * Normaliza texto eliminando tildes y espacios.
 * @param {string} s - Texto a normalizar.
 * @returns {string} Texto limpio y en minúsculas.
 */
export const normalize = (s) =>
  (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/**
 * Construye cadena de query a partir de un objeto de filtros.
 * @param {Record<string, any>} filters
 * @returns {string} Cadena de query
 */
export const buildFilterParams = (filters) => {
  const usp = new URLSearchParams();
  Object.entries(filters || {}).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      if (Array.isArray(val)) val.forEach((v) => usp.append(key, String(v)));
      else usp.set(key, String(val));
    }
  });
  return usp.toString();
};

/**
 * Obtiene lista de nombres de tipos según categoría/subcategoría activas.
 * @param {Array} categoriesMenu
 * @param {string} c
 * @param {string} s
 * @returns {string[]} Lista de tipos únicos
 */
export const getTypeNames = (categoriesMenu, c, s) => {
  const cNorm = normalize(c);
  const sNorm = normalize(s);
  const activeCategory = (categoriesMenu || []).find(
    (cat) => normalize(cat.title) === cNorm
  );

  const cols = activeCategory?.columns || [];
  const col = s ? cols.find((x) => normalize(x.title) === sNorm) : undefined;

  if (col) {
    return (col.types || []).map((tp) => tp.name).filter(Boolean);
  }

  if (activeCategory) {
    return cols
      .flatMap((x) => x.types || [])
      .map((tp) => tp.name)
      .filter(Boolean);
  }

  const allTypes = (categoriesMenu || []).flatMap((group) =>
    (group.columns || []).flatMap((x) => x.types || [])
  );

  const set = new Set();
  for (const tp of allTypes) {
    const name = (tp?.name || "").trim();
    if (name) set.add(normalize(name));
  }

  return Array.from(set);
};

/**
 * Clasifica categoría/subcategoría/tipos a partir de texto y categoría existente.
 * @param {Object} payload
 * @param {string} [payload.name]
 * @param {string} [payload.description]
 * @param {string} [payload.category]
 * @returns {Object} { category, categoryLabel, subcategory, subcategoryLabel, types, confidence }
 */
export const classifyHierarchy = ({ name = "", description = "", category = "" } = {}) => {
  const text = `${name} ${description}`.toLowerCase();
  const ntext = normalize(text);

  const directCat = normalize(category).replace(/\s+/g, "");
  const types = [];
  const confidence = directCat ? 0.5 : 0;

  return {
    category: directCat || undefined,
    categoryLabel: category || undefined,
    subcategory: undefined,
    subcategoryLabel: undefined,
    types,
    confidence,
  };
};

/**
 * Devuelve todas las categorías conocidas (fallback simple).
 * Ideal cuando el backend no devuelve datos.
 */
export const getAllCategories = () => (
  [
    { id: "tecnologia", name: "Tecnología", slug: "tecnologia" },
    { id: "lineablanca", name: "Línea Blanca", slug: "linea-blanca" },
    { id: "hogar", name: "Hogar", slug: "hogar" },
    { id: "dormitorio", name: "Dormitorio", slug: "dormitorio" },
    { id: "muebles", name: "Muebles", slug: "muebles" },
    { id: "oficina", name: "Oficina", slug: "oficina" },
    { id: "cuidado-personal", name: "Cuidado Personal", slug: "cuidado-personal" },
    { id: "entretenimiento", name: "Entretenimiento", slug: "entretenimiento" },
    { id: "motos", name: "Motos", slug: "motos" },
  ]
);

// ✅ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ FUNCIONES FALTANTES - FILTRADO Y ORDENAMIENTO
// ✅ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Aplica filtros a un array de productos
 * @param {Array} products - Lista de productos
 * @param {Object} filters - Objeto con filtros activos
 * @returns {Array} Productos filtrados
 */
export const applyFilters = (products, filters) => {
  if (!Array.isArray(products)) return [];

  return products.filter((product) => {
    // ✅ Filtro por búsqueda
    if (filters.search) {
      const search = normalize(filters.search);
      const matchesName = normalize(product.nombre || '').includes(search);
      const matchesModel = normalize(product.modelo || '').includes(search);
      const matchesDescription = normalize(product.descripcion || '').includes(search);
      const matchesBrand = normalize(product.idMarca2?.nombre || '').includes(search);
      
      if (!matchesName && !matchesModel && !matchesDescription && !matchesBrand) {
        return false;
      }
    }

    // ✅ Filtro por categoría
    if (filters.category && product.idCategoria !== filters.category) {
      return false;
    }

    // ✅ Filtro por marca
    if (filters.brand && product.idMarca !== filters.brand) {
      return false;
    }

    // ✅ Filtro por rango de precio
    const price = Number(product.precioVenta) || 0;
    if (filters.minPrice > 0 && price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice < Infinity && price > filters.maxPrice) {
      return false;
    }

    // ✅ Filtro por stock
    if (filters.inStock && (!product.stock || product.stock <= 0)) {
      return false;
    }

    // ✅ Filtro por descuento
    if (filters.onSale && (!product.descuento || product.descuento <= 0)) {
      return false;
    }

    return true;
  });
};

/**
 * Aplica ordenamiento a un array de productos
 * @param {Array} products - Lista de productos
 * @param {string} sortBy - Criterio de ordenamiento
 * @returns {Array} Productos ordenados
 */
export const applySort = (products, sortBy) => {
  if (!Array.isArray(products)) return [];

  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = Number(a.precioVenta) || 0;
        const priceB = Number(b.precioVenta) || 0;
        return priceA - priceB;
      });

    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = Number(a.precioVenta) || 0;
        const priceB = Number(b.precioVenta) || 0;
        return priceB - priceA;
      });

    case 'name-asc':
      return sorted.sort((a, b) => {
        const nameA = normalize(a.nombre || '');
        const nameB = normalize(b.nombre || '');
        return nameA.localeCompare(nameB);
      });

    case 'name-desc':
      return sorted.sort((a, b) => {
        const nameA = normalize(a.nombre || '');
        const nameB = normalize(b.nombre || '');
        return nameB.localeCompare(nameA);
      });

    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.fechaIngreso || 0);
        const dateB = new Date(b.fechaIngreso || 0);
        return dateB - dateA;
      });

    case 'discount':
      return sorted.sort((a, b) => {
        const discountA = Number(a.descuento) || 0;
        const discountB = Number(b.descuento) || 0;
        return discountB - discountA;
      });

    case 'featured':
    default:
      // Ordenar por: descuento > stock > precio
      return sorted.sort((a, b) => {
        const scoreA = (Number(a.descuento) || 0) * 10 + (Number(a.stock) || 0) * 0.1;
        const scoreB = (Number(b.descuento) || 0) * 10 + (Number(b.stock) || 0) * 0.1;
        return scoreB - scoreA;
      });
  }
};

/**
 * Obtiene el rango de precios de un array de productos
 * @param {Array} products - Lista de productos
 * @returns {Object} { min, max }
 */
export const getPriceRange = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    return { min: 0, max: 1000 };
  }

  const prices = products
    .map((p) => Number(p.precioVenta) || 0)
    .filter((p) => p > 0);

  if (prices.length === 0) {
    return { min: 0, max: 1000 };
  }

  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
};

/**
 * Obtiene categorías únicas de un array de productos
 * @param {Array} products - Lista de productos
 * @returns {Array} Lista de categorías únicas
 */
export const getUniqueCategories = (products) => {
  if (!Array.isArray(products)) return [];

  const categoriesMap = new Map();

  products.forEach((product) => {
    if (product.idCategoria && product.categoria) {
      categoriesMap.set(product.idCategoria, product.categoria);
    }
  });

  return Array.from(categoriesMap.entries()).map(([id, name]) => ({
    id,
    name,
  }));
};

/**
 * Obtiene marcas únicas de un array de productos
 * @param {Array} products - Lista de productos
 * @returns {Array} Lista de marcas únicas
 */
export const getUniqueBrands = (products) => {
  if (!Array.isArray(products)) return [];

  const brandsMap = new Map();

  products.forEach((product) => {
    if (product.idMarca && product.idMarca2?.nombre) {
      brandsMap.set(product.idMarca, product.idMarca2.nombre);
    }
  });

  return Array.from(brandsMap.entries()).map(([id, name]) => ({
    id,
    name,
  }));
};