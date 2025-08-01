import PageHeader from "./PageHeader";

const Page = ({
  children,
  pageTitle,
}: {
  readonly children: React.ReactNode;
  readonly pageTitle: string;
}) => (
  <main className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader pageTitle={pageTitle} />
      {children}
    </div>
  </main>
);

export default Page;
