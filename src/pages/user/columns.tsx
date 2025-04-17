import { ColumnDef } from "@tanstack/react-table"
import { UserResponse } from "@/types/user"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const formatDate = (date: any) => {
  let formatted = "-"
  if (
    typeof date === "string" ||
    typeof date === "number" ||
    date instanceof Date
  ) {
    formatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(date))
  }
  return formatted
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns = ({ handleViewUser, handleUpdateUser, handleDeleteUser }: { handleViewUser: (userId: number) => void, handleUpdateUser: (userId: number) => void, handleDeleteUser: (userId: number) => void }): ColumnDef<UserResponse>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = row.getValue("created_at")
        const formatted = formatDate(createdAt)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => {
        const updatedAt = row.getValue("updated_at")
        const formatted = formatDate(updatedAt)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id.toString())}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewUser(user.id)}>
                View user
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateUser(user.id)}>
                Update user
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                Delete user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
