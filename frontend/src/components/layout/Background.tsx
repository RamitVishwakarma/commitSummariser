export function Background(): React.JSX.Element {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-app-gradient">
      <div
        className="absolute size-[500px] rounded-full opacity-25 top-[10%] left-[15%] blur-3xl bg-orb-teal-strong animate-orb-slow"
      />
      <div
        className="absolute size-[600px] rounded-full opacity-15 top-[50%] right-[10%] blur-3xl bg-orb-teal animate-orb-slower"
      />
      <div
        className="absolute size-[400px] rounded-full opacity-20 bottom-[10%] left-[40%] blur-3xl bg-orb-blue animate-orb-fast"
      />
    </div>
  );
}
