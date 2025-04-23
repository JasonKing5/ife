import { useAuth } from "@/contexts/AuthContext"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateUser } from "@/hooks/useUserQuery"
import { settingsSchema, SettingsFormValues, UpdateUserRequest, UserBase } from "@/types/user"

export default function SettingsPage() {
  const { user, setUser } = useAuth()
  const { mutate: updateUserMutate } = useUpdateUser()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: user?.username || "",
    },
  })

  const onSubmit = (data: SettingsFormValues) => {
    if (user?.role === 'admin') return
    if (data.username === user?.username) return
    updateUserMutate({ ...user, username: data.username } as UpdateUserRequest)
    setUser({ ...user, username: data.username } as UserBase)
  }

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-full max-w-md p-4 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              disabled={user?.role === 'admin'}
              {...register('username')}
            />
            {errors.username && <span className="text-xs text-red-500">{errors.username.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={user?.email || ''} disabled />
          </div>
          <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </div>
  )
}