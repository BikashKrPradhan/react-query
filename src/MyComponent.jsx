import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'

export default function MyComponent() {
    const {data, isLoading, error, status} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            return res.data;
        }
    });

    if(isLoading) return (<><p>Loading...</p></>);
    if(error) return (<><p>error...</p></>);
    

  return (
    <div>
      <ul>
        {data.map((user) => (
            <li key={user.id}>
                {user.name}
            </li>
        ))}
      </ul>
    </div>
  )
}
