import Image from 'next/image';
import rightImage from '../images/right.png';
import leftImage from '../images/left.png';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] absolute top-0 left-0 w-full h-full bg-slate-800 flex flex-col">
      <div className="h-[calc(100%-5rem)] w-full flex">
        <div className="bg-gradient-to-r from-red-900 to-red-800 h-full w-1/2 overflow-hidden">
          <img
            src={leftImage.src}
            alt="left"
            className="h-full mix-blend-luminosity opacity-30 max-h-full"
          />
        </div>
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 h-full w-1/2">
          <img
            src={rightImage.src}
            alt="left"
            className="h-full mix-blend-luminosity opacity-30 max-h-full"
          />
        </div>
      </div>
      <div className="bg-slate-900 h-20 border-top border-slate-800 flex gap-4 p-4 items-center justify-between">
        <div className="text-slate-200 whitespace-nowrap">
          Skriv melding:
        </div>
        <input className="border border-slate-800 rounded-md px-4 py-2 w-full bg-slate-900 text-slate-200" />
        <button className="bg-slate-800 text-white px-4 py-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}
