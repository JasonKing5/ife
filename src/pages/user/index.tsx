import { useQueryUsers, useDeleteUser } from "@/hooks/useUserQuery"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import UserDialog from "./user-dialog"

export default function UserPage() {
  const { user: currentUser } = useAuth()
  const [userId, setUserId] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<'create' | 'update' | 'view' | null>(null)
  const { data: users, isLoading: usersLoading } = useQueryUsers()
  const { mutate: deleteUser } = useDeleteUser({
    successMessage: '用户删除成功',
  });

  if (usersLoading) return <div>Loading...</div>

  const handleCreateUser = () => {
    setOpen(true)
    setType('create')
  }

  const handleDeleteUser = (userId: number) => {
    deleteUser(userId)
  }

  const handleUpdateUser = (userId: number) => {
    setOpen(true)
    setType('update')
    setUserId(userId)
  }

  const handleViewUser = (userId: number) => {
    setOpen(true)
    setType('view')
    setUserId(userId)
  }

  const tableColumns = columns({ handleViewUser, handleUpdateUser, handleDeleteUser })

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="text-4xl font-bold mb-4">Current User: {currentUser?.username ?? 'N/A'}</div>
      <div className="container mx-auto py-10">
        <DataTable columns={tableColumns} data={users ?? []} handleCreateUser={handleCreateUser} />
      </div>
      <UserDialog open={open} onOpenChange={setOpen} userId={userId} type={type} />
    </div>
  )
}