import Link from "next/link";

interface PaginationProps {
  pageNumber: number;
  pages: number;
  route: string;
}

export default function Pagination({ pageNumber, pages, route }: PaginationProps) {
  if (pages <= 1) return null;

  const delta = 2; // عدد الصفحات حول الصفحة الحالية
  const range: (number | string)[] = [];

  // الصفحات الأساسية حول الصفحة الحالية
  const start = Math.max(1, pageNumber - delta);
  const end = Math.min(pages, pageNumber + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  // إضافة أول صفحة
  if (start > 2) {
    range.unshift("...");
    range.unshift(1);
  } else if (start === 2) {
    range.unshift(1);
  }

  // إضافة آخر صفحة
  if (end < pages - 1) {
    range.push("...");
    range.push(pages);
  } else if (end === pages - 1) {
    range.push(pages);
  }

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl shadow-sm">
        
        {/* Prev */}
        {pageNumber > 1 && (
          <Link
            href={`${route}?pageNumber=${prev}`}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 transition-all"
          >
            Prev
          </Link>
        )}

        {/* Pages */}
        {range.map((p, index) =>
          p === "..." ? (
            <span key={`dots-${index}`} className="px-2 text-gray-400 select-none">
              ...
            </span>
          ) : (
            <Link
              key={p}
              href={`${route}?pageNumber=${p}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pageNumber === p
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "text-gray-600 border border-transparent hover:border-gray-300 hover:bg-gray-100"
              }`}
            >
              {p}
            </Link>
          )
        )}

        {/* Next */}
        {pageNumber < pages && (
          <Link
            href={`${route}?pageNumber=${next}`}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 transition-all"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
