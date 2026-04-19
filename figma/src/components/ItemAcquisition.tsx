import { Package, X, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ItemInfo } from '../data/itemData';

interface ItemAcquisitionProps {
  item: ItemInfo;
  onClose: () => void;
}

export function ItemAcquisition({ item, onClose }: ItemAcquisitionProps) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm safe-area-inset animate-in fade-in duration-300 p-4 py-safe-top pb-safe-bottom">
      <Card className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-blue-600/50 shadow-2xl shadow-blue-900/50 w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Package className="size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-blue-400 text-sm">아이템 획득</p>
              <h3 className="text-slate-100">{item.name}</h3>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-slate-100"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6">
          {/* Item Image */}
          <div className="relative mb-6 rounded-lg overflow-hidden">
            <div className="aspect-video bg-slate-950">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
          </div>

          {/* Dialogue Box */}
          <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-4">
            {/* Acquisition Message - No portrait, no name, instant display */}
            <div className="mb-3">
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {item.acquireMessage}
              </p>
            </div>
            
            {/* Item Description */}
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-slate-500 text-sm italic">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed */}
        <div className="flex gap-2 justify-end p-6 pt-4 flex-shrink-0 border-t border-slate-700/50">
          <Button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            확인
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}