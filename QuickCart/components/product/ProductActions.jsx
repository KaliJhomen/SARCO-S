import React, { useState } from "react";
import { Heart, Share2, Check } from "lucide-react";

const ProductActions = ({ isFavorite = false, onToggleFavorite, onShare, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={`flex items-center gap-4 mt-2 ${className}`}>
      <button
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        className={`p-2 rounded-full border transition-colors ${
          isFavorite
            ? "bg-red-100 text-red-600 border-red-200"
            : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-red-50"
        }`}
        onClick={onToggleFavorite}
        type="button"
      >
        <Heart fill={isFavorite ? "#ef4444" : "none"} size={20} />
      </button>
      <button
        aria-label="Compartir producto"
        className="p-2 rounded-full border bg-gray-100 text-gray-500 border-gray-200 hover:bg-orange-50 transition-colors"
        onClick={handleShare}
        type="button"
      >
        {copied ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
      </button>
    </div>
  );
};

export default ProductActions;