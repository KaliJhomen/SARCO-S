'use client'
import React from 'react';
import { Mail, Gift } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="animate-fade-in-up animation-delay-200">
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="relative px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icono */}


            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¡No Te Pierdas Nuestras Novedades!
            </h2>
            
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Recibe las mejores ofertas, lanzamientos e informes directamente en tu correo
            </p>

            {/* Formulario */}
            {!subscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Tu correo"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-700 outline-none focus:ring-4 focus:ring-white/30 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
                  >
                    Suscribirme
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto p-4 bg-white/20 backdrop-blur-sm rounded-lg">
                <p className="text-white font-semibold text-lg">
                    ¡Gracias por suscribirte! Revisa tu correo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;