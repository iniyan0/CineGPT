export default function Background() {
  return (
    <>
      {/* Accent top line */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent, #f0c84a 30%, #e07845 65%, transparent)",
          opacity: 0.65,
        }}
      />

      {/* Base gradient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% -8%,  rgba(240,200,74,0.07)  0%, transparent 55%),
            radial-gradient(ellipse 60%  50% at 92%  85%,  rgba(224,120,69,0.06)  0%, transparent 50%),
            radial-gradient(ellipse 55%  45% at 5%   55%,  rgba(60,100,220,0.05)  0%, transparent 55%),
            linear-gradient(160deg, #0c0f16 0%, #08090d 45%, #0a0c10 100%)
          `,
        }}
      />

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23g)' opacity='0.032'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bokeh orbs */}
      <div
        className="orb fixed rounded-full pointer-events-none z-0"
        style={{
          width: 480, height: 480, top: -140, right: -60,
          filter: "blur(90px)",
          background: "radial-gradient(circle, rgba(240,200,74,0.055), transparent 70%)",
        }}
      />
      <div
        className="orb orb2 fixed rounded-full pointer-events-none z-0"
        style={{
          width: 360, height: 360, bottom: -80, left: -50,
          filter: "blur(90px)",
          background: "radial-gradient(circle, rgba(80,110,240,0.045), transparent 70%)",
        }}
      />
      <div
        className="orb orb3 fixed rounded-full pointer-events-none z-0"
        style={{
          width: 300, height: 300, top: "40%", right: "15%",
          filter: "blur(90px)",
          background: "radial-gradient(circle, rgba(224,120,69,0.035), transparent 70%)",
        }}
      />
    </>
  );
}
