"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE, getPaginationSlice } from "@/lib/admin-pagination";

export function useAdminPagination<T>(items: T[], resetKey = "") {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [resetKey, items.length]);

  const pagination = useMemo(
    () => getPaginationSlice(items, page, pageSize),
    [items, page, pageSize],
  );

  useEffect(() => {
    if (page > pagination.totalPages) {
      setPage(pagination.totalPages);
    }
  }, [page, pagination.totalPages]);

  return {
    page: pagination.currentPage,
    setPage,
    pageSize,
    setPageSize,
    paginatedItems: pagination.paginatedItems,
    totalItems: pagination.totalItems,
    totalPages: pagination.totalPages,
    startIndex: pagination.startIndex,
  };
}
