export type ProfileEntryProps = {
  label: string
  value?: string
}
export const ProfileEntry = ({ label, value }: ProfileEntryProps) => {
  return (
    <div className="col-span-1 flex-col">
      <h2 className="font-bold">{label}</h2>
      <div className="text-3xl capitalize">{value ?? 'Undefined'}</div>
    </div>
  )
}
