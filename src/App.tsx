import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CommunityCapabilities from './components/CommunityCapabilities';
import SocialFeed from './components/SocialFeed';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <div id="hero"><Hero /></div>
      <div id="community"><CommunityCapabilities /></div>
      <div id="web3-news"><SocialFeed /></div>
      <Footer />
    </div>
  );
}

export default App;
