import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'



export default function CreateUser() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newUser) => {
            const res = await axios.post('https://jsonplaceholder.typicode.com/users', newUser)
            return res.data;
        },
        onMutate: async (newUser) => {
            await queryClient.cancelQueries({queryKey: ['users']});
            const previousData = queryClient.getQueryData(['users']);

            queryClient.setQueryData(['users'], (olddata) => [
                ...olddata,
                {...newUser, id:Date.now()}
            ]);

            return (previousData);
        },
        onError: (context) => {
            queryClient.setQueryData(['users'], context.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        }
        ,
        onSuccess: (data) => {
            console.log('user created', data);
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });

    const handleCreateUser = () =>{
        mutation.mutate({
            name: 'bikash',
            email: 'bik@gmail.com'
        });
    };

  return (
    <div>
      <button onClick={handleCreateUser} disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Creating...' : 'Create User'}
            </button>

            {mutation.isError && <p>Error creating user</p>}
            {mutation.isSuccess && <p>User created successfully!</p>}
    </div>
  )
}
