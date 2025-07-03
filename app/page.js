// app/page.js
import ImagesLayer from '../components/layers/ImagesLayer';
import TextLayer from '../components/layers/TextLayer';
import BackgroundLayerOne from '../components/layers/BackgroundLayerOne';
import BackgroundLayerTwo from '../components/layers/BackgroundLayerTwo';

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* Background Layers - stacked vertically */}
      <div className="relative w-full z-0">
        <BackgroundLayerOne />
        <BackgroundLayerTwo />
      </div>

      {/* Content Container - will scroll over the background layers */}
      <div className="absolute top-0 left-0 z-10 w-full h-screen">
        {/* Images Layer */}
        <div className="relative inset-0">
          <ImagesLayer />
        </div>

        {/* Text Layer */}
        <div className="absolute inset-0">
          <TextLayer />
        </div>
      </div>
    </div>
  );
}