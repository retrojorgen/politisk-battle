import Image from 'next/image';
import rightImage from '../images/right.png';
import leftImage from '../images/left.png';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] absolute top-0 left-0 w-full h-full bg-slate-800 flex flex-col">
      <div className="h-full w-full flex">
        <div className="bg-red-900 h-full w-1/2 overflow-hidden">
          <img
            src={leftImage.src}
            alt="left"
            className="h-full mix-blend-luminosity opacity-30 max-h-full"
          />
        </div>
        <div className="bg-blue-900 h-full w-1/2">
          <img
            src={rightImage.src}
            alt="left"
            className="h-full mix-blend-luminosity opacity-30 max-h-full"
          />
        </div>
      </div>
      <div className="bg-slate-900 h-52 border-top border-slate-800 flex items-center justify-center"></div>
    </div>
  );
}
