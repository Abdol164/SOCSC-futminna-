// Standard props for a countdown timer component
export interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}
'use client'

import type React from 'react'
import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +targetDate - +new Date()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <div className={`flex gap-4 ${className}`}>
      {timeUnits.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl md:text-3xl font-bold text-white">
              {unit.value.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-white text-sm mt-1 opacity-90">{unit.label}</div>
        </div>
      ))}
    </div>
  )
}

export default CountdownTimer
