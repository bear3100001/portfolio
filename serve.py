"""Serve the portfolio at http://localhost:4321 with caching turned off,
so every edit shows up on a normal refresh.

    python3 serve.py
"""
import functools
import http.server
from pathlib import Path

PORT = 4321
SITE = Path(__file__).parent / "site"


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    handler = functools.partial(NoCacheHandler, directory=str(SITE))
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as server:
        print(f"Portfolio running at http://localhost:{PORT}  (Ctrl+C to stop)")
        server.serve_forever()
