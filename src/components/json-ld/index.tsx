interface JsonLdProps {
  structuredData: object;
}

export default function JsonLd({ structuredData }: JsonLdProps) {
  const jsonLdString = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}
