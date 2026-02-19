import React from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  lead?: string
  centered?: boolean
  light?: boolean
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  lead, 
  centered = false,
  light = false 
}) => {
  return (
    <div className={`mb-16 flex flex-col gap-4 ${centered ? 'items-center text-center' : 'items-start text-left'}`}>
      {lead && (
        <div className="flex items-center gap-4">
          {!centered && <div className="h-[2px] w-10 bg-red-600" />}
          <span className="text-red-600 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">
            {lead}
          </span>
          {centered && <div className="h-[2px] w-10 bg-red-600" />}
        </div>
      )}
      
      <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none drop-shadow-2xl ${light ? 'text-black' : 'text-white'}`}>
        {title.split(' ').map((word, i) => (
          <React.Fragment key={i}>
            {word === 'FORCE' || word === 'ELITE' || word === 'DIGITAL' ? (
              <span className="text-red-600">{word} </span>
            ) : (
              <>{word} </>
            )}
          </React.Fragment>
        ))}
      </h2>
      
      {subtitle && (
        <p className={`max-w-2xl text-lg font-medium tracking-wide leading-relaxed italic ${light ? 'text-zinc-600' : 'text-zinc-400'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
