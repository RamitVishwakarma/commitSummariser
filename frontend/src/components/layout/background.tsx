export function Background(): React.JSX.Element {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[linear-gradient(135deg,#0a1214_0%,#0a1e1e_30%,#0d2628_50%,#081a1c_70%,#0a1214_100%)]">
      <div
        className="absolute size-[500px] rounded-full opacity-25 top-[10%] left-[15%] blur-3xl bg-[radial-gradient(circle,rgba(45,212,191,0.35)_0%,transparent_70%)] animate-orb-slow"
      />
      <div
        className="absolute size-[600px] rounded-full opacity-15 top-[50%] right-[10%] blur-3xl bg-[radial-gradient(circle,rgba(45,212,191,0.3)_0%,transparent_70%)] animate-orb-slower"
      />
      <div
        className="absolute size-[400px] rounded-full opacity-20 bottom-[10%] left-[40%] blur-3xl bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,transparent_70%)] animate-orb-fast"
      />
    </div>
  );
}
