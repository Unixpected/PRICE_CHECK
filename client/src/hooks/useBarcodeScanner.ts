import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    ZXing: any;
  }
}

export function useBarcodeScanner(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onScan: (barcode: string) => void,
  enabled: boolean = true
) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const codeReaderRef = useRef<any>(null);
  const scanningRef = useRef(false);

  const startScanning = useCallback(async () => {
    if (!videoRef.current || !enabled) return;

    try {
      setError(null);
      setScanning(true);
      scanningRef.current = true;

      // Initialize ZXing code reader
      const codeReader = new window.ZXing.BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      // Get camera stream
      const devices = await codeReader.listVideoInputDevices();
      if (devices.length === 0) {
        throw new Error('No camera device found');
      }

      // Use back camera if available, otherwise use first device
      const selectedDevice = devices.find((d: any) => d.label.toLowerCase().includes('back')) || devices[0];

      // Decode from video
      const result = await codeReader.decodeFromVideoDevice(
        selectedDevice.deviceId,
        videoRef.current,
        (result: any, err: any) => {
          if (result && scanningRef.current) {
            const barcode = result.getText();
            if (barcode) {
              onScan(barcode);
              // Add a small delay to prevent multiple scans of the same barcode
              scanningRef.current = false;
              setTimeout(() => {
                scanningRef.current = true;
              }, 500);
            }
          }
          if (err && !(err instanceof window.ZXing.NotFoundException)) {
            console.error('Scanning error:', err);
          }
        }
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start camera';
      setError(errorMessage);
      setScanning(false);
    }
  }, [videoRef, enabled, onScan]);

  const stopScanning = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    setScanning(false);
    scanningRef.current = false;
  }, []);

  useEffect(() => {
    if (enabled && !scanning) {
      startScanning();
    }

    return () => {
      stopScanning();
    };
  }, [enabled, startScanning, stopScanning, scanning]);

  return { scanning, error, startScanning, stopScanning };
}
