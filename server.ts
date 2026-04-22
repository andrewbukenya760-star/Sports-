import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });
  const PORT = 3000;

  // Use Vite in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // WebSocket for Live Scores
  wss.on('connection', (ws) => {
    console.log('New client connected to score stream');
    // Send initial data
    ws.send(JSON.stringify({ type: 'INIT', timestamp: new Date() }));

    ws.on('close', () => console.log('Client disconnected'));
  });

  // Mock Live Score Updates (M1) every 30 seconds
  setInterval(() => {
    const mockUpdate = {
      type: 'SCORE_UPDATE',
      updates: [
        { matchId: 'm1', homeScore: Math.floor(Math.random() * 3), awayScore: Math.floor(Math.random() * 3) }
      ],
      timestamp: new Date()
    };
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(mockUpdate));
      }
    });
  }, 30000);

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
