'use client'
import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { getAllCategories } from "@/components/filters/filters.utils";

/**
 * Menú de categorías para filtrado de productos
 * @param {Object} props
 * @param {string} props.className - Clases CSS adicionales
 * @param {boolean} props.horizontal - Layout horizontal (scroll) o grid
 * @param {string} props.chipWidth - Ancho de cada chip (clase Tailwind)
 * @param {boolean} props.showIcons - Mostrar iconos de categorías
 */
const CategoryMenu = ({ 
  className = "", 
  horizontal = false, 
  chipWidth = "w-36",
  showIcons = false 
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { categoriesMenu } = useAppContext();
  
  const activeCategory = (searchParams.get("c") || "").toLowerCase();


  const DISPLAY_OVERRIDES = {
    'tecnologia': 'Tecnología',
    'lineablanca': 'Línea Blanca',
    'linea blanca': 'Línea Blanca',
    'cuidadopersonal': 'Cuidado Personal',
    'cuidado personal': 'Cuidado Personal',
    'hogar': 'Hogar',
    'dormitorio': 'Dormitorio',
    'muebles': 'Muebles',
    'oficina': 'Oficina',
    'entretenimiento': 'Entretenimiento',
    'motos': 'Motos',
  };

  const formatLabel = (text) => {
    if (!text) return '';
    
    const smallWords = new Set([
      "de", "y", "del", "la", "las", "los", "el", "en", 
      "para", "por", "con", "o", "u", "a"
    ]);
    
    const txt = text.toLowerCase().trim();
    
    return txt.split(/\s+/).map((word, index) => {
      if (["usb", "hdmi", "ps", "pc", "tv", "led"].includes(word)) {
        return word.toUpperCase();
      }
      
      if (word === "wifi" || word === "wi-fi") return "Wi-Fi";
      
      if (smallWords.has(word) && index > 0) return word;
      
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  };


  const getDisplayName = (categoryName) => {
    const key = (categoryName || '').toLowerCase().trim();
    
    if (DISPLAY_OVERRIDES[key]) {
      return DISPLAY_OVERRIDES[key];
    }
    
    return formatLabel(categoryName);
  };

  
  const categories = useMemo(() => {
    const rawCategories = (categoriesMenu && categoriesMenu.length > 0)
      ? categoriesMenu.map((cat) => ({
          name: cat.title,
          value: cat.title,
          slug: cat.slug || cat.title.toLowerCase().replace(/\s+/g, '-'),
          id: cat.id,
          icon: cat.icon
        }))
      : getAllCategories().map((cat) => ({
          name: cat.name,
          value: cat.name,
          slug: cat.slug,
          id: cat.id,
          icon: cat.icon
        }));

    const categoriesMap = new Map();
    rawCategories.forEach((cat) => {
      const key = cat.value.toLowerCase().trim();
      if (!categoriesMap.has(key)) {
        categoriesMap.set(key, cat);
      }
    });

    return Array.from(categoriesMap.values());
  }, [categoriesMenu]);

  const handleCategoryClick = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (activeCategory === category.value.toLowerCase()) {
      params.delete('c');
    } else {
      params.set('c', category.value);
    }
    
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/all-products${queryString ? '?' + queryString : ''}`);
  };

  if (categories.length === 0) {
    return null;
  }


  return (
    <div 
      className={`
        ${horizontal 
          ? "flex flex-nowrap items-center gap-3 overflow-x-auto scrollbar-hide pb-2" 
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        } 
        ${className}
      `}
      role="navigation"
      aria-label="Filtro de categorías"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.value.toLowerCase();
        const displayName = getDisplayName(category.name);
        const icon = showIcons ? (category.icon || getCategoryIcon(category.name)) : null;
        
        return (
          <button
            key={category.id || category.value}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className={`
              inline-flex items-center justify-center gap-2 cursor-pointer
              px-4 py-2 text-sm font-medium rounded-md border
              ${chipWidth} whitespace-nowrap
              transition-all duration-200 ease-in-out
              ${isActive 
                ? "bg-orange-500 border-orange-500 text-white shadow-md" 
                : "bg-white border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 shadow-sm hover:shadow"
              }
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
            `}
            title={displayName}
            aria-pressed={isActive}
            aria-label={`Filtrar por ${displayName}`}
          >
            {icon && (
              <span className="text-lg" aria-hidden="true">
                {icon}
              </span>
            )}
            
            <span className="truncate">
              {displayName}
            </span>
            
            {isActive && (
              <span className="ml-auto" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryMenu;