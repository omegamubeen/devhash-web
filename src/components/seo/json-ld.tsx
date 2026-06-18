/**
 * Renders one or more JSON-LD objects. Server component; emits a script tag with
 * stringified structured data. Values come from typed builders in lib.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is trusted (built from our typed config), not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
