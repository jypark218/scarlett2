import { useState } from 'react';
import { Package, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { itemDataMap } from '../data/itemData';

interface InventoryItem {
  name: string;
  description: string;
}

interface InventoryProps {
  items: string[];
  maxSlots?: number;
  viewedItems: string[];
  onItemViewed: (item: string) => void;
  iconOnly?: boolean; // 아이콘만 표시할지 여부
}

export function Inventory({ items, maxSlots = 12, viewedItems, onItemViewed, iconOnly = false }: InventoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(selectedItem === item ? null : item);
    // 아이템을 클릭하면 확인한 것으로 표시
    if (!viewedItems.includes(item)) {
      onItemViewed(item);
    }
  };
  
  // 확인하지 않은 아이템 수
  const unviewedCount = items.filter(item => !viewedItems.includes(item)).length;

  return (
    <>
      {/* Inventory Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100 relative px-2 sm:px-3"
      >
        <Package className={`size-3 sm:size-4 ${iconOnly ? '' : 'sm:mr-2'}`} />
        {!iconOnly && <span className="hidden sm:inline">인벤토리</span>}
        {unviewedCount > 0 && (
          <span className="absolute -top-1 -right-1 size-4 sm:size-5 bg-blue-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center animate-pulse">
            {unviewedCount}
          </span>
        )}
      </Button>

      {/* Inventory Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="bg-slate-800 border-slate-700 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Package className="size-6 text-slate-300" />
                <h2 className="text-slate-100">
                  인벤토리
                </h2>
                {items.length > 0 && (
                  <span className="text-slate-400 text-sm">
                    ({items.length}/{maxSlots})
                  </span>
                )}
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-slate-100"
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Empty State - Show when no items */}
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                <Package className="size-16 sm:size-20 text-slate-700 mb-4" />
                <p className="text-slate-500 text-base sm:text-lg">
                  인벤토리가 비어있습니다
                </p>
                <p className="text-slate-600 text-xs sm:text-sm mt-2">
                  선택지를 통해 아이템을 획득할 수 있습니다
                </p>
              </div>
            ) : (
              <>
                {/* Inventory Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {Array.from({ length: maxSlots }).map((_, index) => {
                    const item = items[index];
                    const hasItem = !!item;
                    const isNew = hasItem && !viewedItems.includes(item);

                    return (
                      <div key={index} className="relative">
                        <button
                          onClick={() => hasItem && handleItemClick(item)}
                          disabled={!hasItem}
                          className={`
                            w-full aspect-square rounded-lg border-2 transition-all duration-200
                            ${hasItem 
                              ? 'border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700 cursor-pointer' 
                              : 'border-slate-800 bg-slate-900/30 cursor-default'
                            }
                            ${selectedItem === item ? 'border-slate-400 bg-slate-600' : ''}
                          `}
                        >
                          {hasItem && (() => {
                            const itemInfo = itemDataMap[item];
                            return (
                              <div className="flex flex-col items-center justify-center h-full p-2">
                                <Package className="size-6 sm:size-8 text-slate-300 mb-1" />
                                <p className="text-xs text-slate-300 text-center line-clamp-2">
                                  {itemInfo?.name || item}
                                </p>
                              </div>
                            );
                          })()}
                        </button>
                        {/* New Item Badge */}
                        {isNew && (
                          <div className="absolute -top-1 -right-1 size-5 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                            <Sparkles className="size-3 text-white" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Item Tooltip Modal */}
      {selectedItem && (() => {
        const itemInfo = itemDataMap[selectedItem];
        return (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm safe-area-inset"
            onClick={() => setSelectedItem(null)}
          >
            <Card 
              className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-blue-600/50 p-6 w-full max-w-md shadow-2xl shadow-blue-900/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Item Image */}
              {itemInfo && itemInfo.imageUrl && (
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-slate-950">
                    <img
                      src={itemInfo.imageUrl}
                      alt={selectedItem}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  {/* Vignette effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60" />
                </div>
              )}

              {/* Item Name */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <Package className="size-5 text-blue-400" />
                <h3 className="text-center text-slate-100">
                  {itemInfo?.name || selectedItem}
                </h3>
              </div>

              {/* Item Description */}
              <p className="text-slate-400 text-sm leading-relaxed text-center mb-6">
                {itemInfo?.summaryDescription || itemInfo?.description || '알 수 없는 아이템입니다.'}
              </p>

              {/* Close Button */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setSelectedItem(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  닫기
                </Button>
              </div>
            </Card>
          </div>
        );
      })()}
    </>
  );
}