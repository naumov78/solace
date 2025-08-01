Currently, the new search functionality supports filtering by first name, last name, degree, and city. Given more time, I would expand this to include search by specialties and years of experience.

As enhancements, I would implement the following:

- A filter for years of experience, ideally as a range-based toggle (e.g., 1–5, 6–10, 10+ years) or a dropdown to allow users to quickly narrow results by experience level.

- Clickable specialty tags within each advocate card, enabling users to filter the list based on a selected specialty with a single click.

- To support efficient querying on specialties, I would also add a GIN index to the JSONB specialties column.
