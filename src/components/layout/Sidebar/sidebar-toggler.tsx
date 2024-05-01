import { navClose, navOpen } from "../../../store/features/global/globalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IconButton } from "../../core-ui/button";
import MenuIcon from "@mui/icons-material/Menu";

export default function SidebarToggler() {
  const dispatch = useAppDispatch();
  const { isNavOpen } = useAppSelector((s) => s.global);
  return (
    <div>
      <IconButton
        onClick={() => {
          dispatch(isNavOpen ? navClose() : navOpen());
        }}
      >

        <MenuIcon />
      </IconButton>
    </div>
  );
}
