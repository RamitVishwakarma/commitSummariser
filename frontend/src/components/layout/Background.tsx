export function Background(): React.JSX.Element {
  return (
    <div className="bg-app-gradient pointer-events-none fixed inset-0 overflow-hidden">
      <div className="bg-orb-teal-strong animate-orb-slow absolute top-[10%] left-[15%] size-125 rounded-full opacity-25 blur-3xl" />
      <div className="bg-orb-teal animate-orb-slower absolute top-[50%] right-[10%] size-150 rounded-full opacity-15 blur-3xl" />
      <div className="bg-orb-blue animate-orb-fast absolute bottom-[10%] left-[40%] size-100 rounded-full opacity-20 blur-3xl" />
    </div>
  );
}
