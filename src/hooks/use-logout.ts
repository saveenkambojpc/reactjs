import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // for navigation
import { toast } from '../services/toast';
import { closeModal } from '../store/features/modalSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            sessionStorage.clear();
            navigate('/login');
            dispatch(closeModal())

        } catch (error) {
            toast('error', "Logout error")
        }
    };

    return { logout }; // Optional: return logged in state
};

export default useLogout;