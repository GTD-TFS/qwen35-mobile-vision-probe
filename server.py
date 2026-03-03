from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler


def main():
    host = "127.0.0.1"
    port = 5517
    server = ThreadingHTTPServer((host, port), SimpleHTTPRequestHandler)
    print(f"Serving FILIATRON at http://{host}:{port}/index.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
