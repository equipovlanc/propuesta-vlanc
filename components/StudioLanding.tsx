
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sanityClient from '../sanity/client';
import AnimatedSection from './AnimatedSection';

const StudioLanding: React.FC = () => {
  const [projectCode, setProjectCode] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const query = `*[_type == "proposal"][0]{ "logoUrl": logos.mainLogo.asset->url }`;
        const result = await sanityClient.fetch<{ logoUrl: string }>(query);
        if (result?.logoUrl) {
          setLogoUrl(result.logoUrl);
        } else {
          setError('No se pudo encontrar el logo. Verifica la configuración en Sanity.');
        }
      } catch (err) {
        setError('Error al cargar el logo desde Sanity.');
        console.error('Sanity fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogo();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (projectCode.trim()) {
        window.location.href = `/${projectCode.trim()}`;
      }
    }
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
        <div className="w-full max-w-md text-center">
          {isLoading && <p>Cargando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          {logoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={logoUrl} alt="Vlanc Logo" className="mx-auto mb-8 w-48" />
            </motion.div>
          )}

          {!isLoading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <input
                type="text"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Por favor introduce aquí tu código"
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-black outline-none text-center transition-colors duration-300"
              />
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-4 text-center w-full">
          <p className="text-xs text-gray-800 text-opacity-50">
            Para una experiencia óptima activa la pantalla completa (Tecla F11).
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default StudioLanding;
