export const ReturnRequiredFee = ({
  isFetching,
  requiredFee,
}: {
  isFetching: boolean
  requiredFee: number
}) => {
  if (isFetching) {
    return (
      <span className="text-xs text-gray-500">{`Checking recipient...`}</span>
    )
  }

  if (requiredFee > 0) {
    return (
      <span className="text-xs text-gray-500">{`Required fee ${requiredFee} SUI`}</span>
    )
  }

  return null
}
