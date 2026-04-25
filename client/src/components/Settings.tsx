import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePriceData } from '@/contexts/PriceDataContext';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { toast } from 'sonner';

export function Settings() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const { csvUrl, loadCsvData, loading } = usePriceData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    try {
      await loadCsvData(url);
      toast.success('CSV loaded successfully');
      setOpen(false);
      setUrl('');
    } catch (err) {
      toast.error('Failed to load CSV');
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-none"
      >
        <SettingsIcon className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-none">
          <DialogHeader>
            <DialogTitle className="font-mono">CSV Configuration</DialogTitle>
            <DialogDescription>
              Connect to your GitHub CSV file for price data
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-mono font-bold">GitHub CSV URL</label>
              <Input
                type="url"
                placeholder="https://raw.githubusercontent.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="font-mono text-sm rounded-none"
              />
              <p className="text-xs text-muted-foreground">
                Use the raw content URL from GitHub. Example: https://raw.githubusercontent.com/username/repo/main/prices.csv
              </p>
            </div>

            {csvUrl && (
              <div className="p-3 bg-muted rounded-none border border-border">
                <p className="text-xs font-mono">Current URL:</p>
                <p className="text-xs break-all text-muted-foreground mt-1">{csvUrl}</p>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-none bg-accent hover:bg-accent/90"
              >
                {loading ? 'Loading...' : 'Load CSV'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
