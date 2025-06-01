
import React from 'react';
import { Deposit } from '../types';
import DepositItem from './DepositItem';

interface DepositListProps {
  deposits: Deposit[];
}

const DepositList: React.FC<DepositListProps> = ({ deposits }) => {
  if (deposits.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-slate-700">ยังไม่มีรายการฝาก</h3>
        <p className="mt-1 text-sm text-slate-500">เริ่มเพิ่มรายการฝากเงินของคุณได้เลย!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-cyan-700 mb-4">รายการฝากทั้งหมด ({deposits.length})</h2>
      {deposits.slice().reverse().map((deposit) => ( // Display newest first
        <DepositItem key={deposit.id} deposit={deposit} />
      ))}
    </div>
  );
};

export default DepositList;
