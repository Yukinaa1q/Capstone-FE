import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import TC_SidebarMenuItem from '../SidebarMenuItem/SidebarMenuItem'
import { IdCard, Table, UserCircle } from 'lucide-react'

const UserSettingSidebar = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <TC_SidebarMenuItem prefixUrl="/user/account" title="Account" icon={<UserCircle/>}/>
        <TC_SidebarMenuItem prefixUrl="/user/profile" title="Profile" icon={<IdCard/>}/>
        <TC_SidebarMenuItem prefixUrl="/user/time-table" title="Time Table" icon={<Table/>}/>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default UserSettingSidebar