import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCreateUser, useQueryUser, useUpdateUser } from "@/hooks/useUserQuery";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Role } from "@/types/user";

const UserDialog = ({
  open,
  onOpenChange,
  userId,
  type
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  userId: number | null; 
  type: 'create' | 'update' | 'view' | null 
}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const { data, isLoading } = useQueryUser({ path: userId })

  useEffect(() => {
    if (type === 'update') {
      setUsername(data?.username ?? '')
      setEmail(data?.email ?? '')
    }
  }, [type, data])

  const { mutate: createUser } = useCreateUser({
    successMessage: '用户创建成功',
  })
  const { mutate: updateUser } = useUpdateUser({
    successMessage: '用户更新成功',
  })
  if (isLoading) return <div>Loading...</div>

  const handleSubmit = () => {
    if (type === 'create') {
      createUser({
        username,
        email
      })
    } else if (type === 'update') {
      updateUser({
        id: userId as number,
        role: data?.role as Role,
        username,
        email
      })
    }
    onOpenChange(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type === 'create' ? 'Create User' : type === 'update' ? 'Update User' : type === 'view' ? 'View User' : 'User Dialog'}</DialogTitle>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Username</div>
              {type === 'update' || type === 'create' ? <Input value={username} onChange={(e) => setUsername(e.target.value)} /> : <div className="text-sm">{data?.username}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Email</div>
              {type === 'update' || type === 'create' ? <Input value={email} onChange={(e) => setEmail(e.target.value)} /> : <div className="text-sm">{data?.email}</div>}
            </div>
          </div>
          {
            type !== 'view' && (
              <div className="flex justify-end gap-2">
                <Button onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button variant="default" onClick={handleSubmit}>{type === 'create' ? 'Create' : type === 'update' ? 'Update' : type === 'view' ? 'View' : 'User Dialog'}</Button>
              </div>
            )
          }
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UserDialog