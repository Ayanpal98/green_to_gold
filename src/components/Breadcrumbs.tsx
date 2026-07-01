import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home, LayoutDashboard } from "lucide-react";

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // If we are on the homepage, we don't necessarily need extensive breadcrumbs, but we can show a subtle home path.
  // On the DSS dashboard page, showing "Home > BioSense DSS" is perfect.
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="max-w-7xl mx-auto px-6 py-4 flex items-center text-xs font-mono uppercase tracking-wider text-brand-ink/40"
    >
      <ol className="flex items-center space-x-2" role="list">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 hover:text-brand-green transition-colors font-medium cursor-pointer"
            id="breadcrumb-home"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayValue = value === "dss" ? "BioSense DSS™ Hub" : value;

          return (
            <li key={to} className="flex items-center space-x-2" role="listitem">
              <ChevronRight className="w-3 h-3 text-brand-ink/20" aria-hidden="true" />
              {isLast ? (
                <span 
                  className="text-brand-green font-bold flex items-center gap-1"
                  aria-current="page"
                >
                  {value === "dss" && <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />}
                  {displayValue}
                </span>
              ) : (
                <Link 
                  to={to} 
                  className="hover:text-brand-green transition-colors font-medium cursor-pointer"
                >
                  {displayValue}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
export default Breadcrumbs;
