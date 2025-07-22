export interface InnovationSectionProps {
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  date?: string;

  eventName?: string;
  eventDate?: Date | string;
  eventDetails?: string;
  registerText?: string;
  viewPastText?: string;
  eventImage?: string;
  onRegisterClick?: () => void;
  onViewPastClick?: () => void;
  className?: string;
}
