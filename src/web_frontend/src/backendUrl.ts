const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT ?? '3001';

export function backendHttpUrl(): string {
  return `http://${window.location.hostname}:${BACKEND_PORT}`;
}

export function backendWsHost(): string {
  return `${window.location.hostname}:${BACKEND_PORT}`;
}
