import { useTheme } from "next-themes";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="rounded-lg flex items-center justify-center transition-all duration-300 focus:outline-none hover:text-blue-500 text-[20px]"
      onClick={() => {
        setTheme(theme === "light" || !theme ? "dark" : "light");
      }}
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" || !theme ? (
        <SunOutlined
          className="text-blue-500 w-6 h-6 "
          width={24}
          height={24}
        />
      ) : (
        <MoonOutlined
          className="text-blue-400  w-6 h-6 "
          width={24}
          height={24}
        />
      )}
    </button>
  );
};

export default ThemeToggler;
