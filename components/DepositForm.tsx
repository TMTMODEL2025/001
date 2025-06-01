
import React, { useState } from 'react';
import UploadIcon from './icons/UploadIcon';

interface DepositFormProps {
  onAddDeposit: (name: string, imageUrl: string) => void;
}

const DepositForm: React.FC<DepositFormProps> = ({ onAddDeposit }) => {
  const [name, setName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith('image/')) {
        setError('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        setSelectedFile(null);
        setImagePreviewUrl(null);
        event.target.value = ''; // Reset file input
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('กรุณากรอกชื่อผู้ฝาก');
      return;
    }
    if (!selectedFile || !imagePreviewUrl) {
      setError('กรุณาแนบรูปภาพ');
      return;
    }
    setError('');
    onAddDeposit(name, imagePreviewUrl);
    setName('');
    setSelectedFile(null);
    setImagePreviewUrl(null);
    // Reset file input visually. A bit hacky, but common for uncontrolled file inputs.
    const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl mb-8 transform transition-all hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-cyan-700 mb-6 text-center">เพิ่มรายการฝากใหม่</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="depositorName" className="block text-sm font-medium text-slate-700 mb-1">
            ชื่อผู้ฝาก
          </label>
          <input
            type="text"
            id="depositorName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เช่น สมชาย ใจดี"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-shadow"
          />
        </div>

        <div>
          <label htmlFor="depositImage" className="block text-sm font-medium text-slate-700 mb-1">
            แนบรูปภาพ (สลิป)
          </label>
          <input
            type="file"
            id="depositImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-slate-300 rounded-lg file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold
                       file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100
                       focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
          />
        </div>

        {imagePreviewUrl && (
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600 mb-2">ตัวอย่างรูปภาพ:</p>
            <img
              src={imagePreviewUrl}
              alt="ตัวอย่างรูปภาพที่เลือก"
              className="max-w-xs max-h-48 mx-auto rounded-lg shadow-md object-contain"
            />
          </div>
        )}
        
        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-150 ease-in-out flex items-center justify-center gap-2 group"
        >
          <UploadIcon className="w-5 h-5 group-hover:animate-pulse" />
          <span>บันทึกรายการฝาก</span>
        </button>
      </form>
    </div>
  );
};

export default DepositForm;
