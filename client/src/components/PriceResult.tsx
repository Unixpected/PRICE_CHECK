import { PriceItem } from '@/contexts/PriceDataContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface PriceResultProps {
  item: PriceItem | null;
  barcode: string;
  onClose: () => void;
  notFound?: boolean;
}

export function PriceResult({ item, barcode, onClose, notFound }: PriceResultProps) {
  if (!item && !notFound) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-none border-2 border-foreground">
        {notFound ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-mono font-bold">Product Not Found</h3>
                <p className="text-sm text-muted-foreground">SKU: {barcode}</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full rounded-none"
            >
              Close
            </Button>
          </div>
        ) : item ? (
          <div className="p-6 space-y-4">
            {/* Header with success indicator */}
            <div className="flex items-start gap-3">
              <CheckCircle className="w-8 h-8 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-mono font-bold text-lg">{item.citem}</h3>
                <p className="text-xs text-muted-foreground mt-1">SKU: {item.sku}</p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price display */}
            <div className="bg-muted p-4 rounded-none border border-border">
              <p className="text-xs font-mono text-muted-foreground mb-1">Price</p>
              <p className="price-display text-accent">₱{item.mprice}</p>
            </div>

            {/* Product details grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-none border border-border">
                <p className="text-xs font-mono text-muted-foreground">UOM</p>
                <p className="font-mono font-bold mt-1">{item.cuom}</p>
              </div>
              <div className="p-3 bg-muted rounded-none border border-border">
                <p className="text-xs font-mono text-muted-foreground">STD PK</p>
                <p className="font-mono font-bold mt-1">{item.istdpk}</p>
              </div>
              <div className="p-3 bg-muted rounded-none border border-border col-span-2">
                <p className="text-xs font-mono text-muted-foreground">POS18</p>
                <p className="font-mono font-bold mt-1">{item.pos18}</p>
              </div>
            </div>

            {/* Barcode info */}
            <div className="p-3 bg-muted rounded-none border border-border">
              <p className="text-xs font-mono text-muted-foreground">Barcode/CUPC</p>
              <p className="font-mono font-bold mt-1 break-all">{item.cupc || barcode}</p>
            </div>

            <Button
              onClick={onClose}
              className="w-full rounded-none bg-accent hover:bg-accent/90"
            >
              Close
            </Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
