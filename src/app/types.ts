export interface Advocate {
  readonly firstName: string;
  readonly lastName: string;
  readonly city: string;
  readonly degree: string;
  readonly specialties: readonly string[];
  readonly yearsOfExperience: number;
  readonly phoneNumber: number;
}
