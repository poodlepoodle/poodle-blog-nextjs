import type { Metadata } from 'next';

export type MetadataOpenGraph = NonNullable<Metadata['openGraph']>;

export type MetadataTwitter = NonNullable<Metadata['twitter']>;

/** canonical URL이 반드시 필요한 일반 페이지용 메타데이터 */
type MetadataAlternates = NonNullable<Metadata['alternates']>;
export type PageMetadata = Omit<Metadata, 'alternates'> & {
  alternates: MetadataAlternates & {
    canonical: NonNullable<MetadataAlternates['canonical']>;
  };
};
