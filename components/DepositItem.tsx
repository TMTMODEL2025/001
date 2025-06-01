
import React from 'react';
import { Deposit } from '../types';

interface DepositItemProps {
  deposit: Deposit;
}

const DepositItem: React.FC<DepositItemProps> = ({ deposit }) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-lg mb-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={deposit.imageUrl}
        alt={`รูปภาพการฝากของ ${deposit.name}`}
        className="w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-lg border border-slate-200 shadow-sm"
      />
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-cyan-800">{deposit.name}</h3>
        <p className="text-sm text-slate-600">
          {deposit.timestamp.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="text-xs text-slate-500">
          {deposit.timestamp.toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default DepositItem;
