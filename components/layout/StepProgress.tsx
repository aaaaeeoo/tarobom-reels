interface StepProgressProps {
  currentStep: number
}

const steps = [
  { n: 1, label: '주제 추천' },
  { n: 2, label: '키워드' },
  { n: 3, label: '이미지' },
  { n: 4, label: '배경음악' },
]

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, idx) => {
        const isDone = step.n < currentStep
        const isActive = step.n === currentStep

        return (
          <div key={step.n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'w-7 h-7 flex items-center justify-center text-xs font-medium transition-colors',
                  isDone
                    ? 'bg-black text-white'
                    : isActive
                    ? 'border-2 border-black text-black'
                    : 'border border-gray-300 text-gray-300',
                ].join(' ')}
              >
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.n
                )}
              </div>
              <span
                className={`text-xs whitespace-nowrap ${
                  isActive ? 'text-black font-medium' : isDone ? 'text-gray-400' : 'text-gray-300'
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={`w-12 h-px mx-1 mb-5 ${step.n < currentStep ? 'bg-black' : 'bg-gray-200'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
