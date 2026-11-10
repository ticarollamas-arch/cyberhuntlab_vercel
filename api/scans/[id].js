export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido." });
  const base = process.env.CYBERHUNT_API_URL, token = process.env.CYBERHUNT_API_TOKEN;
  if (!base || !token) return res.status(503).json({ error: "Worker não conectado." });
  const id = req.query.id;
  if (!id || !/^[a-zA-Z0-9_-]{1,100}$/.test(id)) return res.status(400).json({ error: "ID inválido." });
  try {
    const upstream = await fetch(new URL(`/api/scans/${encodeURIComponent(id)}`, base), { headers: { "Authorization": `Bearer ${token}` } });
    return res.status(upstream.status).json(await upstream.json().catch(() => ({})));
  } catch { return res.status(502).json({ error: "Falha ao consultar o worker." }); }
}