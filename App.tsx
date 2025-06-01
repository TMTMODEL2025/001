
import React, { useState, useEffect } from 'react';
import { Deposit } from './types';
import DepositForm from './components/DepositForm';
import DepositList from './components/DepositList';

const App: React.FC = () => {
  const [deposits, setDeposits] = useState<Deposit[]>(() => {
    const savedDeposits = localStorage.getItem('deposits');
    if (savedDeposits) {
      const parsedDeposits = JSON.parse(savedDeposits) as Array<Omit<Deposit, 'timestamp'> & { timestamp: string }>;
      return parsedDeposits.map(d => ({ ...d, timestamp: new Date(d.timestamp) }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('deposits', JSON.stringify(deposits));
  }, [deposits]);

  const handleAddDeposit = (name: string, imageUrl: string) => {
    const newDeposit: Deposit = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name,
      imageUrl,
      timestamp: new Date(),
    };
    setDeposits((prevDeposits) => [...prevDeposits, newDeposit]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-50 py-6 sm:py-12">
      <header className="mb-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-2xl text-center">
            <h1 className="text-3xl sm:text-4xl font-bold">ระบบจัดการเงินฝาก</h1>
            <p className="mt-2 text-sm sm:text-base opacity-90">บันทึกรายการฝากของคุณอย่างง่ายดายและสวยงาม</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4">
        <DepositForm onAddDeposit={handleAddDeposit} />
        <DepositList deposits={deposits} />
      </main>

      <footer className="text-center mt-12 py-6">
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Deposit Management App. Modern UI by AI.</p>
      </footer>
    </div>
  );
};

export default App;
