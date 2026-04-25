import { useRef, useState } from 'react';
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner';
import { usePriceData } from '@/contexts/PriceDataContext';
import { Button } from '@/components/ui/button';
import { AlertCircle, Camera, X } from 'lucide-react';
import { toast } from 'sonner';

interface ScannerProps {
  onScanResult: (barcode: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Scanner({ onScanResult, isOpen, onClose }: ScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannerEnabled, setScannerEnabled] = useState(isOpen);
  const { scanning, error, startScanning, stopScanning } = useBarcodeScanner(
    videoRef,
    (barcode) => {
      onScanResult(barcode);
      toast.success(`Scanned: ${barcode}`);
    },
    scannerEnabled
  );

  const handleClose = () => {
    stopScanning();
    setScannerEnabled(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-mono font-bold text-white">Scan Barcode</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="text-white hover:bg-white/10 rounded-none"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Camera Feed */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {error ? (
          <div className="flex flex-col items-center justify-center gap-4 text-white">
            <AlertCircle className="w-12 h-12" />
            <p className="font-mono text-center max-w-xs">{error}</p>
            <Button
              onClick={() => {
                setScannerEnabled(false);
                setTimeout(() => setScannerEnabled(true), 500);
              }}
              className="rounded-none bg-accent hover:bg-accent/90"
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Scanning Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-64 h-64">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent" />

                {/* Scanning line */}
                {scanning && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent scanline" />
                )}
              </div>
            </div>

            {/* Status indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-white">
              <div className="w-2 h-2 bg-accent rounded-full pulse-ring" />
              <span className="font-mono text-sm">
                {scanning ? 'Scanning...' : 'Ready'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={handleClose}
          className="rounded-none border-white/20 text-white hover:bg-white/10"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
