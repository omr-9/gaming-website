import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

export function CustomPagination({
  page,
  count,
  setPage,
}: {
  page: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < count) {
      setPage(page + 1);
    }
  };

  const getVisiblePages = () => {
    const visiblePages: number[] = [];
    if (count <= 5) {
      for (let i = 1; i <= count; i++) visiblePages.push();
    } else {
      if (page > 1) visiblePages.push(page - 1);
      visiblePages.push(page);
      if (page < count) visiblePages.push(page + 1);
    }
    return visiblePages;
  };
  return (
    <Pagination className="z-10 col-span-full mt-10">
      <PaginationContent className="felx items-center gap-4">
        <PaginationItem>
          <Button
            disabled={page === 1}
            className={`${page === count ? "bg-rose-400" : "" } cursor-pointer`}
            onClick={handlePrev}
          >
            <ArrowLeft className="mr-1" />
            Prev
          </Button>
        </PaginationItem>
        <PaginationItem className={`${page === count ? "bg-rose-400" : ""} cursor-pointer`}>
          <PaginationLink
            onClick={() => setPage(1)}
            className={`${page === 1 ? "bg-rose-400" : ""} cursor-pointer`}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {getVisiblePages().map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => setPage(p)}
              className={`${page === p ? "bg-ros400" : ""}  cursor-pointer`}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page < count - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {count > 1 && page < count && (
          <PaginationItem className={`${page === count ? "bg-rose-400" : " "}`}>
            <PaginationLink
              onClick={() => setPage(count)}
              className={`${page === count ? "bg-rose-400" : ""} cursor-pointer`}
            >
              {count}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            disabled={page === count}
            className={`${
              page === count ? " bg-rose-400" : ""
            } flex items-center gap-2 cursor-pointer`}
            onClick={handleNext}
          >
            Next <ArrowRight className="mr-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
