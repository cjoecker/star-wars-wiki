import { useNavigate } from 'react-router-dom'

export type LinkButtonProps = {
  url: string
  label: string | undefined
}
export const LinkButton = ({ url, label }: LinkButtonProps) => {
  const navigate = useNavigate()
  return (
    <button
      className="text-3xl underline hover:text-blue-200 cursor-pointer text-left"
      onClick={() => navigate(url)}
    >
      {label ?? '-'}
    </button>
  )
}
