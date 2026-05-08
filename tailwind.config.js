module.exports = {
  content: [
    './tma_frontend/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9d2bee',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  safelist: [
    'bg-green-100','text-green-700','bg-green-500','bg-green-400',
    'bg-red-100','text-red-700','bg-red-500','bg-red-400',
    'bg-yellow-100','text-yellow-700','bg-amber-500','bg-amber-400',
    'bg-slate-100','text-slate-400','bg-slate-300','bg-slate-200',
    'bg-blue-100','text-blue-700','bg-blue-500',
    'bg-purple-100','text-purple-700',
    'text-green-600','text-red-600','text-amber-600','text-blue-600',
    'border-green-200','border-red-200','border-amber-200','border-blue-200',
    'opacity-0','opacity-100','scale-95','scale-100',
    'hidden','block','flex','grid','inline-flex','inline-block',
    'translate-y-full','translate-y-0',
    'pointer-events-none','pointer-events-auto',
    'overflow-hidden','overflow-y-auto',
    'max-h-0','max-h-screen',
    'rotate-180','rotate-0',
  ],
  plugins: [require('@tailwindcss/forms')],
}
