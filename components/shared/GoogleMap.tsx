export default function GoogleMap({ embedUrl, title }: { embedUrl: string; title: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-md shadow-card">
      <iframe
        src={embedUrl}
        title={`Map showing location of ${title}`}
        loading="lazy"
        className="h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
