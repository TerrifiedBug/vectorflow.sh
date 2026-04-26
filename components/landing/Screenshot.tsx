import Image from 'next/image';

export function Screenshot() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="overflow-hidden rounded-lg border border-fd-border shadow-sm">
        <Image
          src="/screenshots/pipeline-editor.png"
          alt="VectorFlow pipeline editor"
          width={2400}
          height={1500}
          priority={false}
          className="w-full"
        />
      </div>
    </section>
  );
}
