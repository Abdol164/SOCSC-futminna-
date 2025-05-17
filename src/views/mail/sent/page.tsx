import { Link } from "react-router-dom"
import EmailList from "../../../components/EmailList"
import useMediaQuery from "../../../hooks/useMediaQuery"
import { useFetchOutboxQuery } from "../../../hooks/mail"

export default function SentPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const { data: outbox, isFetching } = useFetchOutboxQuery()

  if (isFetching) {
    return <div>Loading...</div>
  }

  const hasOutbox = outbox && outbox.length > 0

  if (!hasOutbox) {
    return <div>No outbox found</div>
  }

  return (
    <div className={`flex flex-col h-screen pt-${isDesktop ? 16 : 5}`}>
      <div className="w-full h-full overflow-y-auto border-r border-gray-200">
        {outbox
          .slice()
          .reverse()
          .map((email, index) => (
            <Link key={index} to={`/mail/outbox/${email.id}`}>
              <EmailList email={email} />
            </Link>
          ))}
      </div>
    </div>
  )
}
