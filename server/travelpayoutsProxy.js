import fetch from 'node-fetch';

export default async function handler(req, res) {
  // ===== ДОБАВЛЯЕМ CORS-ЗАГОЛОВКИ =====
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем предварительный запрос (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { term } = req.query;

  if (!term || term.length < 1) {
    return res.status(400).json({ error: 'Term too short' });
  }

  const url = new URL('http://autocomplete.travelpayouts.com/places2');
  url.searchParams.append('term', term);
  url.searchParams.append('locale', 'ru');
  url.searchParams.append('types[]', 'city');
  url.searchParams.append('types[]', 'airport');

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
}
