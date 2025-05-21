import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  Reply,
  Forward,
  X,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { SimpleAvatar } from "@/components/ui/SimpleAvatar";

import { useFetchMailBodyQuery } from "@/hooks/mail";
import { emailService } from "@/lib/services/emailService";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function EmailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [previousId, setPreviousId] = useState<string | null>(null);
  const [nextId, setNextId] = useState<string | null>(null);

  const { data: email, isLoading } = useFetchMailBodyQuery("walletAddress", id || "");

  useEffect(() => {
    if (!id) return;

    setIsEntering(true);
    setTimeout(() => setIsEntering(false), 50);

    // Simulate fetching all emails to determine previous and next
    const fetchAllEmails = async () => {
      try {
        const { data: allEmails } = await emailService.getInboxEmails();
        if (allEmails.length > 0) {
          const currentIndex = allEmails.findIndex((email) => email.id === id);
          if (currentIndex > 0) {
            setHasPrevious(true);
            setPreviousId(allEmails[currentIndex - 1].id);
          } else {
            setHasPrevious(false);
            setPreviousId(null);
          }

          if (currentIndex < allEmails.length - 1) {
            setHasNext(true);
            setNextId(allEmails[currentIndex + 1].id);
          } else {
            setHasNext(false);
            setNextId(null);
          }
        }
      } catch (error) {
        console.error("Error fetching all emails:", error);
      }
    };

    fetchAllEmails();
  }, [id]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/mail/inbox");
    }, 300);
  };

  const handlePrevious = () => {
    if (hasPrevious && previousId) {
      navigate(`/mail/inbox/${previousId}`);
    }
  };

  const handleNext = () => {
    if (hasNext && nextId) {
      navigate(`/mail/inbox/${nextId}`);
    }
  };

  if (isLoading || !email) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {isExiting && (
        <div
          className="absolute inset-0 bg-black bg-opacity-10 z-10 transition-opacity duration-300 ease-in-out"
          style={{ opacity: isExiting ? 1 : 0 }}
        />
      )}

      <div
        className={`absolute inset-0 bg-white border-l border-gray-200 shadow-md z-20 overflow-hidden
          transition-all duration-300 ease-out
          ${isEntering ? "translate-x-full" : "translate-x-0"}
          ${isExiting ? "translate-x-full" : "translate-x-0"}`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Email view header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-medium text-gray-900 truncate">
                {email.subject}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handlePrevious}
                disabled={!hasPrevious}
              >
                <ChevronLeft
                  className={`h-5 w-5 ${
                    hasPrevious ? "text-gray-600" : "text-gray-300"
                  }`}
                />
              </button>

              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleNext}
                disabled={!hasNext}
              >
                <ChevronRight
                  className={`h-5 w-5 ${
                    hasNext ? "text-gray-600" : "text-gray-300"
                  }`}
                />
              </button>

              {!isMobile && (
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  {isFullScreen ? (
                    <Minimize2 className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Maximize2 className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              )}

              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleBack}
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center px-4 pb-4 space-x-2">
            <button className="flex items-center px-3 py-1.5 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </button>
            <button className="flex items-center px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </button>

            <div className="flex-1"></div>

            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Trash2 className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Email content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ height: "calc(100vh - 140px)" }}
        >
          {/* Sender info */}
          <div className="flex items-start mb-6">
            <SimpleAvatar
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                email.sender
              )}`}
              alt={email.sender}
              initials={getInitials(email.sender)}
              size="lg"
              className="mr-4"
            />

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {email.sender}
                  </h3>
                  <p className="text-sm text-gray-500">To: {email.recipient}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {format(new Date(email.date), "PPP")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(email.date), "p")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject */}
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            {email.subject}
          </h1>

          {/* Email body */}
          <div className="prose max-w-none">
            {email.body.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Quick reply */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-4">
            <SimpleAvatar initials="ME" size="sm" />
            <div className="flex-1 rounded-md border border-gray-300 px-4 py-2 bg-white focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                placeholder="Reply to this email..."
                className="w-full bg-transparent border-none focus:outline-none text-sm"
              />
            </div>
            <button className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              <Reply className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
