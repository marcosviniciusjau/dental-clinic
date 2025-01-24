
import { Building, ChevronDown, LogOut } from 'lucide-react'

import { UpdateProfileDialog } from './update-profile-dialog'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from '@marcos-vinicius-design-system/react'
import { useSession, signOut } from 'next-auth/react'
import router from 'next/router'
import { destroyCookie } from 'nookies'
export function AccountMenu() {
  const session = useSession()

  function logout() {
    try { 
      signOut({ callbackUrl: "/" });
      destroyCookie(null, 'dental-clinic:client', { path: '/' })
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex select-none items-center gap-2"
          >
              {session.data?.user.name}
          
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
                <span>{session.data?.user.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {session.data?.user.email}
                </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da Loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400"
            asChild
          >
            <button className="w-full" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateProfileDialog />
    </Dialog>
  )
}
