import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Çalışan"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isManager = roles.includes('Yönetici')
        isAdmin = roles.includes('Kurucu')

        if (isManager) status = "Yönetici"
        if (isAdmin) status = "Kurucu"

        return { username, roles, status, isManager, isAdmin }
    }

    return { username: '', roles: [], isManager, isAdmin, status }
}
export default useAuth