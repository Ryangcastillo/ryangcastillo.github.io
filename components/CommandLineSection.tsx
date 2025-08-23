
import React, { useState } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

const CodeLine: React.FC<{ command: string }> = ({ command }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between">
            <pre className="text-sm text-slate-200 overflow-x-auto"><span className="text-slate-500 select-none mr-2">$</span>{command}</pre>
            <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700">
                {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
            </button>
        </div>
    );
};

export const CommandLineSection: React.FC = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">...or my core technologies</h3>
      <div className="p-4 bg-slate-900 dark:bg-black/50 border border-slate-800 rounded-lg font-mono space-y-2 shadow-inner">
        <CodeLine command="SELECT * FROM vendor_performance WHERE spend > 10000;" />
        <CodeLine command="python process_data.py --source api --output clean.csv" />
        <CodeLine command="dax_measure = CALCULATE(SUM(FactSales[Amount]))" />
        <CodeLine command="az pipeline run --name 'Daily-ETL-Job'" />
        <CodeLine command="git commit -m 'feat: add predictive analytics model'" />
      </div>
    </section>
  );
};
