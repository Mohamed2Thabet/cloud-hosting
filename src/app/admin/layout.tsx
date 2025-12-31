import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-(80px+92px))]">
      {/* Sidebar ثابت */}
      <Sidebar />

      {/* هنا بيظهر المحتوى المتغير */}
      <main className="flex-1 p-6 bg-gray-50 ">
        {children}
      </main>
    </div>
  );
}
