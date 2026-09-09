/// <reference types="vite/client" />

// Yandex Metrika types
interface Window {
  ym?: (counterId: number, command: string, ...args: any[]) => void;
}

declare const ym: (counterId: number, command: string, ...args: any[]) => void;
