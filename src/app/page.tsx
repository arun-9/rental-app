import Navbar from "@/components/Navbar";
import Landing from "./(nondashboard)/landing/page";
export default function Home() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className={`h-full flex w-full flex-col`}>
        <Landing />
      </main>
    </div>
  );
}
