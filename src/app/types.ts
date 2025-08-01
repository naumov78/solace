export interface Advocate {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly city: string;
  readonly degree: string;
  readonly specialties: readonly string[];
  readonly yearsOfExperience: number;
  readonly phoneNumber: number;
  readonly createdAt: string;
}

export interface PaginationParams {
  readonly page: number;
  readonly pageSize: number;
}

export interface PaginatedApiResponse {
  readonly data: readonly Advocate[];
  readonly pagination: {
    readonly page: number;
    readonly pageSize: number;
    readonly totalCount: number;
    readonly totalPages: number;
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
  };
}
