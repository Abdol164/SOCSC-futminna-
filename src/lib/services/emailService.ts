import type { IEmail } from "@/types/generic"

// Dummy data for testing that matches your IEmail interface
const dummyEmails: IEmail[] = [
  {
    id: "1",
    sender: "John Doe",
    recipient: "me@example.com",
    subject: "Meeting Tomorrow",
    body: "Hi there, let's schedule a meeting tomorrow to discuss the project progress. I think we need to review the latest designs and make some decisions about the next steps. Let me know what time works for you.",
    date: new Date(2023, 4, 15, 10, 30).toISOString(),
    isRead: false,
  },
  {
    id: "2",
    sender: "Jane Smith",
    recipient: "me@example.com",
    subject: "Design Feedback",
    body: "I've reviewed the designs you sent over and I have some feedback. Overall, I think they look great, but there are a few tweaks I'd like to suggest. Can we discuss these changes soon?",
    date: new Date(2023, 4, 14, 15, 45).toISOString(),
    isRead: true,
  },
  {
    id: "3",
    sender: "Alex Johnson",
    recipient: "me@example.com",
    subject: "Contract Renewal",
    body: "Your contract is up for renewal next month. Please review the attached documents and let me know if you'd like to proceed with the renewal. We've included some new terms that might interest you.",
    date: new Date(2023, 4, 13, 9, 15).toISOString(),
    isRead: false,
  },
  {
    id: "4",
    sender: "Sarah Williams",
    recipient: "me@example.com",
    subject: "Weekend Plans",
    body: "Hey! Are you free this weekend? We're planning a small get-together at my place on Saturday evening. Nothing fancy, just some food, drinks, and good company. Let me know if you can make it!",
    date: new Date(2023, 4, 12, 18, 20).toISOString(),
    isRead: true,
  },
  {
    id: "5",
    sender: "Michael Brown",
    recipient: "me@example.com",
    subject: "Project Update - Q2 Goals",
    body: "Here's the latest update on our Q2 goals. We're making good progress on most fronts, but there are a couple of areas where we need to focus more attention. I've attached a detailed report for your review.",
    date: new Date(2023, 4, 11, 11, 0).toISOString(),
    isRead: true,
  },
  {
    id: "6",
    sender: "Emily Davis",
    recipient: "me@example.com",
    subject: "New Product Launch",
    body: "We're excited to announce that we'll be launching our new product next week! This is a major milestone for our team, and we'd love for you to be part of the launch event. Details are in the attached invitation.",
    date: new Date(2023, 4, 10, 14, 30).toISOString(),
    isRead: false,
  },
  {
    id: "7",
    sender: "David Wilson",
    recipient: "me@example.com",
    subject: "Invoice #1234",
    body: "Please find attached invoice #1234 for the services provided last month. Payment is due within 30 days. Thank you for your business!",
    date: new Date(2023, 4, 9, 9, 45).toISOString(),
    isRead: true,
  },
  {
    id: "8",
    sender: "Lisa Taylor",
    recipient: "me@example.com",
    subject: "Vacation Request",
    body: "I'd like to request vacation time from July 15-22. I've already completed all my pending tasks and will ensure a smooth handover before I leave. Please let me know if this works for the team.",
    date: new Date(2023, 4, 8, 16, 10).toISOString(),
    isRead: true,
  },
]

// Flag to toggle between real data and dummy data
export const USE_DUMMY_DATA = false // Set to false when you want to use real data

// API endpoints
const API_ENDPOINTS = {
  INBOX: "/api/mail/inbox",
  EMAIL: (id: string) => `/api/mail/email/${id}`,
}

export const emailService = {
  /**
   * Get all emails for the inbox
   * @returns Promise with array of IEmail objects
   */
  getInboxEmails: async (): Promise<{
    data: IEmail[]
    isFetching: boolean
    isError: boolean
  }> => {
    if (USE_DUMMY_DATA) {
      return {
        data: dummyEmails,
        isFetching: false,
        isError: false,
      }
    }

    try {
      const response = await fetch(API_ENDPOINTS.INBOX)
      if (!response.ok) {
        throw new Error("Failed to fetch inbox data")
      }
      const data = await response.json()
      return {
        data,
        isFetching: false,
        isError: false,
      }
    } catch (error) {
      console.error("Error fetching inbox emails:", error)
      return {
        data: [],
        isFetching: false,
        isError: true,
      }
    }
  },

  /**
   * Get a specific email by ID
   * @param id The email ID to find
   * @returns Promise with the email object or undefined if not found
   */
  getEmailById: async (
    id: string
  ): Promise<{ data: IEmail | null; isLoading: boolean; isError: boolean }> => {
    if (USE_DUMMY_DATA) {
      const email = dummyEmails.find((email) => email.id === id)
      return {
        data: email || null,
        isLoading: false,
        isError: false,
      }
    }

    try {
      const response = await fetch(API_ENDPOINTS.EMAIL(id))
      if (!response.ok) {
        throw new Error("Failed to fetch email data")
      }
      const data = await response.json()
      return {
        data,
        isLoading: false,
        isError: false,
      }
    } catch (error) {
      console.error(`Error fetching email with ID ${id}:`, error)
      return {
        data: null,
        isLoading: false,
        isError: true,
      }
    }
  },

  /**
   * Mark an email as read
   * @param id The email ID to mark as read
   * @returns Promise with the updated email or null if not found
   */
  markAsRead: async (
    id: string
  ): Promise<{ success: boolean; data: IEmail | null }> => {
    if (USE_DUMMY_DATA) {
      const email = dummyEmails.find((email) => email.id === id)
      if (email) {
        email.isRead = true
        return { success: true, data: email }
      }
      return { success: false, data: null }
    }

    try {
      const response = await fetch(API_ENDPOINTS.EMAIL(id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: true }),
      })

      if (!response.ok) {
        throw new Error("Failed to mark email as read")
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error(`Error marking email ${id} as read:`, error)
      return { success: false, data: null }
    }
  },
}
