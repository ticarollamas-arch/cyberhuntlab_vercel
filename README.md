# CyberHunterLab — Vercel

Site institucional responsivo + tela inicial do scanner + funções serverless de integração com worker.

## Publicar na Vercel
1. Extraia o ZIP.
2. Importe a pasta/repositório na Vercel ou execute `npm install` e `npm run build`.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

## Rotas incluídas
- `/` — página inicial
- `/scanner` — formulário de nova avaliação
- `/dashboard` — atalho para a tela do scanner (placeholder)
- `/relatorios` — atalho para a tela do scanner (placeholder)
- `/login` — atalho para a tela do scanner (placeholder)
- `/privacidade` — retorna à página inicial (placeholder)
- `POST /api/scans` — encaminha pedido ao worker
- `GET /api/scans/:id` — consulta status no worker

## Conectar ao worker VPS
Em Vercel → Project → Settings → Environment Variables, configure:
- `CYBERHUNT_API_URL` = URL pública HTTPS da API do seu worker (ex.: `https://api.seudominio.com`)
- `CYBERHUNT_API_TOKEN` = token privado de integração

O worker deve implementar:
- `POST /api/scans` recebendo `{ "target": "https://dominio-autorizado.com", "authorization_confirmed": true, "source": "cyberhuntlab-vercel" }`
- `GET /api/scans/{id}` para consultar estado e resultados.

A função serverless **não executa ferramentas de segurança**. Ela valida o pedido e o encaminha ao worker VPS. Sem essas variáveis e endpoints compatíveis, a tela informa que o worker não está conectado; nenhuma varredura real será iniciada.

## Segurança
- Nunca coloque tokens no JavaScript do navegador.
- Configure o token somente nas variáveis privadas da Vercel.
- O worker deve aplicar allowlist de escopo, limites de taxa, timeout, registro de auditoria e bloqueio de testes destrutivos.
- O checkbox de autorização é uma confirmação de interface, não uma prova técnica de propriedade/autorização.
