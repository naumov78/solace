import db from "../../../db";
import { advocates } from "../../../db/schema";
import { count, or, ilike } from "drizzle-orm";
import {
  validatePaginationParams,
  calculatePagination,
  getOffset,
  DEFAULT_PAGE_SIZE,
} from "@/utils/pagination";
import { PaginatedApiResponse } from "@/app/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(),
    10
  );
  const searchTerm = searchParams.get("search") || "";

  const { page: validatedPage, pageSize: validatedPageSize } =
    validatePaginationParams(page, pageSize);
  const offset = getOffset(validatedPage, validatedPageSize);

  try {
    const searchConditions = searchTerm.trim()
      ? or(
          ilike(advocates.firstName, `%${searchTerm}%`),
          ilike(advocates.lastName, `%${searchTerm}%`),
          ilike(advocates.city, `%${searchTerm}%`),
          ilike(advocates.degree, `%${searchTerm}%`)
        )
      : undefined;

    const totalCountQuery = searchConditions
      ? db.select({ count: count() }).from(advocates).where(searchConditions)
      : db.select({ count: count() }).from(advocates);

    const totalCountResult = await totalCountQuery;
    const totalCount = totalCountResult[0]?.count || 0;

    const dataQuery = db
      .select()
      .from(advocates)
      .limit(validatedPageSize)
      .offset(offset)
      .orderBy(advocates.createdAt);

    const data = searchConditions
      ? await dataQuery.where(searchConditions)
      : await dataQuery;

    const pagination = calculatePagination(
      totalCount,
      validatedPage,
      validatedPageSize
    );

    const response: PaginatedApiResponse = {
      data,
      pagination,
    };

    return Response.json(response);
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return Response.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
