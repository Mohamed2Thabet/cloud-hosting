import AddComment from "@/components/dashboard/AddComment";

export default function CommentsPage() {
  return (
    <main className="p-6 space-y-6 flex items-center flex-col">
      <h2 className="text-2xl font-bold">Manage Comments</h2>
      <AddComment />
    </main>
  );
}
