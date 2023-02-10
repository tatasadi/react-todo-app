import Footer from "./Footer";
import Header from "./Header";
import Todos from "./Todos";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main>
        <Todos />
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
