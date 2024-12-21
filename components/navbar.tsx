import { ThemeToggle } from "./theme-toggle";
import { CheckCircle, GitPullRequest } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PR } from "./pr-list";
import { AnimatedShinyText } from "./ui/animated-tag";

export function Navbar({
  prs,
  repo,
  setFilter,
}: {
  prs: PR[];
  repo: string;
  setFilter: (filter: string) => void;
}) {
  const labels = [...new Set(prs.flatMap((pr) => pr.labels))];
  const states = [...new Set(prs.map((pr) => pr.state))];

  return (
    <div className="border-b border-muted">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-muted rounded-full">
            <AnimatedShinyText className="px-2 py-1">{repo}</AnimatedShinyText>
          </div>
          <div className="flex items-center gap-2">
            <GitPullRequest className="h-5 w-5" />
            <span className="text-sm">
              {prs.filter((pr) => pr.state === "open").length} Open
            </span>
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">
              {prs.filter((pr) => pr.state === "closed").length} Closed
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {["State", "Label"].map((filter) => (
            <Select
              key={filter}
              onValueChange={(value) => {
                setFilter(`${filter.toLowerCase()}:${value}`);
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder={filter} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter}s</SelectItem>
                {filter === "State"
                  ? states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))
                  : labels.map((label) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          ))}
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="recently-updated">Recently Updated</SelectItem>
            </SelectContent>
          </Select>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
