interface Props {
  title: string;
  desc: string | React.ReactNode;
  tags: string[];
  image: string;
  status: 'coming' | 'done'
}

const EventCard = ({ title, desc, tags, image, status }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden">
      <img
        src={image}
        alt={title}
        loading="lazy"
        width={400}
        height={250}
        className="w-full h-56 object-cover rounded-t"
      />
      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-800">{title}</h4>
        <p className="text-gray-500 text-sm mt-1">{desc}</p>
        <div className="flex gap-2 flex-wrap mt-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className={`inline-block mt-4 text-xs font-semibold ${
            status === 'coming'
              ? 'text-green-600 bg-green-100'
              : 'text-red-500 bg-red-100'
          } px-2 py-1 rounded`}
        >
          {status === 'coming' ? 'Upcoming' : 'Completed'}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
