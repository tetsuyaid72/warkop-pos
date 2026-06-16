"use client";

type CompressOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  type?: string;
};

/**
 * Compresses an image File or data URL string to a smaller data URL.
 * Resizes to max dimension and reduces JPEG quality to stay under ~200KB.
 */
export async function compressImage(
  source: File | string,
  options: CompressOptions = {},
): Promise<string> {
  const maxWidth = options.maxWidth ?? 800;
  const maxHeight = options.maxHeight ?? 800;
  const quality = options.quality ?? 0.75;
  const type = options.type ?? "image/jpeg";

  const dataUrl: string =
    typeof source === "string" ? source : await fileToDataUrl(source);

  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      try {
        const result: string = canvas.toDataURL(type, quality);
        resolve(result);
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function dataUrlSize(dataUrl: string): number {
  if (!dataUrl.startsWith("data:")) return dataUrl.length;
  const base64: string = dataUrl.split(",")[1] ?? "";
  return Math.ceil((base64.length * 3) / 4);
}

export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    if (err instanceof DOMException && err.name === "QuotaExceededError") {
      return false;
    }
    throw err;
  }
}