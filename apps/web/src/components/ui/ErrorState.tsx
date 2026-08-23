import { Button } from "./Button.tsx";

type ErrorStateProps = {
  title: string;
  description: string;
  retry?: () => void;
};

export function ErrorState({ title, description, retry }: ErrorStateProps) {
  return (
    <div className="border border-[#e4bebe] bg-[#fff8f8] px-5 py-7">
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{description}</p>
      {retry ? (
        <Button className="mt-5" variant="secondary" onClick={retry}>
          Retry request
        </Button>
      ) : null}
    </div>
  );
}
