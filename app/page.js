// app/page.js
import ImagesLayer from '../components/layers/ImagesLayer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex justify-center relative">
      {/* Background Layer */}
      <div className="w-[1509px] h-[4096px] relative">
        <div className="absolute w-[1440px] h-[1394px] rounded-lg border shadow-sm">
          <div className="p-0">
            <div style={{ position: 'relative', width: '100%', paddingBottom: `${(1394/1440)*100}%` }}>
              <img
                className="absolute w-full h-full object-cover"
                alt="Thumbnail background"
                src="/images/thumbnail-3-3.png"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Images Layer */}
      <ImagesLayer />
    </div>
  );
}
