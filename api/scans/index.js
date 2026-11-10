export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });
  const { target, authorizationConfirmed } = req.body || {};
  if (!authorizationConfirmed) return res.status(400).json({ error: "Confirme a autorização para avaliar o ativo." });
  let url;
  try { url = new URL(target); } catch { return res.status(400).json({ error: "URL inválida." }); }
  if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) return res.status(400).json({ error: "Informe um domínio HTTP ou HTTPS válido." });
  const base = process.env.CYBERHUNT_API_URL;
  const token = process.env.CYBERHUNT_API_TOKEN;
  if (!base || !token) return res.status(503).json({ error: "Worker ainda não conectado. Configure CYBERHUNT_API_URL e CYBERHUNT_API_TOKEN nas variáveis de ambiente da Vercel." });
  try {
    const upstream = await fetch(new URL("/api/scans", base), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ target: url.origin, authorization_confirmed: true, source: "cyberhuntlab-vercel" })
    });
    const data = await upstream.json().catch(() => ({}));
    return res.status(upstream.status).json(data);
  } catch {
    return res.status(502).json({ error: "Não foi possível alcançar o worker de segurança." });
  }
}