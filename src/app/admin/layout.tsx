import Sidebar from "@/components/dashboard/Sidebar";
import { jwtVerify } from "jose";
import { getToken } from "@/utils/generateToken";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1️⃣ اقرأ الـ token من الكوكيز
  const token = await getToken()

  if (!token) {
    redirect("/login");
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // 2️⃣ تحقق من ان المستخدم Admin
    if (payload.isAdmin !== true) {
      return (
        <div className="text-center p-20">
          <p>You are not authorized to access this page.</p>
        </div>
      );
    }
  } catch (err) {
    redirect("/login");
  }

  // ✅ لو كل حاجة صح، اعرض Layout
  return (
    <div className="flex min-h-[calc(100vh-(80px+92px))]">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
