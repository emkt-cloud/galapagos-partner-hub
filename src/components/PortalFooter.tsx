const PortalFooter = () => (
  <footer className="border-t border-border/60 bg-background/85 backdrop-blur-sm">
    <div className="px-4 md:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground">
      <p>
        © 2026 <span className="font-medium text-navy">GO Galapagos</span> by{" "}
        <span className="font-medium text-navy">KleinTours</span>. All rights reserved.
      </p>
      <p className="opacity-70">v2026.05 · Partner Portal</p>
    </div>
  </footer>
);

export default PortalFooter;
