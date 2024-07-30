import { useTheme } from "next-themes";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="w-8 h-8  rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 transition-all duration-300 focus:outline-none"
      onClick={() => {
        console.log(theme);
        setTheme(theme === "light" || !theme ? "dark" : "light");
      }}
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" || !theme ? (
        <SunOutlined className="text-blue-500 w-5 h-5" />
      ) : (
        <MoonOutlined className="text-blue-400 w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggler;
