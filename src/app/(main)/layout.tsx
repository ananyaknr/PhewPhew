import { NavBar } from "@/components/molecules/NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EEF8FD] pb-[70px]">
      {children}
      <NavBar />
    </div>
  );
}
