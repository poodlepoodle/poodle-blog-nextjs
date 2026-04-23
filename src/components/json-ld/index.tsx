import type { Graph, Thing, WithContext } from 'schema-dts';

type JsonLdProps = {
  structuredData: WithContext<Thing> | Graph;
};

export default function JsonLd({ structuredData }: JsonLdProps) {
  const jsonLdString = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}
