import { BeatLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-8 text-center text-primaryDR">
      <BeatLoader color="#0085EA" />
    </div>
  )
}
