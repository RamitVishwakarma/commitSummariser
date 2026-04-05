const ORB_ONE_ANIM = { animation: "float-orb 45s ease-in-out infinite" };
const ORB_TWO_ANIM = { animation: "float-orb 55s ease-in-out infinite reverse" };
const ORB_THREE_ANIM = { animation: "float-orb 35s ease-in-out infinite 10s" };

export function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[linear-gradient(135deg,#0a1214_0%,#0a1e1e_30%,#0d2628_50%,#081a1c_70%,#0a1214_100%)]">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 top-[10%] left-[15%] blur-[80px] bg-[radial-gradient(circle,rgba(45,212,191,0.35)_0%,transparent_70%)]"
        style={ORB_ONE_ANIM}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 top-[50%] right-[10%] blur-[100px] bg-[radial-gradient(circle,rgba(45,212,191,0.3)_0%,transparent_70%)]"
        style={ORB_TWO_ANIM}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 bottom-[10%] left-[40%] blur-[90px] bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,transparent_70%)]"
        style={ORB_THREE_ANIM}
      />
    </div>
  );
}
