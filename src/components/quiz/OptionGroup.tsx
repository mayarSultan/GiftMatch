import { useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { QuizOptionCard } from '@/components/quiz/QuizOptionCard'
import type { QuizOption } from '@/types/quiz'

interface OptionGroupProps {
  legend: string
  options: QuizOption[]
  value?: string
  onChange: (value: string) => void
}

export function OptionGroup({ legend, options, value, onChange }: OptionGroupProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const lastIndex = options.length - 1

  function focusOptionAt(index: number) {
    buttonRefs.current[index]?.focus()
  }

  function selectAndFocus(index: number) {
    onChange(options[index].value)
    focusOptionAt(index)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        selectAndFocus(index === lastIndex ? 0 : index + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        selectAndFocus(index === 0 ? lastIndex : index - 1)
        break
      case 'Home':
        event.preventDefault()
        selectAndFocus(0)
        break
      case 'End':
        event.preventDefault()
        selectAndFocus(lastIndex)
        break
    }
  }

  return (
    <div role="radiogroup" aria-label={legend} className="grid gap-3 sm:grid-cols-2">
      {options.map((option, index) => (
        <QuizOptionCard
          key={option.value}
          ref={(el) => {
            buttonRefs.current[index] = el
          }}
          option={option}
          selected={value === option.value}
          tabIndex={value === option.value || (!value && index === 0) ? 0 : -1}
          onSelect={() => onChange(option.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        />
      ))}
    </div>
  )
}
