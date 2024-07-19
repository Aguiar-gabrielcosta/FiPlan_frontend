import checkProgress from '@/app/utils/checkProgress'
import formatValue from '@/app/utils/formatValue'
import getAlertLevel from '@/app/utils/getAlertLevel'

interface ExpenseInfoProps {
  category: string
  percentage: number
  acceptable?: number
  expense: number
}

export default function ExpenseInfo({
  category,
  percentage,
  acceptable,
  expense,
}: ExpenseInfoProps) {
  const bgAlertVariants = {
    green: 'bg-alertGreen',
    yellow: 'bg-alertYellow',
    red: 'bg-alertRed',
  }

  const textAlertVariants = {
    green: 'text-alertGreen',
    yellow: 'text-alertYellow',
    red: 'text-alertRed',
  }

  const { alert } = getAlertLevel(percentage, acceptable)
  const progress = checkProgress(percentage) * 100

  return (
    <div className="flex items-center gap-4 rounded-lg bg-neutralWhite p-2 drop-shadow-md">
      <h5 className="w-32 truncate text-nowrap text-start font-bold text-primaryDR">
        {category}
      </h5>
      <div className="h-[10px] w-[150px] rounded-lg bg-primaryLR">
        <div
          className={`h-full rounded-lg ${bgAlertVariants[alert]}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span
        className={`w-32 truncate text-end font-bold ${textAlertVariants[alert]}`}
      >
        {formatValue(expense)}
      </span>
    </div>
  )
}
