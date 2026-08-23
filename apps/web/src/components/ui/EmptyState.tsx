type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-line bg-surface/60 px-5 py-8">
      <p className="font-display text-lg text-ink">{title}</p>
      {description ? (
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
