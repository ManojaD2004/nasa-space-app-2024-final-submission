import Scene from "./components/Scene";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="w-full flex-col">
      <Header/>
      <div className="h-[85vh] w-full">
        <Scene />
      </div>
    </main>
  );
}
