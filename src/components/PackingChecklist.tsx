import React, { useState } from 'react';
import { ChecklistItem } from '../types/travel';
import { Check, Plus, Trash2, CheckCircle2, ListFilter } from 'lucide-react';

interface PackingChecklistProps {
  initialItems: ChecklistItem[];
  onUpdateItems: (items: ChecklistItem[]) => void;
}

export const PackingChecklist: React.FC<PackingChecklistProps> = ({
  initialItems,
  onUpdateItems
}) => {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem['category']>('Trip Specific');

  const categories: ChecklistItem['category'][] = [
    'Documents & Money',
    'Clothing & Wearables',
    'Toiletries & Hygiene',
    'Electronics & Gadgets',
    'Health & First Aid',
    'Trip Specific'
  ];

  const handleToggle = (id: string) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setItems(updated);
    onUpdateItems(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: 'custom-' + Date.now(),
      category: newItemCategory,
      text: newItemText.trim(),
      isChecked: false,
      isCustom: true
    };

    const updated = [...items, newItem];
    setItems(updated);
    onUpdateItems(updated);
    setNewItemText('');
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    onUpdateItems(updated);
  };

  const completedCount = items.filter(i => i.isChecked).length;
  const totalCount = items.length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = items.filter(item => {
    if (filter === 'pending') return !item.isChecked;
    if (filter === 'completed') return item.isChecked;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
      {/* Header with Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Pre-Trip Preparation</span>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Interactive Packing Checklist</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Check off essentials as you pack or add your own custom items.
          </p>
        </div>

        {/* Progress Display */}
        <div className="sm:text-right min-w-44">
          <div className="flex items-center sm:justify-end gap-2 text-sm font-semibold text-slate-900">
            <span>{completedCount} of {totalCount} Packed</span>
            <span className="text-xs text-emerald-700 font-mono">({percentComplete}%)</span>
          </div>
          <div className="w-full sm:w-48 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Add Item Input */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Interactive Filter Tabs (allowed buttons for functional filtering) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Items ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'pending' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            To Pack ({totalCount - completedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'completed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Packed ({completedCount})
          </button>
        </div>

        {/* Add custom item form */}
        <form onSubmit={handleAddItem} className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as ChecklistItem['category'])}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add custom item..."
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 flex-1 sm:w-48"
          />
          <button
            type="submit"
            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs flex items-center justify-center shrink-0"
            title="Add item"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Categorized List */}
      <div className="space-y-6 pt-2">
        {categories.map((category) => {
          const categoryItems = filteredItems.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggle(item.id)}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      item.isChecked
                        ? 'bg-emerald-50/40 border-emerald-200/80 text-slate-500'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 pr-2">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                          item.isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {item.isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs leading-relaxed ${item.isChecked ? 'line-through opacity-70' : ''}`}>
                        {item.text}
                      </span>
                    </div>

                    {item.isCustom && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-400">
            No items in this filter view.
          </div>
        )}
      </div>
    </div>
  );
};
