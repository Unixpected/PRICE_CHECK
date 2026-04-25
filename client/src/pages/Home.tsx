import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Scanner } from '@/components/Scanner';
import { PriceResult } from '@/components/PriceResult';
import { Settings } from '@/components/Settings';
import { usePriceData, PriceItem } from '@/contexts/PriceDataContext';
import { Camera, Search, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Industrial Minimalism Design:
 * - Stark contrast palette (white background, deep charcoal text, emerald accents)
 * - Grid-based precision layout with asymmetric split-screen
 * - Monospace typography for data/prices
 * - Rapid interaction with minimal friction
 */
export default function Home() {
  const { items, loading, error: dataError, csvUrl, searchByBarcode } = usePriceData();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualSku, setManualSku] = useState('');
  const [selectedItem, setSelectedItem] = useState<PriceItem | null>(null);
  const [lastScannedBarcode, setLastScannedBarcode] = useState('');
  const [notFound, setNotFound] = useState(false);

  const handleScan = (barcode: string) => {
    setLastScannedBarcode(barcode);
    const result = searchByBarcode(barcode);
    if (result) {
      setSelectedItem(result);
      setNotFound(false);
    } else {
      setSelectedItem(null);
      setNotFound(true);
    }
    setScannerOpen(false);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSku.trim()) {
      toast.error('Please enter a SKU');
      return;
    }
    handleScan(manualSku);
    setManualSku('');
  };

  const handleCloseResult = () => {
    setSelectedItem(null);
    setNotFound(false);
    setLastScannedBarcode('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-mono font-bold">PRICE VERIFIER</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Scan barcodes or search SKUs to verify prices
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Status Section */}
        {!csvUrl && (
          <Card className="mb-6 p-6 rounded-none border-2 border-destructive bg-destructive/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-mono font-bold">No CSV Loaded</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the settings icon to configure your GitHub CSV URL
                </p>
              </div>
            </div>
          </Card>
        )}

        {dataError && (
          <Card className="mb-6 p-6 rounded-none border-2 border-destructive bg-destructive/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-mono font-bold">Error Loading CSV</h3>
                <p className="text-sm text-muted-foreground mt-1">{dataError}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Scanner Controls */}
          <div className="space-y-6">
            <Card className="p-6 rounded-none border-2 border-foreground">
              <h2 className="font-mono font-bold text-lg mb-4">Scan Barcode</h2>
              <Button
                onClick={() => setScannerOpen(true)}
                disabled={!csvUrl || loading}
                className="w-full rounded-none bg-accent hover:bg-accent/90 text-accent-foreground h-12 font-mono font-bold text-base"
              >
                <Camera className="w-5 h-5 mr-2" />
                Open Camera
              </Button>
            </Card>

            {/* Manual Search */}
            <Card className="p-6 rounded-none border-2 border-foreground">
              <h2 className="font-mono font-bold text-lg mb-4">Manual Search</h2>
              <form onSubmit={handleManualSearch} className="space-y-3">
                <Input
                  type="text"
                  placeholder="Enter SKU or Barcode"
                  value={manualSku}
                  onChange={(e) => setManualSku(e.target.value)}
                  disabled={!csvUrl || loading}
                  className="rounded-none font-mono"
                />
                <Button
                  type="submit"
                  disabled={!csvUrl || loading}
                  variant="outline"
                  className="w-full rounded-none"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </form>
            </Card>

            {/* Database Status */}
            <Card className="p-6 rounded-none border border-border bg-muted">
              <h3 className="font-mono font-bold text-sm mb-3">Database Status</h3>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Products Loaded:</span>
                  <span className="font-bold">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-bold">
                    {loading ? 'Loading...' : csvUrl ? 'Ready' : 'Not Configured'}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Information Panel */}
          <div className="space-y-6">
            {selectedItem ? (
              <Card className="p-6 rounded-none border-2 border-accent">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-mono font-bold text-lg">{selectedItem.citem}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      SKU: {selectedItem.sku}
                    </p>
                  </div>

                  <div className="bg-accent/10 p-4 rounded-none border-2 border-accent">
                    <p className="text-xs font-mono text-muted-foreground mb-1">Price</p>
                    <p className="price-display text-accent">₱{selectedItem.mprice}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-none border border-border">
                      <p className="text-xs font-mono text-muted-foreground">UOM</p>
                      <p className="font-mono font-bold mt-1">{selectedItem.cuom}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-none border border-border">
                      <p className="text-xs font-mono text-muted-foreground">STD PK</p>
                      <p className="font-mono font-bold mt-1">{selectedItem.istdpk}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-none border border-border">
                    <p className="text-xs font-mono text-muted-foreground">POS18</p>
                    <p className="font-mono font-bold mt-1">{selectedItem.pos18}</p>
                  </div>

                  <Button
                    onClick={handleCloseResult}
                    variant="outline"
                    className="w-full rounded-none"
                  >
                    Clear
                  </Button>
                </div>
              </Card>
            ) : notFound ? (
              <Card className="p-6 rounded-none border-2 border-destructive bg-destructive/5">
                <div className="text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
                  <div>
                    <h3 className="font-mono font-bold">Not Found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Barcode: {lastScannedBarcode}
                    </p>
                  </div>
                  <Button
                    onClick={handleCloseResult}
                    variant="outline"
                    className="w-full rounded-none"
                  >
                    Try Again
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 rounded-none border border-border bg-muted h-full flex items-center justify-center min-h-96">
                <div className="text-center">
                  <p className="font-mono text-muted-foreground">
                    Scan a barcode or search by SKU to view product details
                  </p>
                </div>
              </Card>
            )}

            {/* Instructions */}
            <Card className="p-6 rounded-none border border-border">
              <h3 className="font-mono font-bold text-sm mb-3">How to Use</h3>
              <ol className="space-y-2 text-sm font-mono text-muted-foreground">
                <li>1. Configure CSV in settings</li>
                <li>2. Click "Open Camera" to scan</li>
                <li>3. Point at barcode</li>
                <li>4. View price instantly</li>
              </ol>
            </Card>
          </div>
        </div>
      </main>

      {/* Scanner Modal */}
      <Scanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanResult={handleScan}
      />

      {/* Price Result Modal */}
      <PriceResult
        item={selectedItem}
        barcode={lastScannedBarcode}
        onClose={handleCloseResult}
        notFound={notFound}
      />

      {/* Settings */}
      <Settings />
    </div>
  );
}
