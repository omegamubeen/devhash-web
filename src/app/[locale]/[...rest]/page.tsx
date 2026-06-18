import { notFound } from 'next/navigation';

/** Catch-all so any unmatched localized path renders the localized 404. */
export default function CatchAll() {
  notFound();
}
