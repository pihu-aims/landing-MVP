// app/page.js
import ImagesLayer from '../components/layers/ImagesLayer';
import TextLayer from '../components/layers/TextLayer';

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* First section background - only covers first section */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <img
          className="w-full h-full object-cover"
          alt="Thumbnail background"
          src="/images/thumbnail-3-3.png"
          loading="eager"
        />
      </div>
      
      {/* Content Container - will scroll over the fixed background */}
      <div className="relative z-10 w-full">
        {/* Images Layer */}
        <ImagesLayer />

        {/* Text Layer */}
        <TextLayer />
      </div>
    </div>
  );
}