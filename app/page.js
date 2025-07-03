// app/page.js
import EmailCapture from '../components/EmailCapture'

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <EmailCapture />
      </div>
    </div>
  );
}
