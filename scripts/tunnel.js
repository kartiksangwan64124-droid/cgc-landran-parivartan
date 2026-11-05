import localtunnel from 'localtunnel';

const PORT = 4173;
const SUBDOMAIN = 'cgc-landran-campus';

let currentTunnel = null;

async function startTunnel() {
  try {
    if (currentTunnel) {
      try {
        currentTunnel.close();
      } catch (_) {}
    }
    console.log(`[Tunnel] Connecting to Localtunnel for port ${PORT}...`);
    currentTunnel = await localtunnel({ port: PORT, subdomain: SUBDOMAIN });
    console.log(`[Tunnel] LIVE PUBLIC URL: ${currentTunnel.url}`);

    currentTunnel.on('close', () => {
      console.warn('[Tunnel] Connection closed. Reconnecting in 3s...');
      setTimeout(startTunnel, 3000);
    });

    currentTunnel.on('error', (err) => {
      console.error('[Tunnel] Error:', err.message);
      setTimeout(startTunnel, 3000);
    });
  } catch (err) {
    console.error('[Tunnel] Init error:', err.message);
    setTimeout(startTunnel, 5000);
  }
}

startTunnel();

// Keep Node.js process alive indefinitely
setInterval(() => {}, 1000 * 60 * 60);
