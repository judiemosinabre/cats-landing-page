import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CommunityCapabilities from './components/CommunityCapabilities';
import SocialFeed from './components/SocialFeed';
import Footer from './components/Footer';
import WhitelistModal from './components/WhitelistModal';

function App() {
  const [whitelistOpen, setWhitelistOpen] = useState(false);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar onOpenWhitelist={() => setWhitelistOpen(true)} />
      <div id="hero"><Hero onOpenWhitelist={() => setWhitelistOpen(true)} /></div>
      <div id="community"><CommunityCapabilities /></div>
      <div id="web3-news"><SocialFeed /></div>
      <Footer />
      <WhitelistModal isOpen={whitelistOpen} onClose={() => setWhitelistOpen(false)} />
    </div>
  );
}

export default App;
