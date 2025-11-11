'use client';
import { useState } from 'react';
import * as api from '@/lib/api';

export default function TestAPIPage() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [token, setToken] = useState('');

  const runTest = async (name, testFn) => {
    setLoading(prev => ({ ...prev, [name]: true }));
    try {
      const result = await testFn();
      setResults(prev => ({ 
        ...prev, 
        [name]: { success: true, data: result } 
      }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [name]: { success: false, error: error.message } 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [name]: false }));
    }
  };

  const tests = {
    // PRODUCTOS
    'getAllProducts': () => api.productService.getAll(),
    'getProductById': () => api.productService.getById(1),
    'getInStock': () => api.productService.getInStock(),
    'searchProducts': () => api.productService.search('laptop'),
    'getByBrand': () => api.productService.getByBrand(1),
    'getByCategory': () => api.productService.getByCategory(1),
    
    // MARCAS
    'getAllBrands': () => api.brandService.getAll(),
    'getBrandById': () => api.brandService.getById(1),
    
    // CATEGORÍAS
    'getAllCategories': () => api.categoryService.getAll(),
    'getCategoryById': () => api.categoryService.getById(1),
    
    // AUTH (requiere credenciales)
    'login': () => api.authService.login({ 
      email: 'test@test.com', 
      password: 'password123' 
    }),
    'getMe': () => api.authService.getMe(token),
  };

  const runAllTests = async () => {
    for (const [name, testFn] of Object.entries(tests)) {
      await runTest(name, testFn);
      // Esperar 200ms entre requests para no saturar el servidor
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">API Testing Dashboard</h1>

      {/* Token input */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <label className="block text-sm font-medium mb-2">
          Token (para endpoints protegidos):
        </label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Pega el token aquí..."
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {/* Botones de control */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={runAllTests}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          🚀 Ejecutar todas las pruebas
        </button>
        
        <button
          onClick={() => setResults({})}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          🗑️ Limpiar resultados
        </button>
      </div>

      {/* Grid de tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(tests).map(([name, testFn]) => (
          <div key={name} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{name}</h3>
              
              {results[name] && (
                <span className={`text-2xl ${results[name].success ? '✅' : '❌'}`}>
                  {results[name].success ? '✅' : '❌'}
                </span>
              )}
            </div>

            <button
              onClick={() => runTest(name, testFn)}
              disabled={loading[name]}
              className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading[name] ? '⏳ Probando...' : '▶️ Ejecutar'}
            </button>

            {results[name] && (
              <div className="mt-3">
                {results[name].success ? (
                  <div>
                    <p className="text-green-600 text-sm font-medium mb-1">
                      ✅ Exitoso
                    </p>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(results[name].data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div>
                    <p className="text-red-600 text-sm font-medium mb-1">
                      ❌ Error
                    </p>
                    <p className="text-red-500 text-xs">
                      {results[name].error}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Estadísticas */}
      {Object.keys(results).length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-2">📊 Estadísticas</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {Object.keys(results).length}
              </p>
              <p className="text-sm text-gray-600">Total ejecutados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {Object.values(results).filter(r => r.success).length}
              </p>
              <p className="text-sm text-gray-600">Exitosos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                {Object.values(results).filter(r => !r.success).length}
              </p>
              <p className="text-sm text-gray-600">Fallidos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}