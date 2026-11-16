
export type CampusEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export const events: CampusEvent[] = [
  {
    id: '1',
    title: 'Open Day',
    category: 'Academic',
    date: '2026-11-20',
    time: '9:00 AM',
    location: 'Faculty of Science',
    description: 'An exhibition showcasing student research and scientific innovations.',
  },
  {
    id: '2',
    title: 'Padura',
    category: 'Entertainment',
    date: '2026-11-22',
    time: '6:00 PM',
    location: 'Cyber wala',
    description: 'Enjoy an evening of music and performances organized by second year science students.',
  },
  {
    id: '3',
    title: 'Zentro',
    category: 'Workshop',
    date: '2026-11-18',
    time: '4:00 PM',
    location: 'Auditorium, Faculty of Science',
    description: 'Join ZENTRO to discover how to turn your ideas into real business opportunities! Learn from industry experts and gain practical insights into entrepreneurship.',
  },
  {
    id: '4',
    title: 'Inter Faculty Sports Meet',
    category: 'Sports',
    date: '2026-11-28',
    time: '8:00 AM',
    location: 'Cyber Playground',
    description: 'A sporting event bringing students from different faculties together.',
  },
];
