export interface Friend {
  id: string;
  name: string;
  mutualEvents: number;
  status: 'accepted' | 'pending';
}

export const MOCK_FRIENDS: Friend[] = [
  { id: '1', name: 'Anna Kowalska', mutualEvents: 5, status: 'accepted' },
  { id: '2', name: 'Marek Nowak', mutualEvents: 3, status: 'accepted' },
  { id: '3', name: 'Piotr Wiśniewski', mutualEvents: 7, status: 'accepted' },
  { id: '4', name: 'Kasia Zielińska', mutualEvents: 2, status: 'accepted' },
  { id: '5', name: 'Tomek Wójcik', mutualEvents: 1, status: 'pending' },
];

export const INVITABLE_FRIENDS: Friend[] = MOCK_FRIENDS.filter(
  (f) => f.status === 'accepted'
);
