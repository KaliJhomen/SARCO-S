import React from "react";

const ProductDescription = ({ descripcion, especificaciones }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Descripción del producto
    </h2>
    <p className="text-gray-700 mb-4">
      {descripcion || 'Sin descripción detallada'}
    </p>
    {especificaciones && (
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Especificaciones
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {especificaciones.map((spec, index) => (
            <li key={index} className="text-gray-700">
              {spec}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default ProductDescription;