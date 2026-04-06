const STEPS = ['Pick Flowers', 'Arrange', 'Write Card', 'Share'];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;

        return (
          <div key={label} className="flex items-center">
            {i > 0 && (
              <div
                className={`w-6 sm:w-10 h-[2px] mx-1 sm:mx-2 transition-colors duration-300 ${
                  isDone ? 'bg-rose' : 'bg-[rgba(180,140,100,0.2)]'
                }`}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-rose text-white scale-110'
                    : isDone
                    ? 'bg-rose/20 text-rose'
                    : 'bg-[rgba(180,140,100,0.1)] text-muted'
                }`}
              >
                {isDone ? '✓' : step}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-body transition-colors duration-300 ${
                  isActive ? 'text-primary font-bold' : 'text-muted'
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
