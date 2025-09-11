import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import type { TabItem } from '@/types';

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  persistSelection?: boolean;
  storageKey?: string;
}

export const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  defaultTabId, 
  persistSelection = false, 
  storageKey = 'active-tab' 
}) => {
  const getInitialTab = () => {
    if (typeof window !== 'undefined' && persistSelection) {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get('tab');
      if (urlTab && tabs.some(t => t.id === urlTab && !t.disabled)) return urlTab;

      const savedTab = localStorage.getItem(storageKey);
      if (savedTab && tabs.some(t => t.id === savedTab && !t.disabled)) return savedTab;
    }
    return defaultTabId || tabs.find(t => !t.disabled)?.id || '';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs]);
  
  useEffect(() => {
    if (persistSelection) {
      localStorage.setItem(storageKey, activeTab);
      const params = new URLSearchParams(window.location.search);
      params.set('tab', activeTab);
      // Use replaceState to avoid adding to browser history for tab changes
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  }, [activeTab, persistSelection, storageKey]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;
    const availableTabs = tabs.map((t, i) => t.disabled ? -1 : i).filter(i => i !== -1);
    const currentTabIndex = availableTabs.indexOf(index);

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = availableTabs[(currentTabIndex + 1) % availableTabs.length];
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = availableTabs[(currentTabIndex - 1 + availableTabs.length) % availableTabs.length];
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = availableTabs[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = availableTabs[availableTabs.length - 1];
    }

    const nextTab = tabRefs.current[newIndex];
    if (nextTab) {
      nextTab.focus();
    }
  };

  return (
    <div className="w-full">
      <div 
        role="tablist" 
        aria-label="Information categories" 
        className="flex lg:space-x-2 border-b border-slate-200 flex-col lg:flex-row"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            ref={el => { tabRefs.current[index] = el; }}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={tab.disabled}
            className={`flex items-center justify-center lg:justify-start text-left w-full lg:w-auto px-4 py-3 font-medium text-sm transition-all duration-200 outline-none -mb-px
              ${activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'border-b-2 border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }
              ${tab.disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-t-lg'
              }
            `}
          >
            {tab.icon && <span className="mr-2 h-5 w-5 flex-shrink-0">{tab.icon}</span>}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className={`w-full bg-white p-4 sm:p-6 rounded-b-lg border border-t-0 border-slate-200 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              ${activeTab === tab.id ? 'animate-tab-panel-enter' : ''}
            `}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
