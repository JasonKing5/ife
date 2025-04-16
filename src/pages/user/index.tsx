import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQueryUser, useQueryUsers, useCreateUser, useDeleteUser, useUpdateUser } from "@/hooks/useUserQuery"
import { UserResponse, CreateUserRequest } from "@/types/user"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export default function UserPage() {
  const { user: currentUser } = useAuth()
  const [viewUserId, setViewUserId] = useState<number | null>(null)
  const { data: userDetail, isLoading } = useQueryUser({ path: viewUserId })
  const { data: users, isLoading: usersLoading } = useQueryUsers()
  const { mutate: createUser } = useCreateUser({
    successMessage: '用户创建成功',
  })
  const { mutate: updateUser } = useUpdateUser({
    successMessage: '用户更新成功',
  })
  const { mutate: deleteUser } = useDeleteUser({
    successMessage: '用户删除成功',
  });
  const [user, setUser] = useState<CreateUserRequest>({
    username: '',
    email: ''
  }) 

  if (isLoading || usersLoading) return <div>Loading...</div>

  const handleCreateUser = () => {
    if (!user) return
    createUser(user)
  }

  const handleDeleteUser = (userId: number) => {
    deleteUser(userId)
  }

  const handleUpdateUser = (userId: number) => {
    const user = users?.find((user: UserResponse) => user.id === userId)
    if (!user) return
    updateUser({ id: userId, username: `${user.username} updated`, email: user.email, role: user.role })
  }

  const handleViewUser = (userId: number) => {
    setViewUserId(userId)
  }

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="text-4xl font-bold mb-4">Current User: {currentUser?.username ?? 'N/A'}</div>
      <ul>
        <li key='header'>id | username | email | role</li>
        {users?.map((user: UserResponse) => (
          <li key={user.id}>{user.id} | {user.username} | {user.email} | {user.role} |
          <Button onClick={() => handleViewUser(user.id)}>View User</Button>
          <Button onClick={() => handleUpdateUser(user.id)}>Update User</Button>
          <Button onClick={() => handleDeleteUser(user.id)}>Delete User</Button>
          </li>
        ))}
        <li key='footer'>Total: {users?.length}</li>
      </ul>
      <Input type="text" value={user?.username} onChange={(e: { target: { value: any } }) => setUser({ ...user, username: e.target.value })} />
      <Input type="text" value={user?.email} onChange={(e: { target: { value: any } }) => setUser({ ...user, email: e.target.value })} />
      <Button onClick={handleCreateUser}>Create User</Button>
      {userDetail && !isLoading && (
        <div>
          <h2>View User</h2>
          <p>id: {userDetail.id}</p>
          <p>username: {userDetail.username}</p>
          <p>email: {userDetail.email}</p>
          <p>role: {userDetail.role}</p>
        </div>
      )}
    </div>
  )
}