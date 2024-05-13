import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Router from '@/Router/Router';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <div className='main'>
        <Router />
      </div>
      <Footer />
    </div>
  );
};

export default App;
