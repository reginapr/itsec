import { useNavigate } from "react-router-dom";
import Icon from "../ui/Icon";
import dashboardIcon from "../../assets/icons/dashboard-icon.svg";
import fileIcon from "../../assets/icons/file-icon.svg";
import chatIcon from "../../assets/icons/chat-icon.svg";
import teamsIcon from "../../assets/icons/teams-icon.svg";
import settingIcon from "../../assets/icons/setting-icon.svg";
import logoutIcon from "../../assets/icons/logout-icon.svg";

const navItems = [
    { src: dashboardIcon, key: "dashboard" },
    { src: fileIcon, key: "projects" },
    { src: chatIcon, key: "chat" },
    { src: teamsIcon, key: "teams" },
    { src: settingIcon, key: "settings" },
];

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <aside
            className="box-border flex flex-col justify-between items-start p-4 w-[84px] h-screen left-0 top-0 bg-white border-r border-r-[1px] border-r-[rgba(29,41,57,0.1)] rounded-[8px]"
        >
            {/* Logo */}
            <div className="mb-10 font-bold text-lg">
                <div className="bg-[#2CBA7A] rounded-[8px] text-[#02532F] flex items-center justify-center" style={{ fontSize: 20, width: 40, height: 40 }}>
                    C
                </div>
            </div>
            {/* Navigation */}
            <nav className="flex-1 w-full">
                <ul className="list-none p-0 w-full">
                    {navItems.map((item) => (
                        <li
                            key={item.key}
                            className="py-5 justify-center flex cursor-pointer hover:opacity-70 rounded transition w-full"
                        >
                            <Icon name={item.key} src={item.src} className="inline-block mr-2" />
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="w-full mb-2">
               <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex justify-center hover:opacity-70 rounded transition"
                >
                    <Icon name="Logout" src={logoutIcon} className="inline-block mr-2" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;