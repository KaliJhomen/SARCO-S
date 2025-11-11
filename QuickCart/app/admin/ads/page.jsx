'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function AdsManagement() {
  const [ads, setAds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    imagen: null,
    link: '',
    activo: true,
    fechaInicio: '',
    fechaFin: '',
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Cargar anuncios (simulado - reemplazar con API)
  useEffect(() => {
    // Aquí irá la llamada a tu API
    const mockAds = [
      {
        id: 1,
        titulo: 'Mega Sale 50% OFF',
        descripcion: 'Descuentos en toda la tienda',
        imagen: '/ads/sale1.jpg',
        link: '/ofertas',
        activo: true,
        fechaInicio: '2025-11-01',
        fechaFin: '2025-11-30',
        vistas: 1250,
      },
    ];
    setAds(mockAds);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imagen: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAd) {
      // Actualizar anuncio existente
      setAds(prev => prev.map(ad => 
        ad.id === editingAd.id 
          ? { ...ad, ...formData, id: editingAd.id }
          : ad
      ));
    } else {
      // Crear nuevo anuncio
      const newAd = {
        ...formData,
        id: Date.now(),
        vistas: 0,
      };
      setAds(prev => [...prev, newAd]);
    }

    resetForm();
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setFormData({
      titulo: ad.titulo,
      descripcion: ad.descripcion,
      imagen: null,
      link: ad.link,
      activo: ad.activo,
      fechaInicio: ad.fechaInicio,
      fechaFin: ad.fechaFin,
    });
    setPreviewImage(ad.imagen);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este anuncio?')) {
      setAds(prev => prev.filter(ad => ad.id !== id));
    }
  };

  const toggleActive = (id) => {
    setAds(prev => prev.map(ad => 
      ad.id === id ? { ...ad, activo: !ad.activo } : ad
    ));
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      imagen: null,
      link: '',
      activo: true,
      fechaInicio: '',
      fechaFin: '',
    });
    setPreviewImage(null);
    setEditingAd(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Anuncios</h1>
            <p className="text-gray-600 mt-1">Administra los banners y promociones</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Nuevo Anuncio
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Anuncios</p>
            <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Activos</p>
            <p className="text-2xl font-bold text-green-600">
              {ads.filter(a => a.activo).length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Inactivos</p>
            <p className="text-2xl font-bold text-red-600">
              {ads.filter(a => !a.activo).length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Vistas</p>
            <p className="text-2xl font-bold text-blue-600">
              {ads.reduce((sum, ad) => sum + ad.vistas, 0)}
            </p>
          </div>
        </div>

        {/* Lista de Anuncios */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {ads.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">No hay anuncios registrados</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 text-blue-600 hover:underline"
              >
                Crear primer anuncio
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Preview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vigencia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vistas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ads.map((ad) => (
                    <tr key={ad.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-20 h-12 bg-gray-100 rounded overflow-hidden relative">
                          {ad.imagen && (
                            <Image
                              src={ad.imagen}
                              alt={ad.titulo}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{ad.titulo}</p>
                          <p className="text-sm text-gray-500">{ad.descripcion}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar size={14} />
                          <span>{ad.fechaInicio}</span>
                          <span>→</span>
                          <span>{ad.fechaFin}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          {ad.vistas.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(ad.id)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            ad.activo
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {ad.activo ? (
                            <>
                              <Eye size={12} /> Activo
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} /> Inactivo
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(ad)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(ad.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Formulario */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAd ? 'Editar Anuncio' : 'Nuevo Anuncio'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.titulo}
                  onChange={(e) => handleInputChange('titulo', e.target.value)}
                  placeholder="Ej: Mega Sale 50% OFF"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  placeholder="Breve descripción del anuncio"
                />
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen del Banner <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {previewImage ? (
                    <div className="relative w-full h-40 bg-gray-100 rounded overflow-hidden mb-2">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon className="mx-auto text-gray-400 mb-2" size={40} />
                      <p className="text-sm text-gray-600">No hay imagen seleccionada</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link de Destino
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  placeholder="/ofertas"
                />
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha Inicio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.fechaInicio}
                    onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha Fin <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.fechaFin}
                    onChange={(e) => handleInputChange('fechaFin', e.target.value)}
                  />
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activo"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  checked={formData.activo}
                  onChange={(e) => handleInputChange('activo', e.target.checked)}
                />
                <label htmlFor="activo" className="text-sm font-medium text-gray-700">
                  Anuncio activo
                </label>
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingAd ? 'Actualizar' : 'Crear'} Anuncio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}