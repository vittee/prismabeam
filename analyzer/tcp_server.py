import socket
import threading
import msgpack


class TcpServer:
    def __init__(self, port: int, on_connect=None):
        self._port = port
        self._clients: list[socket.socket] = []
        self._lock = threading.Lock()
        self._on_connect = on_connect

    def start(self):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        sock.bind(('0.0.0.0', self._port))
        sock.listen(16)
        threading.Thread(target=self._accept_loop, args=(sock,), daemon=True).start()

    def _accept_loop(self, sock: socket.socket):
        while True:
            conn, addr = sock.accept()
            conn.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
            with self._lock:
                self._clients.append(conn)
            if self._on_connect:
                self._on_connect(conn)
            threading.Thread(target=self._drain_loop, args=(conn,), daemon=True).start()

    def _drain_loop(self, conn: socket.socket):
        try:
            while True:
                data = conn.recv(1024)
                if not data:
                    break
        except OSError:
            pass
        finally:
            with self._lock:
                try:
                    self._clients.remove(conn)
                except ValueError:
                    pass
            try:
                conn.close()
            except OSError:
                pass

    def send(self, conn: socket.socket, msg: dict):
        data = msgpack.packb(msg, use_bin_type=True)
        frame = len(data).to_bytes(4, 'big') + data
        try:
            conn.sendall(frame)
        except OSError:
            pass

    def broadcast(self, msg: dict):
        data = msgpack.packb(msg, use_bin_type=True)
        frame = len(data).to_bytes(4, 'big') + data
        with self._lock:
            clients = list(self._clients)
        for conn in clients:
            try:
                conn.sendall(frame)
            except OSError:
                pass
