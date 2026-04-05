export function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ background: 'linear-gradient(135deg, #0a1214 0%, #0a1e1e 30%, #0d2628 50%, #081a1c 70%, #0a1214 100%)' }}>
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.35) 0%, transparent 70%)', top: '10%', left: '15%', animation: 'float-orb 45s ease-in-out infinite', filter: 'blur(80px)' }} />
      <div className="absolute w-[600px] h-[600px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)', top: '50%', right: '10%', animation: 'float-orb 55s ease-in-out infinite reverse', filter: 'blur(100px)' }} />
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)', bottom: '10%', left: '40%', animation: 'float-orb 35s ease-in-out infinite 10s', filter: 'blur(90px)' }} />
    </div>
  );
}
