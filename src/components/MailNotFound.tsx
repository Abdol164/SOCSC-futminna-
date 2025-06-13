import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export default function MailNotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-center overflow-y-auto pb-10">
      <div className="w-full max-w-[300px]">
        <img
          src="/images/search-vector.png"
          alt="image-not-found"
          className="w-full h-full"
        />
      </div>
      <div className="w-full max-w-xs text-center">
        <h2 className="text-2xl font-semibold text-black">Email Not Found</h2>
        <p className="mt-2 text-sm text-[#64748b]">
          We couldn't find any mail matching your request in the network.
        </p>
      </div>

      <div className="mt-4 bg-[#f8fafc] p-4 rounded-lg w-full max-w-xs">
        <p className="text-sm font-medium text-[#475569]">
          <strong>Try adjusting your search:</strong>
        </p>
        <ul className="mt-2 text-xs text-[#64748b] list-disc list-inside space-y-0.5">
          <li>Ensure you're connected to a stable internet connection</li>
          <li>Ensure you're using the correct network (Mainnet/Testnet)</li>
        </ul>
      </div>

      <div className="mt-10">
        <Button variant="link" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    </div>
  )
}
