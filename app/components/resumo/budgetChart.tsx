import checkProgress from '@/app/lib/utils/checkProgress'
import getAlertLevel from '@/app/lib/utils/getAlertLevel'

interface BudgetChartProps {
  percentage: number
  acceptable?: number
}

export default function budgetChart({
  percentage,
  acceptable,
}: BudgetChartProps) {
  const progressAlertVariants = {
    green: 'text-alertGreen',
    yellow: 'text-alertYellow',
    red: 'text-alertRed',
  }

  const textAlertVariants = {
    green: 'text-dashboardGreen',
    yellow: 'text-dashboardYellow',
    red: 'text-dashboardRed',
  }

  const { alert } = getAlertLevel(percentage, acceptable)
  const progress = checkProgress(percentage) * 100

  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative h-[100px] w-[100px]">
      <div className="flex items-center justify-center">
        <svg
          className="h-full w-full rotate-[-0deg]"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          <circle
            className="text-primaryLR"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
          <circle
            className={`${progressAlertVariants[alert]}`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
            style={{ transition: 'stroke-dashoffset 0.35s' }}
          />
        </svg>
        <span
          className={`absolute text-xl font-bold ${textAlertVariants[alert]}`}
        >
          {progress}%
        </span>
      </div>
    </div>
  )
}
