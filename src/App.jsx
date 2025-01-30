import Footer from "./components/footer";
import Header from "./components/header";
import Router from "./router/router";
function App() {
  return (
    <>
      <div
        style={{
          backgroundImage: 'url("/images/background1.jpg")',
        }}
        className="h-screen backdrop-opacity-10 bg-cover bg-center  translate-x-0 flex flex-col justify-between"
      >
        <Header />
        <Router />
        <Footer />
      </div>
    </>
  );
}

export default App;
