import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl text-charcoal sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-3 max-w-md text-sm text-charcoal/65">
        The page you&apos;re looking for may have moved. Try one of the links below.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/#properties" className="btn-secondary">
          View Properties
        </Link>
      </div>
    </section>
  );
}
