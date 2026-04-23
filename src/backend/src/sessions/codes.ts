const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateCode(length = 4): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return code;
}

export function normalizeCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}
