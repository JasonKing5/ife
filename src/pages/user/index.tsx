import { useQueryUser, useQueryUsers } from "@/hooks/useUserQuery"
import { UserResponse } from "@/types/user"

export default function UserPage() {
  const { data, isLoading } = useQueryUser(7)
  const { data: users, isLoading: usersLoading } = useQueryUsers()

  if (isLoading || usersLoading) return <div>Loading...</div>

  return (
    <div>
      <div>{data?.username ?? 'No user found'}</div>
      <ul>
        {users?.map((user: UserResponse) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}