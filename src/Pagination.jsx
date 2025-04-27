import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const fetchUsers = async (page) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`);
  return res.data;
};

export default function Pagination() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users!</p>;

  return (
    <div>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1 || isFetching} // Disable if on the first page or data is fetching
      >
        Previous
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={isFetching} // Disable if data is still being fetched for the next page
      >
        Next
      </button>
    </div>
  );
}
