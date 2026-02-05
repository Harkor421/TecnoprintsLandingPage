'use client'

export default function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle, static gradient for enterprise look */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle, rgba(30, 215, 96, 0.4) 0%, transparent 70%)',
          transform: 'translate(20%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] blur-[150px] opacity-[0.1]"
        style={{
          background: 'radial-gradient(circle, rgba(30, 215, 96, 0.3) 0%, transparent 70%)',
          transform: 'translate(-20%, 30%)',
        }}
      />
      {/* Subtle grid overlay for tech/enterprise feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
