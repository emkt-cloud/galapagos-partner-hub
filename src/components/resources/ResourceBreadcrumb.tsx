import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

type Crumb = { label: string; to?: string };

const ResourceBreadcrumb = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
    <Link to="/recursos" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
      <Home className="h-3.5 w-3.5" />
      Resources
    </Link>
    {items.map((c, i) => (
      <span key={i} className="inline-flex items-center gap-1.5">
        <ChevronRight className="h-3 w-3 opacity-50" />
        {c.to ? (
          <Link to={c.to} className="hover:text-primary transition-colors">{c.label}</Link>
        ) : (
          <span className="text-navy font-medium">{c.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default ResourceBreadcrumb;
