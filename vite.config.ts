import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function apiServerPlugin(): Plugin {
  return {
    name: 'api-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/api/generate-itinerary') {
          return next();
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        let handled = false;

        const completeWithFallback = async (preferences: any) => {
          if (handled) return;
          handled = true;
          try {
            const { handleGenerateItinerary } = await import('./server/apiHandler.ts');
            const result = await handleGenerateItinerary(preferences || {});
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (e: any) {
            const { generateSmartCuratedItinerary } = await import('./src/utils/curatedTravelEngine.ts');
            const fallback = generateSmartCuratedItinerary(preferences || {});
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(fallback));
          }
        };

        // Safety timeout in case client stream stalls
        const streamTimeout = setTimeout(() => {
          try {
            const parsed = body ? JSON.parse(body) : {};
            completeWithFallback(parsed);
          } catch {
            completeWithFallback({});
          }
        }, 5000);

        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          clearTimeout(streamTimeout);
          try {
            const preferences = body ? JSON.parse(body) : {};
            await completeWithFallback(preferences);
          } catch {
            await completeWithFallback({});
          }
        });

        req.on('error', async () => {
          clearTimeout(streamTimeout);
          await completeWithFallback({});
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
