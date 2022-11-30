export type Props = {
  error: unknown
}
export const Error = ({ error }: Props) => {
  console.error(error)
  return (
    <div className="m-auto text-xl text-center">
      <strong>Error!</strong> Please contact customer support
    </div>
  )
}
