const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function getArticulos() {
  const res = await fetch(`${BASE_URL}/articulo`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener artículos');
  return res.json();
}
