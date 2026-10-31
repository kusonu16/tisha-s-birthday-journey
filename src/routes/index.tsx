import { createFileRoute } from "@tanstack/react-router";
import BirthdaySurprise from "@/components/birthday/BirthdaySurprise";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Little Surprise for Tisha | Happy Birthday" },
      {
        name: "description",
        content:
          "A heartfelt birthday surprise for Tisha — a magical letter, eight sweet notes, her favourite photo memories and a grand birthday finale.",
      },
      { property: "og:title", content: "A Little Surprise for Tisha | Happy Birthday" },
      {
        property: "og:description",
        content:
          "A magical little birthday journey made just for Tisha: open the letter, read the sweet notes, relive the photo memories and make a wish.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#fffaf8" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BirthdaySurprise />;
}
