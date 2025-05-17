import EmailList from "../../../components/EmailList"
import useMediaQuery from "../../../hooks/useMediaQuery"
import { useFetchInboxQuery } from "../../../hooks/mail"
import { Link } from "react-router-dom"

export default function InboxPage() {
  const { data: inbox, isFetching } = useFetchInboxQuery()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  if (isFetching) {
    return <div>Loading...</div>
  }

  const hasInbox = inbox && inbox.length > 0

  if (!hasInbox) {
    return <div>No inbox found</div>
  }

  return (
    <div className={`flex flex-col h-screen pt-${isDesktop ? 16 : 5}`}>
      <div className="w-full h-full overflow-y-auto border-r border-gray-200">
        {inbox
          .slice()
          .reverse()
          .map((email, index) => (
            <Link key={index} to={`/mail/inbox/${email.id}`}>
              <EmailList email={email} />
            </Link>
          ))}
      </div>
    </div>
  )
}
