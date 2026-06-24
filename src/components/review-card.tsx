import { Star } from "lucide-react";
import type { DBReview } from "@/hooks/useReviews";

interface ReviewCardProps {
  review: DBReview;
  isOwnReview: boolean;
  author: string;
  formattedDate: string;
}

const AVATAR_COLORS = [
  "bg-amber-500/20 text-amber-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-sky-500/20 text-sky-400",
  "bg-rose-500/20 text-rose-400",
  "bg-violet-500/20 text-violet-400",
  "bg-orange-500/20 text-orange-400",
  "bg-teal-500/20 text-teal-400",
  "bg-pink-500/20 text-pink-400",
];

function getAvatarSeed(sessionId: string): number {
  let hash = 0;
  for (let i = 0; i < sessionId.length; i++) {
    hash = sessionId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function parseReviewComment(comment: string | null): { tags: string[]; text: string } {
  const text = comment || "";
  const match = text.match(/^\[(.*?)\]\s*(.*)$/s);
  if (match) {
    return {
      tags: match[1].split(",").map((t) => t.trim()),
      text: match[2],
    };
  }
  return { tags: [], text };
}

export function ReviewCard({ review, isOwnReview, author, formattedDate }: ReviewCardProps) {
  const initial = author.charAt(0).toUpperCase();
  const { tags, text: cleanComment } = parseReviewComment(review.comment);
  const avatarColor = AVATAR_COLORS[getAvatarSeed(review.session_id) % AVATAR_COLORS.length];

  return (
    <div className="pt-4 first:pt-0">
      <div
        className={`
          group relative overflow-hidden rounded-2xl border p-4
          transition-all duration-200 ease-out
          ${
            isOwnReview
              ? "border-primary/20 bg-primary/[0.04]"
              : "border-transparent bg-surface-elevated"
          }
          hover:border-primary/30 hover:shadow-sm
          focus-within:border-primary/30 focus-within:shadow-sm
        `}
      >
        {isOwnReview && (
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20" />
        )}

        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${avatarColor}`}
            >
              {initial}
            </div>
            <div className="min-w-0">
              <strong className="block truncate text-sm">{author}</strong>
              <span className="text-[10px] text-muted-foreground">{formattedDate}</span>
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < review.rating ? "fill-gold text-gold" : "text-muted-foreground/30"
                }`}
                strokeWidth={1.5}
              />
            ))}
          </span>
        </div>

        {cleanComment && (
          <div className="mt-3">
            <div className="max-w-prose">
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground [word-break:break-word]">
                {cleanComment}
              </p>
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
